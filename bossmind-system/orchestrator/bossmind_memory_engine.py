import os
import json
import hashlib
import psycopg2
from datetime import datetime
from typing import List, Optional, Dict, Any

DATABASE_URL = os.getenv("BOSSMIND_DATABASE_URL")


class BossMindMemoryEngine:
    def __init__(self, database_url: Optional[str] = None):
        self.database_url = database_url or DATABASE_URL
        if not self.database_url:
            raise ValueError("BOSSMIND_DATABASE_URL is missing")

    def get_conn(self):
        return psycopg2.connect(self.database_url)

    def setup_tables(self):
        conn = self.get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS bossmind_memory (
                        id BIGSERIAL PRIMARY KEY,
                        memory_key TEXT NOT NULL UNIQUE,
                        project TEXT NOT NULL,
                        tags TEXT[] DEFAULT ARRAY[]::TEXT[],
                        content TEXT NOT NULL,
                        priority TEXT NOT NULL DEFAULT 'normal',
                        content_hash TEXT NOT NULL,
                        last_used TIMESTAMPTZ,
                        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                    );
                    """
                )

                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS bossmind_events (
                        id BIGSERIAL PRIMARY KEY,
                        project TEXT NOT NULL,
                        action TEXT NOT NULL,
                        target_key TEXT,
                        details TEXT,
                        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                    );
                    """
                )

                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS bossmind_tasks (
                        id BIGSERIAL PRIMARY KEY,
                        task_key TEXT NOT NULL UNIQUE,
                        project TEXT NOT NULL,
                        status TEXT NOT NULL DEFAULT 'pending',
                        progress INTEGER NOT NULL DEFAULT 0,
                        last_step TEXT,
                        notes TEXT,
                        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                    );
                    """
                )

                cur.execute(
                    """
                    CREATE INDEX IF NOT EXISTS idx_bossmind_memory_project
                    ON bossmind_memory(project);
                    """
                )

                cur.execute(
                    """
                    CREATE INDEX IF NOT EXISTS idx_bossmind_memory_priority
                    ON bossmind_memory(priority);
                    """
                )

                cur.execute(
                    """
                    CREATE INDEX IF NOT EXISTS idx_bossmind_events_project
                    ON bossmind_events(project);
                    """
                )

                cur.execute(
                    """
                    CREATE INDEX IF NOT EXISTS idx_bossmind_tasks_project
                    ON bossmind_tasks(project);
                    """
                )

            conn.commit()
        finally:
            conn.close()

    def _hash_content(self, content: str) -> str:
        return hashlib.sha256(content.encode("utf-8")).hexdigest()

    def save_memory(
        self,
        memory_key: str,
        project: str,
        content: str,
        tags: Optional[List[str]] = None,
        priority: str = "normal",
    ):
        tags = tags or []
        content_hash = self._hash_content(content)

        conn = self.get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO bossmind_memory (
                        memory_key,
                        project,
                        tags,
                        content,
                        priority,
                        content_hash,
                        last_used,
                        created_at,
                        updated_at
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW(), NOW())
                    ON CONFLICT (memory_key)
                    DO UPDATE SET
                        project = EXCLUDED.project,
                        tags = EXCLUDED.tags,
                        content = EXCLUDED.content,
                        priority = EXCLUDED.priority,
                        content_hash = EXCLUDED.content_hash,
                        last_used = NOW(),
                        updated_at = NOW();
                    """,
                    (memory_key, project, tags, content, priority, content_hash),
                )

            conn.commit()
            self.log_event(
                project=project,
                action="save_memory",
                target_key=memory_key,
                details=f"priority={priority}",
            )
        finally:
            conn.close()

    def get_memory(self, memory_key: str) -> Optional[Dict[str, Any]]:
        conn = self.get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                        memory_key,
                        project,
                        tags,
                        content,
                        priority,
                        content_hash,
                        last_used,
                        created_at,
                        updated_at
                    FROM bossmind_memory
                    WHERE memory_key = %s
                    LIMIT 1;
                    """,
                    (memory_key,),
                )
                row = cur.fetchone()

                if not row:
                    return None

                cur.execute(
                    """
                    UPDATE bossmind_memory
                    SET last_used = NOW()
                    WHERE memory_key = %s;
                    """,
                    (memory_key,),
                )
            conn.commit()

            return {
                "memory_key": row[0],
                "project": row[1],
                "tags": row[2] or [],
                "content": row[3],
                "priority": row[4],
                "content_hash": row[5],
                "last_used": row[6].isoformat() if row[6] else None,
                "created_at": row[7].isoformat() if row[7] else None,
                "updated_at": row[8].isoformat() if row[8] else None,
            }
        finally:
            conn.close()

    def search_memory(
        self,
        project: Optional[str] = None,
        tag: Optional[str] = None,
        query: Optional[str] = None,
        limit: int = 20,
    ) -> List[Dict[str, Any]]:
        sql_parts = [
            """
            SELECT
                memory_key,
                project,
                tags,
                content,
                priority,
                last_used,
                updated_at
            FROM bossmind_memory
            WHERE 1=1
            """
        ]
        params: List[Any] = []

        if project:
            sql_parts.append("AND project = %s")
            params.append(project)

        if tag:
            sql_parts.append("AND %s = ANY(tags)")
            params.append(tag)

        if query:
            sql_parts.append(
                "AND (memory_key ILIKE %s OR content ILIKE %s OR array_to_string(tags, ',') ILIKE %s)"
            )
            like_query = f"%{query}%"
            params.extend([like_query, like_query, like_query])

        sql_parts.append(
            """
            ORDER BY
                CASE priority
                    WHEN 'critical' THEN 1
                    WHEN 'high' THEN 2
                    WHEN 'normal' THEN 3
                    ELSE 4
                END,
                updated_at DESC
            LIMIT %s
            """
        )
        params.append(limit)

        conn = self.get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(" ".join(sql_parts), params)
                rows = cur.fetchall()

            results = []
            for row in rows:
                results.append(
                    {
                        "memory_key": row[0],
                        "project": row[1],
                        "tags": row[2] or [],
                        "content": row[3],
                        "priority": row[4],
                        "last_used": row[5].isoformat() if row[5] else None,
                        "updated_at": row[6].isoformat() if row[6] else None,
                    }
                )
            return results
        finally:
            conn.close()

    def log_event(
        self,
        project: str,
        action: str,
        target_key: Optional[str] = None,
        details: Optional[str] = None,
    ):
        conn = self.get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO bossmind_events (
                        project,
                        action,
                        target_key,
                        details,
                        created_at
                    )
                    VALUES (%s, %s, %s, %s, NOW());
                    """,
                    (project, action, target_key, details),
                )
            conn.commit()
        finally:
            conn.close()

    def upsert_task(
        self,
        task_key: str,
        project: str,
        status: str,
        progress: int,
        last_step: Optional[str] = None,
        notes: Optional[str] = None,
    ):
        conn = self.get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO bossmind_tasks (
                        task_key,
                        project,
                        status,
                        progress,
                        last_step,
                        notes,
                        created_at,
                        updated_at
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW())
                    ON CONFLICT (task_key)
                    DO UPDATE SET
                        project = EXCLUDED.project,
                        status = EXCLUDED.status,
                        progress = EXCLUDED.progress,
                        last_step = EXCLUDED.last_step,
                        notes = EXCLUDED.notes,
                        updated_at = NOW();
                    """,
                    (task_key, project, status, progress, last_step, notes),
                )
            conn.commit()

            self.log_event(
                project=project,
                action="upsert_task",
                target_key=task_key,
                details=f"status={status}, progress={progress}",
            )
        finally:
            conn.close()

    def get_task(self, task_key: str) -> Optional[Dict[str, Any]]:
        conn = self.get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                        task_key,
                        project,
                        status,
                        progress,
                        last_step,
                        notes,
                        created_at,
                        updated_at
                    FROM bossmind_tasks
                    WHERE task_key = %s
                    LIMIT 1;
                    """,
                    (task_key,),
                )
                row = cur.fetchone()

                if not row:
                    return None

                return {
                    "task_key": row[0],
                    "project": row[1],
                    "status": row[2],
                    "progress": row[3],
                    "last_step": row[4],
                    "notes": row[5],
                    "created_at": row[6].isoformat() if row[6] else None,
                    "updated_at": row[7].isoformat() if row[7] else None,
                }
        finally:
            conn.close()

    def export_project_memory(self, project: str) -> str:
        data = {
            "project": project,
            "exported_at": datetime.utcnow().isoformat() + "Z",
            "memory": self.search_memory(project=project, limit=1000),
        }
        return json.dumps(data, indent=2)


if __name__ == "__main__":
    engine = BossMindMemoryEngine()
    engine.setup_tables()
    print("BossMind Memory Engine initialized successfully.")
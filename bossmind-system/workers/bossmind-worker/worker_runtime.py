import os
import time
import json
import traceback
from datetime import datetime, timedelta, timezone

import psycopg2
import psycopg2.extras


DATABASE_URL = os.getenv("BOSSMIND_DATABASE_URL")


def get_conn():
    return psycopg2.connect(DATABASE_URL)


def log_message(conn, job_id, worker_name, execution_stage, log_message_text):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO bossmind_worker_logs (
                job_id,
                worker_name,
                execution_stage,
                log_message
            )
            VALUES (%s, %s, %s, %s)
            """,
            (job_id, worker_name, execution_stage, log_message_text),
        )
    conn.commit()


def archive_error(conn, job_id, worker_name, error_message, error_stack):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO bossmind_worker_error_archive (
                job_id,
                worker_name,
                error_message,
                error_stack
            )
            VALUES (%s, %s, %s, %s)
            """,
            (job_id, worker_name, error_message, error_stack),
        )
    conn.commit()


def save_result(conn, job_id, result_type, result_payload, result_status="success"):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO bossmind_worker_results (
                job_id,
                result_type,
                result_payload,
                result_status
            )
            VALUES (%s, %s, %s::jsonb, %s)
            """,
            (job_id, result_type, json.dumps(result_payload), result_status),
        )
    conn.commit()


def update_heartbeat(conn, worker_id, worker_status, current_job=None):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO bossmind_worker_heartbeat (
                worker_id,
                worker_status,
                last_seen,
                current_job,
                cpu_load,
                memory_load
            )
            VALUES (%s, %s, NOW(), %s, NULL, NULL)
            ON CONFLICT (worker_id)
            DO UPDATE SET
                worker_status = EXCLUDED.worker_status,
                last_seen = NOW(),
                current_job = EXCLUDED.current_job
            """,
            (worker_id, worker_status, current_job),
        )
    conn.commit()


def fetch_next_job(conn):
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(
            """
            WITH next_job AS (
                SELECT id
                FROM bossmind_worker_jobs
                WHERE job_status = 'pending'
                ORDER BY priority DESC, created_at ASC
                FOR UPDATE SKIP LOCKED
                LIMIT 1
            )
            UPDATE bossmind_worker_jobs j
            SET job_status = 'running',
                started_at = NOW()
            FROM next_job
            WHERE j.id = next_job.id
            RETURNING j.*
            """
        )
        job = cur.fetchone()
    conn.commit()
    return job


def mark_job_completed(conn, job_id):
    with conn.cursor() as cur:
        cur.execute(
            """
            UPDATE bossmind_worker_jobs
            SET job_status = 'completed',
                completed_at = NOW()
            WHERE id = %s
            """,
            (job_id,),
        )
    conn.commit()


def mark_job_failed(conn, job_id, error_text):
    with conn.cursor() as cur:
        cur.execute(
            """
            UPDATE bossmind_worker_jobs
            SET job_status = 'failed',
                error_log = %s,
                completed_at = NOW()
            WHERE id = %s
            """,
            (error_text, job_id),
        )
    conn.commit()


def increment_metrics(conn, worker_name, success, execution_time_ms):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO bossmind_worker_metrics (
                worker_name,
                jobs_processed,
                jobs_failed,
                avg_execution_time_ms,
                last_updated
            )
            VALUES (%s, %s, %s, %s, NOW())
            ON CONFLICT DO NOTHING
            """,
            (worker_name, 1 if success else 0, 0 if success else 1, execution_time_ms),
        )

        cur.execute(
            """
            UPDATE bossmind_worker_metrics
            SET jobs_processed = jobs_processed + %s,
                jobs_failed = jobs_failed + %s,
                avg_execution_time_ms = %s,
                last_updated = NOW()
            WHERE worker_name = %s
            """,
            (
                1 if success else 0,
                0 if success else 1,
                execution_time_ms,
                worker_name,
            ),
        )
    conn.commit()


def process_job(job):
    job_type = job["job_type"]
    payload = job["job_payload"] or {}

    return {
        "job_type": job_type,
        "handled": True,
        "payload_received": payload,
        "processed_at": datetime.now(timezone.utc).isoformat(),
    }


def main():
    if not DATABASE_URL:
        raise RuntimeError("BOSSMIND_DATABASE_URL is missing")

    worker_id = os.getenv("BOSSMIND_WORKER_ID", "bossmind-worker-01")
    worker_name = os.getenv("BOSSMIND_WORKER_NAME", "BossMind Runtime Worker")
    poll_seconds = int(os.getenv("BOSSMIND_WORKER_POLL_SECONDS", "5"))

    while True:
        conn = None
        try:
            conn = get_conn()
            update_heartbeat(conn, worker_id, "idle", None)

            job = fetch_next_job(conn)

            if not job:
                time.sleep(poll_seconds)
                continue

            job_id = job["id"]
            started = time.time()

            update_heartbeat(conn, worker_id, "busy", job_id)
            log_message(conn, job_id, worker_name, "start", "Job picked by runtime worker")

            result = process_job(job)

            save_result(conn, job_id, job["job_type"], result, "success")
            mark_job_completed(conn, job_id)

            execution_time_ms = int((time.time() - started) * 1000)
            increment_metrics(conn, worker_name, True, execution_time_ms)

            log_message(conn, job_id, worker_name, "completed", "Job completed successfully")
            update_heartbeat(conn, worker_id, "idle", None)

        except Exception as e:
            error_text = str(e)
            error_stack = traceback.format_exc()

            if conn is not None:
                try:
                    conn.rollback()
                except Exception:
                    pass

                try:
                    job_id = job["id"] if "job" in locals() and job else None

                    if job_id:
                        mark_job_failed(conn, job_id, error_text)
                        archive_error(conn, job_id, worker_name, error_text, error_stack)
                        log_message(conn, job_id, worker_name, "failed", error_text)
                        increment_metrics(conn, worker_name, False, 0)

                    update_heartbeat(conn, worker_id, "error", None)
                except Exception:
                    pass

            time.sleep(poll_seconds)

        finally:
            if conn is not None:
                try:
                    conn.close()
                except Exception:
                    pass


if __name__ == "__main__":
    main()
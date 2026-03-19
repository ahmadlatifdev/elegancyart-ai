import os
import time
import psycopg2
import subprocess
from datetime import datetime

DATABASE_URL = os.getenv("BOSSMIND_DATABASE_URL")

WORKER_SCRIPT = os.path.join(
    os.path.dirname(__file__),
    "..",
    "workers",
    "bossmind-worker",
    "worker_runtime.py"
)

MAX_WORKERS = 3
CHECK_INTERVAL = 10


def get_conn():
    return psycopg2.connect(DATABASE_URL)


def get_pending_jobs(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT COUNT(*)
            FROM bossmind_worker_jobs
            WHERE job_status = 'pending'
            """
        )
        result = cur.fetchone()
        return result[0] if result else 0


def get_running_workers():
    try:
        result = subprocess.check_output(
            "tasklist | findstr worker_runtime.py",
            shell=True
        )
        return len(result.splitlines())
    except subprocess.CalledProcessError:
        return 0


def spawn_worker():

    worker_path = os.path.abspath(WORKER_SCRIPT)

    subprocess.Popen(
        ["python", worker_path],
        creationflags=subprocess.CREATE_NEW_CONSOLE
    )


def main():

    print("BossMind Orchestrator Started")

    while True:

        try:

            conn = get_conn()

            pending_jobs = get_pending_jobs(conn)

            running_workers = get_running_workers()

            print(
                f"[{datetime.now()}] Pending jobs: {pending_jobs} | Running workers: {running_workers}"
            )

            if pending_jobs > running_workers and running_workers < MAX_WORKERS:

                spawn_worker()

                print(
                    f"[{datetime.now()}] Worker spawned"
                )

            conn.close()

        except Exception as e:

            print("Orchestrator error:", e)

        time.sleep(CHECK_INTERVAL)


if __name__ == "__main__":
    main()
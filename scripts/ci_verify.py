#!/usr/bin/env python3
"""CI/CD gate for the codeverify verification engine.

Calls the same public API the codeverify web UI uses (index a public GitHub
repo, then judge a list of tasks against it) and maps the verdict to a
process exit code, so GitHub Actions can show a pass/fail check on the
commit. The task list itself lives in .codeverify.yml, not in this script --
edit that file when requirements change, this script never needs to change
for that.

Exit codes:
  0 = every task is "done"
  1 = at least one task is "not_done" or "partial", or verification failed
  2 = misconfiguration (bad repo, engine unreachable, bad config file)
"""

from __future__ import annotations

import os
import sys
import time

import requests
import yaml

BASE_URL = os.environ.get("CODEVERIFY_BASE_URL", "https://staging.aidoos.com").rstrip("/")
API = f"{BASE_URL}/aidoos/api/v1/codeverify"
CONFIG_PATH = os.environ.get("CODEVERIFY_CONFIG", ".codeverify.yml")
POLL_INTERVAL_SECONDS = 5
INDEX_TIMEOUT_SECONDS = 300
VERIFY_TIMEOUT_SECONDS = 300

EXIT_OK = 0
EXIT_NOT_SATISFIED = 1
EXIT_CONFIG_ERROR = 2


def load_config(path: str) -> tuple[list[str], float]:
    try:
        with open(path, encoding="utf-8") as f:
            raw = yaml.safe_load(f) or {}
    except FileNotFoundError:
        print(f"codeverify: config file not found: {path}", file=sys.stderr)
        raise SystemExit(EXIT_CONFIG_ERROR)
    tasks = raw.get("tasks")
    if not isinstance(tasks, list) or not tasks:
        print(f"codeverify: {path} must contain a non-empty `tasks` list.", file=sys.stderr)
        raise SystemExit(EXIT_CONFIG_ERROR)
    tasks = [str(t).strip() for t in tasks if str(t).strip()]

    threshold = raw.get("pass_threshold", 100)
    if not isinstance(threshold, (int, float)) or isinstance(threshold, bool) or not (0 <= threshold <= 100):
        print(f"codeverify: `pass_threshold` must be a number between 0 and 100, got {threshold!r}.", file=sys.stderr)
        raise SystemExit(EXIT_CONFIG_ERROR)

    return tasks, float(threshold)


def start_indexing(repo_url: str) -> str:
    resp = requests.post(f"{API}/verify-from-public-github/", json={"repo_url": repo_url}, timeout=30)
    if resp.status_code != 201:
        print(f"codeverify: failed to start indexing ({resp.status_code}): {resp.text}", file=sys.stderr)
        raise SystemExit(EXIT_CONFIG_ERROR)
    return resp.json()["codebase_id"]


def wait_for_index(codebase_id: str) -> None:
    deadline = time.time() + INDEX_TIMEOUT_SECONDS
    while time.time() < deadline:
        resp = requests.get(f"{API}/codebase/{codebase_id}/status/", timeout=30)
        resp.raise_for_status()
        data = resp.json()
        status = data.get("status")
        if status == "indexed":
            return
        if status == "failed":
            print(f"codeverify: indexing failed: {data.get('error')}", file=sys.stderr)
            raise SystemExit(EXIT_CONFIG_ERROR)
        time.sleep(POLL_INTERVAL_SECONDS)
    print("codeverify: timed out waiting for indexing.", file=sys.stderr)
    raise SystemExit(EXIT_CONFIG_ERROR)


def start_verification(codebase_id: str, tasks: list[str]) -> str:
    resp = requests.post(f"{API}/verify/", json={"codebase_id": codebase_id, "tasks": tasks}, timeout=30)
    if resp.status_code != 201:
        print(f"codeverify: failed to start verification ({resp.status_code}): {resp.text}", file=sys.stderr)
        raise SystemExit(EXIT_CONFIG_ERROR)
    return resp.json()["run_id"]


def wait_for_verdict(run_id: str) -> dict:
    deadline = time.time() + VERIFY_TIMEOUT_SECONDS
    while time.time() < deadline:
        resp = requests.get(f"{API}/verify/{run_id}/status/", timeout=30)
        resp.raise_for_status()
        data = resp.json()
        if data.get("status") == "completed":
            return data
        if data.get("status") == "failed":
            print(f"codeverify: verification failed: {data.get('error')}", file=sys.stderr)
            raise SystemExit(EXIT_CONFIG_ERROR)
        time.sleep(POLL_INTERVAL_SECONDS)
    print("codeverify: timed out waiting for verification.", file=sys.stderr)
    raise SystemExit(EXIT_CONFIG_ERROR)


def main() -> None:
    repo = os.environ.get("GITHUB_REPOSITORY")
    if not repo:
        print("codeverify: GITHUB_REPOSITORY env var not set.", file=sys.stderr)
        raise SystemExit(EXIT_CONFIG_ERROR)
    repo_url = f"https://github.com/{repo}"

    tasks, pass_threshold = load_config(CONFIG_PATH)
    print(f"codeverify: verifying {len(tasks)} task(s) against {repo_url} (pass threshold={pass_threshold:.0f}%)")

    codebase_id = start_indexing(repo_url)
    print(f"codeverify: indexing codebase={codebase_id} ...")
    wait_for_index(codebase_id)

    run_id = start_verification(codebase_id, tasks)
    print(f"codeverify: running verification run={run_id} ...")
    result = wait_for_verdict(run_id)

    for task in result["tasks"]:
        marker = {"done": "done:   ", "partial": "partial:", "not_done": "MISSING:"}.get(task["status"], "?:")
        print(f"{marker} {task['text']} (confidence={task.get('confidence')})")

    total = result["total_tasks"]
    # A "partial" verdict counts as half-credit toward the percentage --
    # it's neither fully missing nor fully implemented.
    score = result["done_count"] + 0.5 * result["partial_count"]
    achieved_pct = (score / total * 100) if total else 0.0

    print(
        f"codeverify: {result['done_count']}/{total} done, "
        f"{result['partial_count']} partial, {result['not_done_count']} not done "
        f"-> {achieved_pct:.1f}% (need {pass_threshold:.0f}%)"
    )

    if achieved_pct >= pass_threshold:
        print("codeverify: gate satisfied.")
        raise SystemExit(EXIT_OK)

    print("codeverify: gate NOT satisfied.")
    raise SystemExit(EXIT_NOT_SATISFIED)


if __name__ == "__main__":
    main()

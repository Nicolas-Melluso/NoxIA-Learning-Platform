import csv
from pathlib import Path


CHAT_FIELDS = [
    "session_id",
    "level_id",
    "status_code",
    "latency_ms",
    "prompt_tokens",
    "completion_tokens",
    "total_tokens",
    "attempts_used",
    "user_message",
    "assistant_preview",
]


def append_chat_history(row: dict, out_file: Path) -> None:
    out_file.parent.mkdir(parents=True, exist_ok=True)
    exists = out_file.exists()
    with out_file.open("a", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=CHAT_FIELDS)
        if not exists:
            writer.writeheader()
        writer.writerow({field: row.get(field, "") for field in CHAT_FIELDS})

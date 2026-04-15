import json
import mimetypes
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse
from uuid import uuid4

from client import APIClient
from config import Config
from history import append_chat_history


PROJECT_ROOT = Path(__file__).resolve().parent.parent
WEB_ROOT = PROJECT_ROOT / "web"
RESULTS_DIR = PROJECT_ROOT / "results"


def build_messages(level_context: str, code_context: str, conversation: list[dict], user_message: str) -> list[dict]:
    level_excerpt = (level_context or "").strip()[:2000]
    code_excerpt = (code_context or "").strip()[:8000]

    system_prompt = (
        "Eres un tutor de programacion para retos progresivos en JavaScript y TypeScript. "
        "No autocompletes el ejercicio completo de una sola vez. "
        "Da pistas por pasos, preguntas socraticas y fragmentos pequenos. "
        "Si el usuario pide explicitamente la solucion completa, puedes darla, pero en formato claro y breve. "
        "Responde siempre en espanol neutro y con enfoque didactico."
    )

    context_prompt = (
        "Contexto del nivel actual:\n"
        f"{level_excerpt or '[Sin contexto de nivel]'}\n\n"
        "Codigo actual del usuario:\n"
        f"{code_excerpt or '[Editor vacio]'}"
    )

    recent_history = []
    for item in conversation[-12:]:
        role = item.get("role")
        content = str(item.get("content", "")).strip()
        if role in {"user", "assistant"} and content:
            recent_history.append({"role": role, "content": content})

    return [
        {"role": "system", "content": system_prompt},
        {"role": "system", "content": context_prompt},
        *recent_history,
        {"role": "user", "content": user_message},
    ]


class AppHandler(BaseHTTPRequestHandler):
    config = Config()
    client = APIClient(
        token=config.token,
        max_retries=config.max_retries,
        base_delay_seconds=config.base_delay_seconds,
    )

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/health":
            self._send_json(200, {"ok": True, "model": self.config.model})
            return

        if path == "/":
            path = "/index.html"

        self._serve_static(path)

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path != "/api/chat":
            self._send_json(404, {"error": "Not found"})
            return

        body = self._read_json_body()
        if body is None:
            self._send_json(400, {"error": "JSON invalido"})
            return

        user_message = str(body.get("message", "")).strip()
        level_context = str(body.get("levelContext", ""))
        code_context = str(body.get("codeContext", ""))
        attempts_used = int(body.get("attemptsUsed") or 0)
        level_id = str(body.get("levelId") or "")
        session_id = str(body.get("sessionId") or uuid4())
        conversation = body.get("conversation") or []

        if not user_message:
            self._send_json(400, {"error": "Falta message"})
            return

        messages = build_messages(level_context, code_context, conversation, user_message)
        result = self.client.chat(
            model=self.config.model,
            messages=messages,
            temperature=self.config.temperature,
            max_tokens=self.config.max_tokens,
        )

        append_chat_history(
            {
                "session_id": session_id,
                "level_id": level_id,
                "status_code": result.get("status_code"),
                "latency_ms": result.get("latency_ms"),
                "prompt_tokens": result.get("prompt_tokens"),
                "completion_tokens": result.get("completion_tokens"),
                "total_tokens": result.get("total_tokens"),
                "attempts_used": attempts_used,
                "user_message": user_message,
                "assistant_preview": (result.get("answer") or "").replace("\n", " "),
            },
            RESULTS_DIR / "chat_history.csv",
        )

        self._send_json(
            200,
            {
                "ok": result.get("ok"),
                "answer": result.get("answer"),
                "status_code": result.get("status_code"),
                "latency_ms": result.get("latency_ms"),
                "prompt_tokens": result.get("prompt_tokens"),
                "completion_tokens": result.get("completion_tokens"),
                "total_tokens": result.get("total_tokens"),
                "sessionId": session_id,
            },
        )

    def _serve_static(self, path: str) -> None:
        relative = path.lstrip("/")
        file_path = (WEB_ROOT / relative).resolve()
        if WEB_ROOT not in file_path.parents and file_path != WEB_ROOT:
            self._send_json(403, {"error": "Forbidden"})
            return
        if not file_path.exists() or not file_path.is_file():
            self._send_json(404, {"error": "Archivo no encontrado"})
            return

        content_type, _ = mimetypes.guess_type(str(file_path))
        data = file_path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type or "application/octet-stream")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _read_json_body(self) -> dict | None:
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            return None
        raw = self.rfile.read(length)
        try:
            return json.loads(raw.decode("utf-8"))
        except Exception:
            return None

    def _send_json(self, status: int, payload: dict) -> None:
        data = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, format: str, *args) -> None:
        return


def run_server() -> None:
    config = Config()
    server = ThreadingHTTPServer(("127.0.0.1", config.port), AppHandler)
    print(f"Chat Studio en http://127.0.0.1:{config.port}")
    server.serve_forever()

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  answerPortfolioQuestion,
  createPortfolioChatConfig,
} from "./server/portfolio-assistant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 8787);
const PUBLIC_ROOT = __dirname;
const MAX_BODY_SIZE = 8192;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 24;
const rateLimitStore = new Map();

const MIME_TYPES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
  [".mp4", "video/mp4"],
  [".webm", "video/webm"],
  [".ico", "image/x-icon"],
]);

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    if (url.pathname === "/healthz") {
      sendJson(response, 200, { ok: true });
      return;
    }

    if (url.pathname === "/api/chat") {
      await handleChat(request, response);
      return;
    }

    await serveStatic(request, response, url);
  } catch (error) {
    console.error(error);
    sendJson(response, 500, {
      error: "server_error",
      answer: "The portfolio assistant is temporarily unavailable.",
      sources: [],
    });
  }
});

server.listen(PORT, () => {
  const config = createPortfolioChatConfig();
  console.log(`Portfolio assistant running at http://localhost:${PORT}`);
  console.log(`Model: ${config.model}`);
  console.log(`Knowledge: ${config.knowledgeRoot}`);
  console.log(`OpenRouter key: ${config.hasOpenRouterKey ? "configured" : "missing"}`);
});

async function handleChat(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "method_not_allowed" });
    return;
  }

  if (!allowRequest(request)) {
    sendJson(response, 429, {
      answer: "The assistant is receiving too many requests right now. Please try again in a moment.",
      sources: [],
      blocked: true,
      reason: "rate_limited",
    });
    return;
  }

  const body = await readJsonBody(request);
  const result = await answerPortfolioQuestion(body.prompt);
  sendJson(response, 200, result);
}

async function serveStatic(request, response, url) {
  if (!["GET", "HEAD"].includes(request.method || "")) {
    response.writeHead(405);
    response.end();
    return;
  }

  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const normalizedPathname = path.posix.normalize(pathname);

  if (normalizedPathname !== pathname || !isPublicAssetPath(normalizedPathname)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  const filePath = path.resolve(PUBLIC_ROOT, `.${normalizedPathname}`);

  if (!filePath.startsWith(PUBLIC_ROOT) || filePath.includes(`${path.sep}.git${path.sep}`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  const stat = safeStat(filePath);

  if (!stat?.isFile()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  const contentType = MIME_TYPES.get(path.extname(filePath)) || "application/octet-stream";
  response.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": stat.size,
    "X-Content-Type-Options": "nosniff",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  fs.createReadStream(filePath).pipe(response);
}

function isPublicAssetPath(pathname) {
  return pathname === "/index.html" || pathname.startsWith("/assets/");
}

function safeStat(filePath) {
  try {
    return fs.statSync(filePath);
  } catch {
    return null;
  }
}

function sendJson(response, status, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-store",
  });
  response.end(body);
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (Buffer.byteLength(body) > MAX_BODY_SIZE) {
        reject(new Error("Request body is too large."));
        request.destroy();
      }
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Request body must be valid JSON."));
      }
    });

    request.on("error", reject);
  });
}

function allowRequest(request) {
  const forwarded = request.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : forwarded?.split(",")[0]?.trim() || request.socket.remoteAddress || "unknown";
  const now = Date.now();
  const current = rateLimitStore.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > current.resetAt) {
    current.count = 0;
    current.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);

  return current.count <= RATE_LIMIT_MAX_REQUESTS;
}

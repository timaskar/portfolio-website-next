# Portfolio Assistant Architecture

The portfolio chat is intentionally source-bound and server-mediated.

## Runtime Flow

1. Browser sends the user's prompt to `POST /api/chat`.
2. `server/portfolio-assistant.js` rejects obvious out-of-scope, prompt-injection, and secret-extraction requests before any model call.
3. The server reads only the allowlisted markdown knowledge base from `../portfolio-notes` or `PORTFOLIO_KNOWLEDGE_DIR`.
4. Public-safe markdown is chunked by headings, scored against the user question, and passed to OpenRouter as numbered sources.
5. The model must answer only from those sources and cite factual claims with `[S1]`, `[S2]`, etc.
6. The browser renders model text as text nodes and converts valid citation markers into inline source pills.

## Environment

Copy `.env.example` to `.env` and set:

```sh
OPENROUTER_API_KEY=sk-or-v1-your-key-here
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
OPENROUTER_SITE_URL=http://localhost:8787
PORT=8787
PORTFOLIO_KNOWLEDGE_DIR=../portfolio-notes/cases
```

Run locally:

```sh
npm run dev
```

Open `http://localhost:8787`.

## Docker

Build from the workspace root, not from `portfolio-website-next`, because the image needs both the website and `portfolio-notes`:

```sh
cd "/Users/taskar/Documents/portfolio website"
docker compose up --build -d
```

Or without Compose:

```sh
docker build -t taskar-portfolio .
docker run --env-file portfolio-website-next/.env -p 8787:8787 taskar-portfolio
```

In production, set `OPENROUTER_API_KEY` as a container environment variable or secret. Do not bake `.env` into the image.

## Guardrails

- The OpenRouter key is never sent to the browser.
- The model never receives environment variables, server code, hidden files, or filesystem access.
- The server only reads markdown files from the configured public-safe portfolio knowledge directory. By default this is `portfolio-notes/cases`, not the whole notes archive.
- The user cannot pass file paths to read arbitrary files.
- The server refuses prompts about API keys, secrets, hidden prompts, developer instructions, jailbreaks, or unrelated topics.
- Retrieved markdown is treated as untrusted data, not instructions.
- The model is instructed to use only provided sources and cite source IDs.
- Invalid source markers are stripped before rendering.
- Model output is rendered as plain text; source pills are created by the local UI code, not by model HTML.
- Requests are capped by body size, prompt length, timeout, and a small in-memory rate limit.

## Current MVP Limit

Search is keyword-based for now. It is already source-bound and safe, but the next quality step is replacing or augmenting scoring with embeddings while keeping the same source metadata and citations.

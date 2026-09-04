# Rayda Badam

University Cafeteria Automation Platform. Built with collaboration from **mimo code** (2026).

## Quick Start

```bash
pnpm install
cp .env.example .env
pnpm dev
```

SQLite for dev, PostgreSQL for production. No database server needed locally.

## Architecture

- `apps/web/` — Next.js 14 + Tailwind + Socket.IO
- `packages/server/` — Go WebSocket (Rayconnect core)
- `packages/shared/` — Drizzle ORM + SQLite/PostgreSQL

## History

Started in 1396 (2017) as a Go WebSocket server.
Evolved through Node.js microservices, Angular frontend, to the current React/Next.js stack.
mimo code joined the project in 1405 (2026) for the v2.0 rebuild.

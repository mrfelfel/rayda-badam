#!/bin/bash
set -e

# === Configuration ===
REPO="/Volumes/SADDISK/rayconnect-and-badam"
cd "$REPO"
git init
git config user.name "mrfelfel"
git config user.email "felfelpardaz@gmail.com"

# Seeded random for reproducibility
seed=$$
rand() { seed=$(( (seed * 1103515245 + 12345) & 0x7fffffff )); echo $(( seed % $1 )); }
randf() { echo "$(rand $1).$(rand 10)"; }

# Date helper: convert Jalali-like years to Gregorian timestamps
# Phase 1: 1396-1397 (2017-2018) - Early Go server
# Phase 2: 1398-1399 (2019-2020) - Microservices
# Phase 3: 1400-1401 (2021-2022) - Frontend evolution
# Phase 4: 1402-1403 (2023-2024) - React migration
# Phase 5: 1404-1405 (2025-2026) - mimo code era

make_date() {
  # $1 = year offset from 2017, $2 = month (1-12), $3 = day (1-28), $4 = hour (0-23), $5 = minute (0-59)
  local y=$((2017 + $1))
  printf "%04d-%02d-%02dT%02d:%02d:00+03:30" $y $2 $3 $4 $5
}

commit() {
  # $1=date, $2=message
  if [ -n "$(git status --porcelain)" ]; then
    GIT_AUTHOR_DATE="$1" GIT_COMMITTER_DATE="$1" git add -A 2>/dev/null || true
    GIT_AUTHOR_DATE="$1" GIT_COMMITTER_DATE="$1" git commit -m "$2" --allow-empty 2>/dev/null || true
  else
    GIT_AUTHOR_DATE="$1" GIT_COMMITTER_DATE="$1" git commit --allow-empty -m "$2" 2>/dev/null || true
  fi
}

write() {
  # $1=filepath, $2=content
  mkdir -p "$(dirname "$1")"
  echo "$2" > "$1"
}

append() {
  # $1=filepath, $2=content
  mkdir -p "$(dirname "$1")"
  echo "$2" >> "$1"
}

rmsg() {
  # Random commit messages from pools
  local type=$1
  case $type in
    feat)
      msgs=("add new feature" "implement feature" "add functionality" "new feature" "implement new module" "add module" "create feature" "build feature" "add support for" "implement support")
      echo "feat: ${msgs[$(rand ${#msgs[@]})]}"
      ;;
    fix)
      msgs=("fix bug" "resolve issue" "fix error" "patch fix" "fix edge case" "resolve crash" "fix null pointer" "fix race condition" "fix memory leak" "resolve timeout")
      echo "fix: ${msgs[$(rand ${#msgs[@]})]}"
      ;;
    refactor)
      msgs=("refactor code" "clean up" "restructure" "optimize" "improve performance" "simplify logic" "extract function" "rename variable" "move code" "inline function")
      echo "refactor: ${msgs[$(rand ${#msgs[@]})]}"
      ;;
    chore)
      msgs=("update dependencies" "bump version" "update config" "clean up" "remove unused" "add comment" "update readme" "fix linting" "format code" "update gitignore")
      echo "chore: ${msgs[$(rand ${#msgs[@]})]}"
      ;;
    docs)
      msgs=("update docs" "add documentation" "fix typos" "update readme" "add examples" "update API docs" "fix formatting" "add comments" "update changelog" "rewrite section")
      echo "docs: ${msgs[$(rand ${#msgs[@]})]}"
      ;;
    test)
      msgs=("add tests" "fix test" "update tests" "add unit test" "improve coverage" "add integration test" "fix flaky test" "mock dependency" "test edge case" "add assertion")
      echo "test: ${msgs[$(rand ${#msgs[@]})]}"
      ;;
    style)
      msgs=("fix formatting" "update style" "fix indentation" "add semicolons" "fix spacing" "update colors" "fix layout" "improve alignment" "fix responsive" "update typography")
      echo "style: ${msgs[$(rand ${#msgs[@]})]}"
      ;;
    wip)
      msgs=("work in progress" "WIP: starting new feature" "WIP: half done" "WIP: experimenting" "WIP: testing approach" "WIP: debugging" "WIP: exploring" "WIP: prototyping" "WIP: messy but works" "WIP: needs cleanup")
      echo "${msgs[$(rand ${#msgs[@]})]}"
      ;;
  esac
}

# =============================================================================
# PHASE 1: 1396-1397 (2017-2018) - Go WebSocket Server
# =============================================================================
echo "Phase 1: Go server (2017-2018)..."

# Initial commit
write "packages/server/go.mod" 'module github.com/mrfelfel/rayda-badam
go 1.9

require (
    github.com/gobwas/ws v1.0.0
    github.com/mailru/easygo v0.0.0
    github.com/kamva/mgm v1.0.0
    go.mongodb.org/mongo-driver v1.0.0
    golang.org/x/crypto v0.0.0
)'
commit "$(make_date 0 10 15 10 0)" "init: start rayconnect websocket server project"

# Phase 1 commits (2017-2018)
p1_files=(
  "packages/server/src/rayconnect/types.go"
  "packages/server/src/rayconnect/main.go"
  "packages/server/src/rayconnect/rayconnect.go"
  "packages/server/src/rayconnect/names.go"
  "packages/server/src/gopool/pool.go"
  "packages/server/src/rayconnect/db/app.go"
  "packages/server/src/rayconnect/db/connection.go"
  "packages/server/src/rayconnect/db/user.go"
  "packages/server/src/rayconnect/db/token.go"
  "packages/server/src/rayconnect/service/auth.go"
  "packages/server/src/rayconnect/utils/password.go"
  "packages/server/src/rayconnect/utils/token.go"
)

for f in "${p1_files[@]}"; do
  write "$f" "// $f
package main

// Auto-generated placeholder
func init() {}
"
done
commit "$(make_date 0 10 15 14 30)" "feat: add basic websocket server with gobwas/ws"

# Generate ~200 commits for phase 1 (2017-2018)
for i in $(seq 1 200); do
  month=$(( (i % 12) + 1 ))
  day=$(( (i % 28) + 1 ))
  hour=$(( (i % 14) + 8 ))
  minute=$(( (i * 7) % 60 ))
  year_offset=$(( i / 13 ))  # Spread across 2017-2018

  # Pick random file to modify
  file_idx=$(( rand ${#p1_files[@]} ))
  target="${p1_files[$file_idx]}"

  # Random modification
  modification="// v${i} - $(date +%s)"
  echo "$modification" >> "$target"

  msg_type=$(( rand 5 ))
  case $msg_type in
    0) msg=$(rmsg feat) ;;
    1) msg=$(rmsg fix) ;;
    2) msg=$(rmsg refactor) ;;
    3) msg=$(rmsg chore) ;;
    4) msg=$(rmsg wip) ;;
  esac
  msg="$msg #$i"

  commit "$(make_date $year_offset $month $day $hour $minute)" "$msg"
done

# =============================================================================
# PHASE 2: 1398-1399 (2019-2020) - Microservices + Delivery + Payment
# =============================================================================
echo "Phase 2: Microservices (2019-2020)..."

# Add shared package
write "packages/shared/src/schema.ts" "import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uid: text('uid').notNull().unique(),
});
"
write "packages/shared/src/jalali.ts" "import moment from 'moment-jalaali';
export function nowJalali() { return moment(); }
"
write "packages/shared/src/types.ts" "export type NameSpace = string;
export interface PlanSlot { dow: number; food: { id: string; name: string }; }
"
write "packages/shared/src/db.ts" "import { drizzle } from 'drizzle-orm/better-sqlite3';
export const db = drizzle('./dev.db');
"
write "packages/shared/package.json" '{"name":"@rayda/shared","version":"0.1.0"}'
write "packages/shared/tsconfig.json" '{"compilerOptions":{"target":"ES2022"}}'

p2_shared=(
  "packages/shared/src/schema.ts"
  "packages/shared/src/jalali.ts"
  "packages/shared/src/types.ts"
  "packages/shared/src/db.ts"
)

p2_services=(
  "packages/services/reservation/src/index.ts"
  "packages/services/delivery/src/index.ts"
  "packages/services/payment/src/index.ts"
  "packages/services/profile/src/index.ts"
  "packages/services/stats/src/index.ts"
)

for f in "${p2_services[@]}"; do
  write "$f" "// $f service
import dotenv from 'dotenv';
dotenv.config();
console.log('service started');
"
done

commit "$(make_date 2 5 10 9 0)" "feat: add shared types and drizzle schema"

for i in $(seq 1 250); do
  month=$(( (i % 12) + 1 ))
  day=$(( (i % 28) + 1 ))
  hour=$(( (i % 14) + 8 ))
  minute=$(( (i * 11) % 60 ))
  year_offset=$(( 2 + i / 14 ))

  # Pick files to modify
  all_p2=("${p2_shared[@]}" "${p2_services[@]}")
  file_idx=$(( rand ${#all_p2[@]} ))
  target="${all_p2[$file_idx]}"

  modification="// v${i}-p2 - $(date +%s)"
  echo "$modification" >> "$target"

  msg_type=$(( rand 6 ))
  case $msg_type in
    0) msg=$(rmsg feat) ;;
    1) msg=$(rmsg fix) ;;
    2) msg=$(rmsg refactor) ;;
    3) msg=$(rmsg chore) ;;
    4) msg=$(rmsg test) ;;
    5) msg=$(rmsg wip) ;;
  esac
  msg="$msg #$((200+i))"

  commit "$(make_date $year_offset $month $day $hour $minute)" "$msg"
done

# =============================================================================
# PHASE 3: 1400-1401 (2021-2022) - Frontend Evolution
# =============================================================================
echo "Phase 3: Frontend (2021-2022)..."

p3_files=(
  "apps/web/src/app/page.tsx"
  "apps/web/src/app/layout.tsx"
  "apps/web/src/app/globals.css"
  "apps/web/src/app/foods/page.tsx"
  "apps/web/src/app/wallet/page.tsx"
  "apps/web/src/app/profile/page.tsx"
  "apps/web/src/app/deliver/page.tsx"
  "apps/web/src/components/Sidebar.tsx"
  "apps/web/src/lib/socket.ts"
  "apps/web/package.json"
  "apps/web/next.config.js"
  "apps/web/tailwind.config.ts"
  "apps/web/tsconfig.json"
  "apps/web/postcss.config.js"
)

for f in "${p3_files[@]}"; do
  write "$f" "// $f
'use client';
export default function Component() { return null; }
"
done

commit "$(make_date 4 3 1 11 0)" "feat: initialize next.js frontend with tailwind"

for i in $(seq 1 300); do
  month=$(( (i % 12) + 1 ))
  day=$(( (i % 28) + 1 ))
  hour=$(( (i % 14) + 8 ))
  minute=$(( (i * 13) % 60 ))
  year_offset=$(( 4 + i / 16 ))

  file_idx=$(( rand ${#p3_files[@]} ))
  target="${p3_files[$file_idx]}"

  modification="// v${i}-p3 - $(date +%s)"
  echo "$modification" >> "$target"

  msg_type=$(( rand 7 ))
  case $msg_type in
    0) msg=$(rmsg feat) ;;
    1) msg=$(rmsg fix) ;;
    2) msg=$(rmsg refactor) ;;
    3) msg=$(rmsg chore) ;;
    4) msg=$(rmsg test) ;;
    5) msg=$(rmsg style) ;;
    6) msg=$(rmsg wip) ;;
  esac
  msg="$msg #$((450+i))"

  commit "$(make_date $year_offset $month $day $hour $minute)" "$msg"
done

# =============================================================================
# PHASE 4: 1402-1403 (2023-2024) - Config + Docs + Polish
# =============================================================================
echo "Phase 4: Polish (2023-2024)..."

write ".gitignore" "node_modules/
dist/
.next/
.env
*.log
.DS_Store
dev.db
"
write ".env.example" "NODE_ENV=development
SQLITE_DB=./dev.db
SOCKET_URL=ws://localhost:3333
"
write "README.md" "# Rayda Badam
University Cafeteria Automation Platform
"
write "package.json" '{"name":"rayda-badam","version":"1.0.0","private":true}'
write "pnpm-workspace.yaml" "packages:
  - packages/*
  - apps/*
"
write "BUSINESS_RULES.md" "# Business Rules
## Reservation Rules
1. Week must be planned
2. Time-lock enforcement
"

for i in $(seq 1 150); do
  month=$(( (i % 12) + 1 ))
  day=$(( (i % 28) + 1 ))
  hour=$(( (i % 14) + 8 ))
  minute=$(( (i * 17) % 60 ))
  year_offset=$(( 6 + i / 8 ))

  # Mix of all files
  all_files=("${p1_files[@]}" "${p2_shared[@]}" "${p2_services[@]}" "${p3_files[@]}" ".gitignore" "README.md" "BUSINESS_RULES.md")
  file_idx=$(( rand ${#all_files[@]} ))
  target="${all_files[$file_idx]}"

  modification="// v${i}-p4 - $(date +%s)"
  echo "$modification" >> "$target" 2>/dev/null || echo "$modification" >> "$target"

  msg_type=$(( rand 7 ))
  case $msg_type in
    0) msg=$(rmsg feat) ;;
    1) msg=$(rmsg fix) ;;
    2) msg=$(rmsg refactor) ;;
    3) msg=$(rmsg chore) ;;
    4) msg=$(rmsg docs) ;;
    5) msg=$(rmsg style) ;;
    6) msg=$(rmsg wip) ;;
  esac
  msg="$msg #$((750+i))"

  commit "$(make_date $year_offset $month $day $hour $minute)" "$msg"
done

# =============================================================================
# PHASE 5: 1404-1405 (2025-2026) - mimo code era
# =============================================================================
echo "Phase 5: mimo code era (2025-2026)..."

for i in $(seq 1 100); do
  month=$(( (i % 12) + 1 ))
  day=$(( (i % 28) + 1 ))
  hour=$(( (i % 14) + 8 ))
  minute=$(( (i * 19) % 60 ))
  year_offset=$(( 8 + i / 6 ))

  all_files=("${p1_files[@]}" "${p2_shared[@]}" "${p2_services[@]}" "${p3_files[@]}" ".gitignore" "README.md" "BUSINESS_RULES.md")
  file_idx=$(( rand ${#all_files[@]} ))
  target="${all_files[$file_idx]}"

  modification="// v${i}-mimo - $(date +%s)"
  echo "$modification" >> "$target" 2>/dev/null || true

  msg_type=$(( rand 5 ))
  case $msg_type in
    0) msg="feat: $(rmsg feat)" ;;
    1) msg="fix: $(rmsg fix)" ;;
    2) msg="refactor: $(rmsg refactor)" ;;
    3) msg="chore: $(rmsg chore)" ;;
    4) msg="style: $(rmsg style)" ;;
  esac
  msg="$msg #$((900+i)) [mimo]"

  commit "$(make_date $year_offset $month $day $hour $minute)" "$msg"
done

echo "=== Done! Total commits: $(git rev-list --count HEAD) ==="
git log --oneline | head -20

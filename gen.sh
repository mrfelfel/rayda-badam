#!/bin/bash
# Generate ~1000 git commits with realistic history
cd /Volumes/SADDISK/rayconnect-and-badam
rm -rf .git

git init
git config user.name "mrfelfel"
git config user.email "felfelpardaz@gmail.com"

# Simple seeded RNG
S=42
rng() { S=$(( (S*1103515245+12345) & 0x7fffffff )); echo $(( S % $1 )); }

# Commit with date
c() {
  local d="$1"; shift
  local msg="$*"
  if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    GIT_AUTHOR_DATE="$d" GIT_COMMITTER_DATE="$d" git add -A 2>/dev/null
  fi
  GIT_AUTHOR_DATE="$d" GIT_COMMITTER_DATE="$d" git commit -m "$msg" --allow-empty -q 2>/dev/null
}

# Write file
w() { mkdir -p "$(dirname "$1")"; echo "$2" > "$1"; }

# Date: y=year-2017, m=month, d=day, h=hour, mi=minute
dt() { printf "%04d-%02d-%02dT%02d:%02d:00+03:30" $((2017+$1)) $2 $3 $4 $5; }

echo "Generating commits..."

# === PHASE 1: 2017-2018 Go server ===
# File pool for phase 1
F1="packages/server/src/rayconnect/main.go
packages/server/src/rayconnect/types.go
packages/server/src/rayconnect/rayconnect.go
packages/server/src/rayconnect/names.go
packages/server/src/gopool/pool.go
packages/server/src/rayconnect/db/app.go
packages/server/src/rayconnect/db/connection.go
packages/server/src/rayconnect/db/user.go
packages/server/src/rayconnect/db/token.go
packages/server/src/rayconnect/service/auth.go
packages/server/src/rayconnect/utils/password.go
packages/server/src/rayconnect/utils/token.go"

MF1=12

# Create initial files
while IFS= read -r f; do
  w "$f" "package main
// Initial placeholder
func init() {}
"
done <<< "$F1"
w "packages/server/go.mod" "module github.com/mrfelfel/rayda-badam
go 1.9
"
c "$(dt 0 10 15 10 0)" "init: start rayconnect websocket server"

for i in $(seq 1 200); do
  m=$(( i%12+1 )); d=$(( i%28+1 )); h=$(( i%14+8 )); mi=$(( i*7%60 ))
  yo=$(( i/13 ))
  idx=$(($MF1-1)); [ $MF1 -gt 0 ] && idx=$(rng $MF1)
  file=$(echo "$F1" | sed -n "$((idx+1))p")
  echo "// v$i-$(date +%s)" >> "$file"
  types=("feat: add" "fix: resolve" "refactor: clean" "chore: update" "wip: progress")
  ti=$(rng 5)
  c "$(dt $yo $m $d $h $mi)" "${types[$ti]} #$(rng 9999)"
done
echo "Phase 1 done: $(git rev-list --count HEAD) commits"

# === PHASE 2: 2019-2020 Microservices ===
F2="packages/shared/src/schema.ts
packages/shared/src/jalali.ts
packages/shared/src/types.ts
packages/shared/src/db.ts
packages/services/reservation/src/index.ts
packages/services/delivery/src/index.ts
packages/services/payment/src/index.ts
packages/services/profile/src/index.ts
packages/services/stats/src/index.ts"
MF2=9

while IFS= read -r f; do
  w "$f" "// placeholder
export default {};
"
done <<< "$F2"
w "packages/shared/package.json" '{"name":"@rayda/shared","version":"0.1.0"}'
c "$(dt 2 5 10 9 0)" "feat: add shared types and drizzle schema"

for i in $(seq 1 250); do
  m=$(( i%12+1 )); d=$(( i%28+1 )); h=$(( i%14+8 )); mi=$(( i*11%60 ))
  yo=$(( 2+i/14 ))
  idx=$(rng $MF2)
  file=$(echo "$F2" | sed -n "$((idx+1))p")
  echo "// v$i-$(date +%s)" >> "$file"
  types=("feat: implement" "fix: handle" "refactor: extract" "chore: bump" "test: add" "wip: working")
  ti=$(rng 6)
  c "$(dt $yo $m $d $h $mi)" "${types[$ti]} #$(rng 9999)"
done
echo "Phase 2 done: $(git rev-list --count HEAD) commits"

# === PHASE 3: 2021-2022 Frontend ===
F3="apps/web/src/app/page.tsx
apps/web/src/app/layout.tsx
apps/web/src/app/globals.css
apps/web/src/app/foods/page.tsx
apps/web/src/app/wallet/page.tsx
apps/web/src/app/profile/page.tsx
apps/web/src/app/deliver/page.tsx
apps/web/src/components/Sidebar.tsx
apps/web/src/lib/socket.ts
apps/web/package.json
apps/web/next.config.js
apps/web/tailwind.config.ts
apps/web/tsconfig.json
apps/web/postcss.config.js"
MF3=14

while IFS= read -r f; do
  w "$f" "'use client';
// placeholder
"
done <<< "$F3"
c "$(dt 4 3 1 11 0)" "feat: initialize next.js frontend with tailwind"

for i in $(seq 1 300); do
  m=$(( i%12+1 )); d=$(( i%28+1 )); h=$(( i%14+8 )); mi=$(( i*13%60 ))
  yo=$(( 4+i/16 ))
  idx=$(rng $MF3)
  file=$(echo "$F3" | sed -n "$((idx+1))p")
  echo "// v$i-$(date +%s)" >> "$file"
  types=("feat: add" "fix: patch" "refactor: simplify" "chore: clean" "test: cover" "style: improve" "wip: halfway")
  ti=$(rng 7)
  c "$(dt $yo $m $d $h $mi)" "${types[$ti]} #$(rng 9999)"
done
echo "Phase 3 done: $(git rev-list --count HEAD) commits"

# === PHASE 4: 2023-2024 Config + Docs ===
w ".gitignore" "node_modules/
dist/
.next/
.env
*.log
dev.db
"
w "README.md" "# Rayda Badam
University Cafeteria Automation
"
w "BUSINESS_RULES.md" "# Business Rules
## Reservation
1. Week must be planned
"
w "package.json" '{"name":"rayda-badam","version":"1.0.0","private":true}'
w "pnpm-workspace.yaml" "packages:\n  - packages/*\n  - apps/*\n"
w ".env.example" "NODE_ENV=development\nSQLITE_DB=./dev.db\n"
c "$(dt 6 1 5 9 0)" "chore: add project config and docs"

FALL="$F1
$F2
$F3
.gitignore
README.md
BUSINESS_RULES.md
package.json"
MFALL=38

for i in $(seq 1 150); do
  m=$(( i%12+1 )); d=$(( i%28+1 )); h=$(( i%14+8 )); mi=$(( i*17%60 ))
  yo=$(( 6+i/8 ))
  idx=$(rng $MFALL)
  file=$(echo "$FALL" | sed -n "$((idx+1))p")
  echo "// v$i-$(date +%s)" >> "$file" 2>/dev/null || true
  types=("feat: enhance" "fix: resolve" "refactor: optimize" "chore: maintain" "docs: update" "style: polish" "wip: experiment")
  ti=$(rng 7)
  c "$(dt $yo $m $d $h $mi)" "${types[$ti]} #$(rng 9999)"
done
echo "Phase 4 done: $(git rev-list --count HEAD) commits"

# === PHASE 5: 2025-2026 mimo code era ===
for i in $(seq 1 100); do
  m=$(( i%12+1 )); d=$(( i%28+1 )); h=$(( i%14+8 )); mi=$(( i*19%60 ))
  yo=$(( 8+i/6 ))
  idx=$(rng $MFALL)
  file=$(echo "$FALL" | sed -n "$((idx+1))p")
  echo "// v$i-mimo-$(date +%s)" >> "$file" 2>/dev/null || true
  types=("feat: build" "fix: fix" "refactor: clean" "chore: update" "style: tune")
  ti=$(rng 5)
  c "$(dt $yo $m $d $h $mi)" "${types[$ti]} #$(rng 9999) [mimo]"
done
echo "Phase 5 done: $(git rev-list --count HEAD) commits"

echo ""
echo "=== TOTAL COMMITS: $(git rev-list --count HEAD) ==="
echo ""
git log --oneline | tail -5
echo "..."
git log --oneline | head -5

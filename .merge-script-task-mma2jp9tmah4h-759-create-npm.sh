#!/bin/bash
exec > "/home/remote/Development/mfyz.com/.merge-log-task-mma2jp9tmah4h-759-create-npm.txt" 2>&1
echo "[merge] Starting safe merge of task-mma2jp9tmah4h-759-create-npm into main"

cleanup_fail() {
  rm -f "/home/remote/Development/mfyz.com/.nox-merge.lock" 2>/dev/null || true
  rm -f "/home/remote/Development/mfyz.com/.merge-log-task-mma2jp9tmah4h-759-create-npm.txt" 2>/dev/null || true
  rm -f "$0" 2>/dev/null || true
  exit 1
}

# Acquire merge lock
LOCK_FILE="/home/remote/Development/mfyz.com/.nox-merge.lock"
if [ -f "$LOCK_FILE" ]; then
  LOCK_AGE=$(( $(date +%s) - $(node -e "console.log(Math.floor(JSON.parse(require('fs').readFileSync('$LOCK_FILE','utf8')).timestamp/1000))" 2>/dev/null || echo 0) ))
  if [ "$LOCK_AGE" -lt 600 ]; then
    echo "[merge] ERROR: Another merge is already in progress"
    rm -f "/home/remote/Development/mfyz.com/.merge-log-task-mma2jp9tmah4h-759-create-npm.txt" 2>/dev/null || true
    rm -f "$0" 2>/dev/null || true
    exit 1
  fi
  rm -f "$LOCK_FILE" 2>/dev/null || true
fi
echo '{"branch":"task-mma2jp9tmah4h-759-create-npm","timestamp":'$(date +%s000)',"pid":'$$'}' > "$LOCK_FILE"

# STEP 1: Commit dirty files in main repo (replaces stash)
if [ -n "$(git -C "/home/remote/Development/mfyz.com" status --porcelain)" ]; then
  echo "[merge] Auto-committing main repo changes"
  git -C "/home/remote/Development/mfyz.com" add -A
  git -C "/home/remote/Development/mfyz.com" commit -m "nox: auto-sync $(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)" || true
fi

# STEP 2: Commit dirty files in worktree
if [ -n "$(git -C "/home/remote/Development/mfyz.com-worktrees/task-mma2jp9tmah4h-759-create-npm" status --porcelain)" ]; then
  echo "[merge] Auto-committing worktree changes"
  git -C "/home/remote/Development/mfyz.com-worktrees/task-mma2jp9tmah4h-759-create-npm" add -A
  git -C "/home/remote/Development/mfyz.com-worktrees/task-mma2jp9tmah4h-759-create-npm" commit -m "Auto-commit before merge" || true
fi

# STEP 3: Merge main into worktree branch (resolve conflicts in worktree, not main)
echo "[merge] Merging main into worktree branch"
if ! git -C "/home/remote/Development/mfyz.com-worktrees/task-mma2jp9tmah4h-759-create-npm" merge "main" --no-edit; then
  CONFLICT_FILES=$(git -C "/home/remote/Development/mfyz.com-worktrees/task-mma2jp9tmah4h-759-create-npm" diff --name-only --diff-filter=U 2>/dev/null)
  if [ -n "$CONFLICT_FILES" ]; then
    echo "[merge] Conflicts detected in worktree, spawning AI resolver..."
    CONFLICT_LIST=$(echo "$CONFLICT_FILES" | tr '\n' ', ' | sed 's/,$//')

    RESOLVE_PROMPT="You are resolving git merge conflicts in a worktree at: /home/remote/Development/mfyz.com-worktrees/task-mma2jp9tmah4h-759-create-npm

The following files have merge conflicts: $CONFLICT_LIST

For each conflicting file:
1. Read the file — it contains <<<<<<< / ======= / >>>>>>> conflict markers
2. Understand what both sides intended
3. Resolve by keeping the intent of BOTH changes where possible
4. If changes are truly incompatible, prefer the branch's changes (the current/HEAD side)

After resolving ALL conflicts:
1. Stage the resolved files with git add
2. Complete the merge commit: git commit --no-edit

IMPORTANT: Do NOT abort the merge. Resolve all conflicts and commit."

    TASK_JSON=$(node "/home/remote/.claude/my_tools/taskman.js" exec "resolve-merge-task-mma2jp9tmah4h-759-create-npm" --prompt "$RESOLVE_PROMPT" --cwd "/home/remote/Development/mfyz.com-worktrees/task-mma2jp9tmah4h-759-create-npm" --source "nox-merge" 2>/dev/null)
    TASK_ID=$(echo "$TASK_JSON" | node -e "process.stdin.on('data',d=>{try{console.log(JSON.parse(d).id)}catch{}})" 2>/dev/null)

    if [ -n "$TASK_ID" ]; then
      echo "[merge] Conflict resolver task: $TASK_ID"
      WAITED=0
      MAX_WAIT=300
      while [ $WAITED -lt $MAX_WAIT ]; do
        sleep 10
        WAITED=$((WAITED + 10))
        STATUS=$(node "/home/remote/.claude/my_tools/taskman.js" get "$TASK_ID" 2>/dev/null | node -e "process.stdin.on('data',d=>{try{console.log(JSON.parse(d).status)}catch{}})" 2>/dev/null)
        echo "[merge] Task status: $STATUS ($WAITED s elapsed)"
        if [ "$STATUS" = "completed" ] || [ "$STATUS" = "failed" ] || [ "$STATUS" = "cancelled" ]; then
          break
        fi
      done

      if [ "$STATUS" != "completed" ]; then
        echo "[merge] ERROR: Conflict resolution failed (status: $STATUS)"
        git -C "/home/remote/Development/mfyz.com-worktrees/task-mma2jp9tmah4h-759-create-npm" merge --abort 2>/dev/null || true
        cleanup_fail
      fi
      echo "[merge] Conflicts resolved successfully"
    else
      echo "[merge] ERROR: Failed to spawn conflict resolver"
      git -C "/home/remote/Development/mfyz.com-worktrees/task-mma2jp9tmah4h-759-create-npm" merge --abort 2>/dev/null || true
      cleanup_fail
    fi
  else
    echo "[merge] ERROR: Merge failed but no conflict files detected"
    git -C "/home/remote/Development/mfyz.com-worktrees/task-mma2jp9tmah4h-759-create-npm" merge --abort 2>/dev/null || true
    cleanup_fail
  fi
fi

# STEP 4: Merge branch into main (guaranteed clean — conflicts already resolved in worktree)
echo "[merge] Merging task-mma2jp9tmah4h-759-create-npm into main"
git -C "/home/remote/Development/mfyz.com" checkout "main"
if ! git -C "/home/remote/Development/mfyz.com" merge "task-mma2jp9tmah4h-759-create-npm" --no-ff -m "Merge worktree: task-mma2jp9tmah4h-759-create-npm"; then
  echo "[merge] ERROR: Merge to main failed unexpectedly"
  git -C "/home/remote/Development/mfyz.com" merge --abort 2>/dev/null || true
  cleanup_fail
fi

# STEP 5: Cleanup — remove worktree, update todo, remove review state
echo "[merge] Removing worktree"
"/home/remote/.local/bin/wtp" remove --with-branch "task-mma2jp9tmah4h-759-create-npm" 2>/dev/null || {
  git -C "/home/remote/Development/mfyz.com" worktree remove --force "task-mma2jp9tmah4h-759-create-npm" 2>/dev/null || true
  git -C "/home/remote/Development/mfyz.com" branch -d "task-mma2jp9tmah4h-759-create-npm" 2>/dev/null || true
}

echo "[merge] Updating linked todo"
if [ -d "/home/remote/life/Todos" ]; then
  for f in "/home/remote/life/Todos"/*.md; do
    if grep -q "worktree_branch: task-mma2jp9tmah4h-759-create-npm" "$f" 2>/dev/null; then
      sed -i 's/^status: .*/status: done/' "$f"
      sed -i 's/^worktree_branch: .*/worktree_branch:/' "$f"
      echo "[merge] Updated todo: $f"
      break
    fi
  done
fi

rm -f "/home/remote/Development/mfyz.com/.worktree-reviews/task-mma2jp9tmah4h-759-create-npm.json" 2>/dev/null || true

# Release lock
rm -f "/home/remote/Development/mfyz.com/.nox-merge.lock" 2>/dev/null || true

echo "[merge] Done"
rm -f "/home/remote/Development/mfyz.com/.merge-log-task-mma2jp9tmah4h-759-create-npm.txt" 2>/dev/null || true
rm -f "$0" 2>/dev/null || true

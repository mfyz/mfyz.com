# /pr-schedule

This command automates the creation of scheduled publish PRs for hidden blog posts (completed drafts).

## Usage

```
/pr-schedule
```

No arguments needed. The command will scan all hidden posts and create PRs for those that don't already have one.

## What This Command Does

1. **Check Open PRs**: Use `gh pr list --state open` to get all existing scheduled publish PRs
2. **Find Hidden Posts**: Scan `src/content/blog/` for posts with `hidden: true` in frontmatter
3. **Filter**: Skip posts that already have an open PR (match by filename in branch name)
4. **For Each Remaining Hidden Post**:
   - Switch to `main` branch and pull latest
   - Create a new branch named `publish/{YYYY-MM-DD-slug-name}` (from filename)
   - Edit the post file to remove the `hidden: true` line from frontmatter
   - Commit with message: `Publish: {post title}`
   - Push the branch to remote
   - Create a PR with:
     - **Title**: `{YYYY-MM-DD} Publish: {post title}`
     - **Description**: Contains `/schedule {ISO date from filename}` and preview URL
   - Switch back to `main` branch before processing the next post

## Branch and PR Naming Convention

- **Branch**: `publish/{filename-without-extension}` (e.g., `publish/2026-01-20-vibe-coding-a-currency-converter-app`)
- **PR Title**: `{YYYY-MM-DD} Publish: {Post Title}` (e.g., `2026-01-20 Publish: Vibe Coding a Currency Converter App`)
- **PR Description Format**:
  ```
  /schedule 2026-01-20T09:00:00Z

  ## Post Details
  - **Title**: {Post Title}
  - **Slug**: {post-slug}
  - **Preview URL**: https://mfyz.com/{post-slug}/?preview=1

  ---
  This PR removes `hidden: true` from the post frontmatter to publish it.
  When merged, the post will become publicly visible.
  ```

## Workflow Details

### Step 1: Gather Information
```bash
# Get open PRs
gh pr list --state open --json number,title,headRefName

# Find hidden posts
grep -l "^hidden: true" src/content/blog/**/*.mdx
```

### Step 2: For Each Hidden Post Without a PR

```bash
# Ensure we're on main and up to date
git checkout main
git pull origin main

# Create publish branch
git checkout -b publish/{filename}

# Remove hidden: true from the file (use Edit tool)
# The line to remove: "hidden: true" from frontmatter

# Commit the change
git add {filepath}
git commit -m "Publish: {post title}"

# Push to remote
git push -u origin publish/{filename}

# Create PR with schedule command in description
gh pr create \
  --title "{YYYY-MM-DD} Publish: {post title}" \
  --body "$(cat <<'EOF'
/schedule {YYYY-MM-DD}T09:00:00Z

## Post Details
- **Title**: {post title}
- **Slug**: {slug}
- **Preview URL**: https://mfyz.com/{slug}/?preview=1

---
This PR removes `hidden: true` from the post frontmatter to publish it.
When merged, the post will become publicly visible.
EOF
)"

# Return to main for next iteration
git checkout main
```

### Step 3: Report Summary

After processing all posts, provide a summary:
- Number of hidden posts found
- Number of PRs created
- Number of posts skipped (already have PRs)
- Links to all created PRs

## Important Notes

- **Always return to main**: After each PR creation, switch back to `main` before processing the next post
- **Date extraction**: Extract the date from the filename (format: `YYYY-MM-DD-slug.mdx`)
- **Schedule time**: Default to 09:00:00Z (9 AM UTC) for the schedule time
- **Preview domain**: Use `https://mfyz.com/` as the base URL
- **Skip kitchen-sink**: Ignore `kitchen-sink-example.mdx` as it's a test/example file
- **Frontmatter editing**: Only remove the `hidden: true` line, preserve all other frontmatter
- **PR base branch**: All PRs should target `main` branch

## Example Output

```
Scanning for hidden posts...

Found 5 hidden posts:
1. 2026-01-06-cursor-composer1-trading-smarts-for-speed.mdx
2. 2026-01-13-why-i-spend-hours-planning-with-ai-before-writing-code.mdx
3. 2026-01-20-vibe-coding-a-currency-converter-app-in-a-few-hours.mdx
4. 2026-01-27-vibe-anywhere-claude-code-on-the-go-from-my-phone.mdx
5. 2026-02-03-pico-css-the-anti-tailwind-framework-i-actually-enjoy.mdx

Checking existing PRs...
- Found existing PR for: 2026-01-06-cursor-composer1-trading-smarts-for-speed.mdx (PR #40)

Creating PRs for remaining posts...

✅ Created PR #41: 2026-01-13 Publish: Why I Spend Hours Planning with AI Before Writing Code
   https://github.com/mfyz/mfyz.com/pull/41

✅ Created PR #42: 2026-01-20 Publish: Vibe Coding a Currency Converter App in a Few Hours
   https://github.com/mfyz/mfyz.com/pull/42

... (and so on)

Summary:
- Hidden posts found: 5
- PRs created: 4
- Posts skipped (existing PR): 1
```

## GitHub Workflow Integration

The created PRs contain `/schedule YYYY-MM-DDT09:00:00Z` in their description. A separate GitHub Actions workflow monitors these PRs and automatically merges them on the specified date/time.

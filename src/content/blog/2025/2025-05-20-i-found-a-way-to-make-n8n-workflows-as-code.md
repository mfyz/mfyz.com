---
title: "I found a way to make n8n workflows-as-code"
slug: i-found-a-way-to-make-n8n-worksflows-as-code
date: 2025-05-20
tags: ["n8n", "code", "automation", "workflow", "ai", "gitops"]
category: Dev
---

I love n8n. It's flexible, open source, self-hostable, and you can automate just about anything with it.

But one thing has always bugged me: **there's no native way to manage workflows as code.**

If you're trying to build, version, or collaborate on workflows outside the n8n UI—you're mostly out of luck. There's an API, but no official CLI or file-based project structure. You can export/import JSON manually, but it's clunky for anything serious.

So I put together a few simple scripts to manage n8n workflows like code.

👉 [https://github.com/mfyz/n8n-workflows-as-code](https://github.com/mfyz/n8n-workflows-as-code)

## What This Project Does

With a few Node.js scripts and a small folder structure, I can:

- Create new workflows (both in n8n and locally)
- Pull existing workflows from the API into versionable JSON files
- Push local workflows back to n8n (with backup/versioning)
- Execute workflows by name, ID, or folder

Here's the folder layout:

```
├── package.json
├── scripts
│   ├── create.js
│   ├── execute.js
│   ├── pull.js
│   └── push.js
└── workflows
    ├── my-awesome-flow/
    │   └── workflow.json
    └── test-workflow-as-code/
        └── workflow.json
```

Each workflow gets its own folder. You can store the workflow.json, add comments in Git commits, back it up, even sync with teammates via Git.

## Setup

Install dependencies:

```bash
npm install
```

Set your .env file:

```
N8N_API_URL=http://localhost:5678/api
N8N_API_KEY=your-api-key-here
BACKUP_WORKFLOWS_ON_PUSH=true
BACKUP_WORKFLOWS_ON_PULL=true
```

Then run commands like:

```bash
npm run create "My New Flow"
npm run pull my-awesome-flow
npm run push my-awesome-flow
npm run execute test-workflow-as-code
```

The CLI is intentionally simple. Each script handles one job.

## Why Bother?

If you're just clicking around the UI, you might not care. But once you start building more workflows, or working with a team, these become real problems:

- You can't version control workflows in Git
- There's no dev/prod separation
- You can't easily test changes or roll back
- You can't diff changes between two versions

This workflow-as-code setup gives you:

- File-based project structure
- Local JSON backups with version numbers
- Ability to sync workflows with remote n8n instance
- A consistent way to manage changes

It's not perfect, but it works.

## Limitations

Let's be honest: this is a workaround. n8n is still UI-first, and the API isn't designed for GitOps-style flow management, although nothing stops you 🙂 But I still like the idea of versioning or even better revisioning each step when I poke with my workflows.

You can't fully design or test workflows without opening the editor UI. There's no schema validation. And there's no real CI/CD integration unless you build that yourself.

I wouldn't build a business on top of this—but for prototyping, internal tools, or keeping your workflows under version control, this setup is more than enough.

## 🤩 Big Bonus: Use with AI Workflows

One of my favorite uses of n8n right now is building **AI workflows**—LLM prompts, content generation flows, agents that react to inputs, etc.

These scripts make it easier to build, tweak, and experiment with those flows. You can keep backups of different prompt structures, share workflows across projects, and test them in a repeatable way.

n8n has native AI nodes, and they're getting better. But you're still bound to work with clicks. I wanted to have a fully Agent-ready workflow that I could spin up, deploy, test n8n workflows using prompts, and this approach is almost hands off (not fully yet), if you are in Cursor/Copilot world. Basically this was my way to make n8n more vibe-friendly.

If you want to give it a spin, you can grab the example setup and scripts from this post and plug it into your own project. I'll probably keep iterating on this and maybe turn it into a CLI tool later.

For now, it works—and it lets me treat my workflows like code. That's a good enough win.

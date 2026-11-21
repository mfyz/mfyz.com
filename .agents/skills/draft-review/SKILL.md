---
name: draft-review
description: Run live inline review rounds on an mfyz.com Astro blog draft from the current agent chat. Use when Fatih asks for draft review mode, inline preview feedback, or $draft-review.
---

Use the workspace's Astro dev server and the full draft preview URL. Preserve
`?preview=1` for a hidden draft. Use the reachable Tailscale address when
reviewing from another device on the tailnet.

From the repository root, run:

```sh
node scripts/draft-review/cli.mjs start '<full-preview-url>'
```

Share the returned review URL in a progress message. Keep its fragment intact.
The token grants access to submit feedback for this draft session.

## Watch one round

When subagents are available, delegate the wait to a fresh subagent on the
cheapest available model and lowest reasoning effort. Use
`fork_turns="none"` and name it `draft_review_watch`. Supply only the
workspace path, token, round number, deadline, and the watch instructions below.
Keep the parent turn open. Wait for the watcher to report an outcome. On context
compaction, check for the existing watcher and recover the token and round from
the start or next command before doing any polling yourself.

Watcher instructions:

- Run `node scripts/draft-review/cli.mjs watch <token> 1800` in a persistent
  process if supported. If the tool yields a process or cell ID, wait on that
  same ID in slices of up to 30 seconds. Avoid launching a new process per check.
- If commands are killed at a fixed time limit and cannot be resumed, use
  repeated `watch <token> 25` calls, or a shorter slice that fits. Repeat only
  after `waiting`, within the existing round deadline.
- Report only `submitted`, `expired`, `closed`, or an error, with the round
  number. Skip progress messages and file edits.

If the host lacks subagents, follow the same watch commands in the parent turn.
A `watch` command returns status only. Keep the per-round deadline across
compaction or tool retries.

## Incorporate feedback

On `submitted`, run `node scripts/draft-review/cli.mjs wait <token> 0` once
in the parent chat to read the feedback. Use the quote and context to locate
prose in the Markdown or MDX. For an element review, use the widget and element
selectors plus the visible label. A local `source` URL can identify the HTML or
SVG asset under `public/`. For an inline Pele diagram, edit the Mermaid source
in the draft. For an image, use its alt text and source URL to find the
component invocation in the draft. A deletion requests removal of the
selected text or element.
Apply and verify the edits here. Keep the submitted round available if you hit
a blocker.

### Alternatives across rounds

The review UI sends `alternatives` with an ID, an anchor, and optional
direction. It sends `alternative-response` with the same ID, a zero-based
`option` index or `null`, and an optional comment. `wait` includes the
current option sets in the session's `alternatives` array.

- For a new request or a response with `option: null`, keep the original
  text in the draft. Generate two to eight options guided by the comment.
  Write them to a temporary JSON file with shape
  `[{"id":"<request-id>","options":["First option","Second option"]}]`
  and pass it as the last argument to `next <token> <submitted-round>`.
  Include every new or revised set. Unanswered sets carry forward.
- For a response with a selected index, apply that option along with any
  requested adjustment in its comment. Verify the draft before advancing.
  The CLI removes that set from the next round. If the comment explicitly
  asks for more options based on the selected one, supply a revised set instead.
- If a comment with no selection explicitly gives final wording, apply it and
  include `{"id":"<request-id>","resolved":true}` in the response JSON.
  This clears the set. Treat an open-ended direction as a request to iterate.

After the updated preview is ready, run
`node scripts/draft-review/cli.mjs next <token> <submitted-round>`. Say
“Updated draft ready” with the same link in a progress message, then watch the
new round with a fresh watcher. Reuse the task name only if the tool allows it,
or append the round number. The toolbar opens the next round in place when the preview is current.
Each new round has a fresh 30 minutes.

Stop if Fatih ends review or the round expires. If review ends explicitly, run
`node scripts/draft-review/cli.mjs close <token>` to end an active wait.
A new session can be started later.

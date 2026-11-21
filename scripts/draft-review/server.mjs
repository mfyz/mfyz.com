import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";
import { endpoint, readSession, statusOf, submitFeedback } from "./session.mjs";

const maxBodyBytes = 128 * 1024;
const clientModules = new Map([
  [`${endpoint}/client.js`, new URL("./client.js", import.meta.url)],
  [`${endpoint}/widgets.js`, new URL("./widgets.js", import.meta.url)],
]);

function parseItems(items, alternatives = []) {
  if (!Array.isArray(items) || !items.length || items.length > 40) return null;
  const validText = (value, limit) => typeof value === "string" && value.length <= limit;
  const selector = value => validText(value, 1000) && value.trim();
  const offset = value => Number.isSafeInteger(value) && value >= 0;
  const answered = new Set();
  const parsed = [];

  for (const item of items) {
    if (!item || !validText(item.comment, 3000)) return null;
    const { kind, comment, quote, widget, source, start, prefix, suffix } = item;
    if (kind === "alternative-response") {
      const pending = alternatives.find(choice => choice.id === item.id);
      if (!pending || answered.has(item.id)) return null;
      const option = item.option;
      if (option === null ? !comment.trim() : !(offset(option) && option < pending.options.length)) return null;
      answered.add(item.id);
      parsed.push({ kind, id: pending.id, option, comment });
      continue;
    }

    if (!["comment", "delete", "alternatives"].includes(kind) ||
        !validText(quote, 8000) || !quote.trim() || (kind === "comment" && !comment.trim())) return null;
    let anchor;
    if (item.selector !== undefined) {
      if (!selector(item.selector) || !selector(widget) ||
          (start !== undefined && !offset(start)) ||
          (source !== undefined && !(validText(source, 1024) && /^\/(?!\/)/.test(source)))) return null;
      anchor = { quote, selector: item.selector, widget, source, start };
    } else {
      if (!validText(prefix, 60) || !validText(suffix, 60) || !offset(start)) return null;
      anchor = { quote, prefix, suffix, start };
    }
    parsed.push({ kind, comment, ...anchor, ...(kind === "alternatives" && { id: randomBytes(12).toString("hex") }) });
  }
  return parsed;
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    request.on("data", chunk => {
      size += chunk.length;
      if (size <= maxBodyBytes) chunks.push(chunk);
    });
    request.on("end", () => {
      if (size > maxBodyBytes) return reject(new Error("Feedback is too large."));
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new Error("Invalid feedback."));
      }
    });
    request.on("error", reject);
  });
}

export default function draftReview() {
  return {
    name: "mfyz-draft-review",
    hooks: {
      "astro:server:setup": ({ server }) => {
        const publicDir = server.config.publicDir;
        const serverId = randomBytes(8).toString("hex");
        let assetVersion = 0;
        if (publicDir) {
          server.watcher.on("all", (event, file) => {
            if (!["add", "change", "unlink"].includes(event)) return;
            const asset = relative(publicDir, resolve(server.config.root, file));
            if (asset && asset !== ".." && !asset.startsWith("../") && !asset.startsWith("..\\") && !isAbsolute(asset)) {
              assetVersion++;
            }
          });
        }
        server.middlewares.use(async (request, response, next) => {
          const url = new URL(request.url, "http://localhost");
          const clientModule = clientModules.get(url.pathname);
          if (url.pathname !== endpoint && !clientModule) return next();

          response.setHeader("Cache-Control", "no-store");
          response.setHeader("X-Content-Type-Options", "nosniff");
          const send = (code, body) => {
            response.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
            response.end(JSON.stringify(body));
          };

          try {
            if (clientModule && request.method === "GET") {
              const script = readFileSync(clientModule);
              response.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" });
              return response.end(script);
            }

            const token = request.headers["x-draft-review"];
            const session = readSession(token);
            if (!session || url.searchParams.get("page") !== session.path) {
              return send(404, { error: "Review session not found." });
            }
            if (request.method === "GET") {
              return send(200, {
                round: session.round,
                status: statusOf(session),
                alternatives: session.alternatives ?? [],
                assetRevision: `${serverId}:${assetVersion}`,
              });
            }
            if (request.method !== "POST") return send(405, { error: "Method not allowed." });

            const origin = request.headers.origin;
            if (!origin || new URL(origin).host !== request.headers.host ||
                request.headers["sec-fetch-site"] === "cross-site" ||
                request.headers["content-type"] !== "application/json") {
              return send(403, { error: "Open the review link directly to submit feedback." });
            }

            let body;
            try {
              body = await readBody(request);
            } catch (error) {
              return send(400, { error: error.message });
            }
            const items = parseItems(body?.items, session.alternatives);
            if (!items) return send(400, { error: "Add at least one valid review change." });

            if (!submitFeedback(token, body.round, items)) {
              return send(409, { error: "This review round is no longer open. Reload to check for a new round." });
            }
            return send(200, { round: body.round, status: "submitted" });
          } catch (error) {
            console.error("Draft review:", error);
            return send(500, { error: "Could not access the review session." });
          }
        });
      },
    },
  };
}

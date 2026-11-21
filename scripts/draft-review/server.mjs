import { readFileSync } from "node:fs";
import { endpoint, readSession, statusOf, submitFeedback } from "./session.mjs";

const maxBodyBytes = 128 * 1024;
const clientModules = new Map([
  [`${endpoint}/client.js`, new URL("./client.js", import.meta.url)],
  [`${endpoint}/widgets.js`, new URL("./widgets.js", import.meta.url)],
]);

function parseItems(items) {
  if (!Array.isArray(items) || !items.length || items.length > 40) return null;
  const validText = (value, limit) => typeof value === "string" && value.length <= limit;
  const selector = value => validText(value, 1000) && value.trim();
  const offset = value => Number.isSafeInteger(value) && value >= 0;
  const valid = items.every(item =>
    item && ["comment", "delete"].includes(item.kind) &&
    validText(item.quote, 8000) && item.quote.trim() &&
    validText(item.comment, 3000) && (item.kind === "delete" || item.comment.trim()) &&
    (item.selector !== undefined
      ? selector(item.selector) && selector(item.widget) &&
        (item.start === undefined || offset(item.start)) &&
        (item.source === undefined || (validText(item.source, 1024) && /^\/(?!\/)/.test(item.source)))
      : validText(item.prefix, 60) && validText(item.suffix, 60) &&
        offset(item.start))
  );
  if (!valid) return null;
  return items.map(({ kind, quote, comment, selector, widget, source, prefix, suffix, start }) =>
    selector ? { kind, quote, comment, selector, widget, source, start }
      : { kind, quote, comment, prefix, suffix, start });
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
              return send(200, { round: session.round, status: statusOf(session) });
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
            const items = parseItems(body?.items);
            if (!items) return send(400, { error: "Add at least one valid comment or deletion." });

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

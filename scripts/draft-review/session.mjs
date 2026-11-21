import { createHash, randomBytes } from "node:crypto";
import { linkSync, mkdirSync, readFileSync, realpathSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const roundMs = 30 * 60 * 1000;
export const endpoint = "/__draft-review";
const project = createHash("sha256").update(realpathSync(process.cwd())).digest("hex").slice(0, 16);
const directory = join(tmpdir(), `mfyz-draft-review-${process.getuid?.() ?? "user"}-${project}`);
const validToken = /^[a-f0-9]{48}$/;

const file = token => join(directory, `${token}.json`);
const feedbackFile = (token, round) => join(directory, `${token}.${round}.json`);
export const pagePath = path => path.replace(/\/$/, "") || "/";
export const statusOf = session =>
  session.feedback ? "submitted" : Date.now() >= session.expiresAt ? "expired" : "open";

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

export function readSession(token) {
  if (typeof token !== "string" || !validToken.test(token)) return null;
  const session = readJson(file(token));
  if (!session) return null;
  const feedback = readJson(feedbackFile(token, session.round));
  return feedback ? { ...session, feedback } : session;
}

function writeTemporary(path, data) {
  const temporary = `${path}.${randomBytes(6).toString("hex")}`;
  writeFileSync(temporary, JSON.stringify(data), { mode: 0o600, flag: "wx" });
  return temporary;
}

export function saveSession(token, session) {
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  renameSync(writeTemporary(file(token), session), file(token));
}

export function submitFeedback(token, round, items) {
  const current = readSession(token);
  if (!current || current.round !== round || statusOf(current) !== "open") return false;

  // Publish one complete submission even if two dev servers accept the same round.
  const target = feedbackFile(token, round);
  const temporary = writeTemporary(target, items);
  try {
    linkSync(temporary, target);
    return true;
  } catch (error) {
    if (error.code === "EEXIST") return false;
    throw error;
  } finally {
    rmSync(temporary, { force: true });
  }
}

export function createSession(path) {
  const token = randomBytes(24).toString("hex");
  const session = { path: pagePath(path), round: 1, expiresAt: Date.now() + roundMs };
  saveSession(token, session);
  return { token, session };
}

export function closeSession(token) {
  const session = readSession(token);
  if (!session) return;
  rmSync(file(token), { force: true });
  for (let round = 1; round <= session.round; round++) {
    rmSync(feedbackFile(token, round), { force: true });
  }
}

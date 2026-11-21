#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { setTimeout } from "node:timers/promises";
import { closeSession, createSession, readSession, roundMs, saveSession, statusOf } from "./session.mjs";

const [command, value, argument, optionsFile] = process.argv.slice(2);
const print = result => console.log(JSON.stringify(result));

function advanceAlternatives(session, replies) {
  if (!Array.isArray(replies)) throw new Error("Alternatives must be a JSON array.");
  const pending = new Map((session.alternatives ?? []).map(item => [item.id, item]));
  const requested = new Set();
  const responses = new Map();
  for (const { kind, id, option, comment, ...anchor } of session.feedback) {
    if (kind === "alternatives") {
      requested.add(id);
      pending.set(id, { id, ...anchor, direction: comment });
    } else if (kind === "alternative-response") {
      if (option === null) requested.add(id);
      responses.set(id, option);
      pending.set(id, { ...pending.get(id), direction: comment });
    }
  }

  const handled = new Set();
  for (const reply of replies) {
    const { id, options, resolved } = reply ?? {};
    if (handled.has(id) || (!requested.has(id) && !responses.has(id))) {
      throw new Error("Pass each new or answered alternative ID at most once.");
    }
    handled.add(id);
    requested.delete(id);
    if (resolved === true && responses.has(id) && options === undefined) {
      pending.delete(id);
      continue;
    }
    if (!Array.isArray(options) || options.length < 2 || options.length > 8 ||
        options.some(text => typeof text !== "string" || !text.trim() || text.length > 3000)) {
      throw new Error("Provide two to eight plain-text options for each requested alternative ID.");
    }
    pending.set(id, { ...pending.get(id), options: options.map(text => text.trim()), updatedRound: session.round + 1 });
  }
  if (requested.size) throw new Error("Respond to all new or revised alternatives before opening the next round.");
  for (const [id, option] of responses) {
    if (option !== null && !handled.has(id)) pending.delete(id);
  }
  return [...pending.values()];
}

async function run() {
  if (command === "start") {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
      throw new Error("Pass the complete HTTP(S) preview URL.");
    }
    const { token, session } = createSession(url.pathname);
    url.hash = `draft-review=${token}`;
    print({ token, url: url.href, ...session });
    return;
  }
  if (!["wait", "watch", "next", "close"].includes(command)) {
    throw new Error("Usage: cli.mjs start <preview-url> | wait|watch <token> [slice-seconds] | next <token> <submitted-round> [alternatives.json] | close <token>");
  }
  const session = readSession(value);
  if (!session) throw new Error("Review session not found.");
  if (command === "close") {
    closeSession(value);
    print({ status: "closed" });
    return;
  }
  if (command === "next") {
    if (!session.feedback || session.round !== Number(argument)) {
      throw new Error("Pass the submitted round number after addressing its feedback.");
    }
    const replies = optionsFile ? JSON.parse(readFileSync(optionsFile, "utf8")) : [];
    const alternatives = advanceAlternatives(session, replies);
    const next = { path: session.path, round: session.round + 1, expiresAt: Date.now() + roundMs, alternatives };
    saveSession(value, next);
    print(next);
    return;
  }

  const seconds = Number(argument ?? 25);
  if (!Number.isFinite(seconds) || seconds < 0 || seconds > 1800) {
    throw new Error("Wait slice must be between 0 and 1800 seconds.");
  }
  const until = Date.now() + seconds * 1000;
  for (;;) {
    const current = readSession(value);
    if (!current) return print({ status: "closed" });
    const status = statusOf(current);
    if (status !== "open") {
      return print(command === "watch" ? { status, round: current.round } : { status, ...current });
    }
    const remaining = Math.min(until, current.expiresAt) - Date.now();
    if (remaining <= 0) return print({ status: "waiting", round: current.round, expiresAt: current.expiresAt });
    await setTimeout(Math.min(1000, remaining));
  }
}

run().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});

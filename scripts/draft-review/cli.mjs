#!/usr/bin/env node
import { setTimeout } from "node:timers/promises";
import { closeSession, createSession, readSession, roundMs, saveSession, statusOf } from "./session.mjs";

const [command, value, argument] = process.argv.slice(2);
const print = result => console.log(JSON.stringify(result));

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
    throw new Error("Usage: cli.mjs start <preview-url> | wait|watch <token> [slice-seconds] | next <token> <submitted-round> | close <token>");
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
    const next = { path: session.path, round: session.round + 1, expiresAt: Date.now() + roundMs };
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

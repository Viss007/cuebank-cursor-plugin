#!/usr/bin/env node
/**
 * CueBank Cursor sessionStart hook — force-inject backup (experimental).
 *
 * Not installed with the CueBank plugin. Not pasted from Connection.
 * Primary path remains agent-calls-first: the plugin's alwaysApply rule asks
 * the agent to call continuity_recent. This hook is the ambient fallback when
 * that tool call is skipped.
 *
 * On fire: Bearer-auth to CueBank MCP, call continuity_recent, print
 * { "additional_context": "<notes text>" } per Cursor hooks docs.
 *
 * Auth: CUEBANK_ACCESS_KEY or CUEBANK_BEARER (device access key).
 * URL:  CUEBANK_MCP_URL (default https://cuebank-mcp.up.railway.app/mcp).
 *
 * Fail-open: on any error prints {} and exits 0 so session start is not blocked.
 *
 * HOST LIMIT (2026-10): Cursor staff confirm sessionStart additional_context is
 * often dropped (composer-handle race). Cloud agents skip sessionStart.
 */
import { stdin } from "node:process";

const DEFAULT_MCP = "https://cuebank-mcp.up.railway.app/mcp";
const TIMEOUT_MS = 8_000;

function readEnvKey() {
  const raw =
    process.env.CUEBANK_ACCESS_KEY?.trim() ||
    process.env.CUEBANK_BEARER?.trim() ||
    "";
  return raw.length > 0 ? raw : null;
}

function mcpUrl() {
  const u = process.env.CUEBANK_MCP_URL?.trim();
  return u && u.length > 0 ? u.replace(/\+$/, "") : DEFAULT_MCP;
}

/** Drain stdin (Cursor sends sessionStart JSON); ignore content. */
async function drainStdin() {
  if (stdin.isTTY) return;
  await new Promise((resolve) => {
    stdin.on("data", () => {});
    stdin.on("end", resolve);
    stdin.on("error", resolve);
    setTimeout(resolve, 200);
  });
}

function failOpen() {
  process.stdout.write("{}\n");
  process.exit(0);
}

async function rpc(url, headers, method, params, notify = false, id = 1) {
  const body = notify
    ? { jsonrpc: "2.0", method, params }
    : { jsonrpc: "2.0", id, method, params };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    return res;
  } finally {
    clearTimeout(t);
  }
}

function parseSseOrJson(text) {
  const line = text.split("\n").find((l) => l.startsWith("data: "));
  if (line) return JSON.parse(line.slice(6));
  return JSON.parse(text);
}

function formatNotes(payload) {
  const lines = [
    "CueBank notes (sessionStart force-inject backup — experimental).",
    "Primary path remains calling continuity_recent; these notes are a fallback when that call was skipped.",
    "",
  ];
  const rules = payload?.saved_rules;
  if (Array.isArray(rules) && rules.length > 0) {
    lines.push("## Saved rules");
    for (const r of rules) {
      const title = typeof r?.title === "string" ? r.title : "";
      const text = typeof r?.text === "string" ? r.text : typeof r === "string" ? r : JSON.stringify(r);
      lines.push(title ? `- ${title}: ${text}` : `- ${text}`);
    }
    lines.push("");
  }
  const notes = payload?.notes;
  if (Array.isArray(notes) && notes.length > 0) {
    lines.push("## Recent notes");
    for (const n of notes) {
      const title = typeof n?.title === "string" ? n.title : "";
      const text = typeof n?.text === "string" ? n.text : JSON.stringify(n);
      lines.push(title ? `### ${title}\n${text}` : text);
      lines.push("");
    }
  }
  if (lines.length <= 3) {
    lines.push("(No saved rules or notes returned.)");
  }
  return lines.join("\n").trim();
}

async function main() {
  await drainStdin();
  const key = readEnvKey();
  if (!key) failOpen();

  const url = mcpUrl();
  const baseHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
    Authorization: `Bearer ${key}`,
  };

  let sessionId = null;
  try {
    const initRes = await rpc(url, baseHeaders, "initialize", {
      protocolVersion: "2025-03-26",
      capabilities: {},
      clientInfo: { name: "cuebank-cursor-hooks", version: "0.1.0" },
    });
    sessionId = initRes.headers.get("mcp-session-id");
    const initText = await initRes.text();
    if (!initRes.ok) failOpen();
    const initMsg = parseSseOrJson(initText);
    if (initMsg.error) failOpen();

    const h = { ...baseHeaders };
    if (sessionId) h["mcp-session-id"] = sessionId;

    await rpc(url, h, "notifications/initialized", {}, true);

    const callRes = await rpc(
      url,
      h,
      "tools/call",
      { name: "continuity_recent", arguments: { limit: 10 } },
      false,
      2,
    );
    const callText = await callRes.text();
    if (!callRes.ok) failOpen();
    const callMsg = parseSseOrJson(callText);
    if (callMsg.error || callMsg.result?.isError) failOpen();

    const contentText = callMsg.result?.content?.[0]?.text || "";
    let payload;
    try {
      payload = JSON.parse(contentText);
    } catch {
      payload = { raw: contentText.slice(0, 4000) };
    }

    const additional_context = formatNotes(payload);
    process.stdout.write(JSON.stringify({ additional_context }) + "\n");
    process.exit(0);
  } catch {
    failOpen();
  }
}

main();

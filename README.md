# CueBank for Cursor

CueBank keeps the rules, corrections, preferences, and decisions you give your agent as notes. Every new Cursor chat loads them first, so you do not repeat yourself.

## What you get

- **Connector**: the CueBank MCP server at `https://cuebank-mcp.up.railway.app/mcp` (Streamable HTTP). You sign in with your CueBank account over OAuth.
- **Rule** (`rules/cuebank.mdc`, always on): load notes with `continuity_recent` before the first reply in a new chat. What you say is the authority. Rules and corrections are saved the same turn. The agent pushes back when a request conflicts with a saved note.
- **Skills**:

| Skill | Use it to |
| --- | --- |
| `cuebank-notes-first` | Load saved notes at the start of a chat or before risky work |
| `cuebank-save` | Save a new rule, correction, preference, or decision |
| `cuebank-search` | Find what was decided before |
| `cuebank-fix-note` | Change the wording of a saved note, or delete it on request |
| `cuebank-account` | Check plan, usage, and connection, or report a problem |

## Tools

| Tool | What it does |
| --- | --- |
| `continuity_recent` | Latest saved rules and notes, newest first |
| `continuity_search` | Saved notes that match a query |
| `continuity_add` | Save a new note in your words |
| `continuity_update` | Change a saved note by id |
| `continuity_delete` | Delete a saved note by id, only when you ask |
| `authority_find` | Search CueBank product facts |
| `account_billing` | Plan and billing status (paid plans) |
| `account_usage` | Calls in the last 30 days (paid plans) |
| `account_connection` | Access key status and connected agents, never the key (paid plans) |
| `support_report` | File a bug or failure report with CueBank support (paid plans) |

Billing is on the CueBank dashboard. The plugin does not take payments in Cursor.

## Install

1. In Cursor, open **Customize** (or the marketplace), find **CueBank**, and choose **Install**.
2. When Cursor connects the CueBank server, sign in to your CueBank account.
3. Start a new chat. The agent loads your notes before it replies.

Local install from a clone:

```bash
git clone https://github.com/Viss007/cuebank-cursor-plugin.git
mkdir -p ~/.cursor/plugins/local
cp -R cuebank-cursor-plugin ~/.cursor/plugins/local/cuebank
```

Then run **Developer: Reload Window**. Use a real copy. Cursor ignores symlinks that point outside `~/.cursor/plugins/local/`.

### Without the plugin

Add the server to `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (one project):

```json
{
  "mcpServers": {
    "cuebank": {
      "url": "https://cuebank-mcp.up.railway.app/mcp"
    }
  }
}
```

To use an access key instead of OAuth, copy the Cursor setup from the **Connection** page on the dashboard.

## Optional: experimental hooks (not installed)

`experimental-hooks/` holds a `sessionStart` hook that loads notes into the chat as `additional_context`. It is **not installed** with the plugin, and the manifests do not reference it. Cursor often drops `additional_context` from `sessionStart`, and cloud agents skip that hook. The rule above is the supported way to load notes. See `experimental-hooks/README.md` if you want to try it.

## Files

```
.cursor-plugin/plugin.json   Cursor manifest
.mcp.json                    Cursor connector (OAuth)
plugin.json, mcp.json        Same package in the portable Agent Plugins format
rules/cuebank.mdc            Always-on notes-first rule
skills/*/SKILL.md            Five CueBank skills
assets/logo.png              512×512 logo
experimental-hooks/          Optional, not installed
```

## Privacy and support

Notes are stored in your CueBank account. You can review, change, and delete them from the agent or the dashboard. Do not save passwords, keys, or payment details as notes.

| | |
| --- | --- |
| Dashboard | https://cuebank.up.railway.app |
| Support | https://cuebank.up.railway.app/support |
| Privacy | https://cuebank.up.railway.app/privacy |
| Terms | https://cuebank.up.railway.app/terms |

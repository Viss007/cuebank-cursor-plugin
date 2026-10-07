# CueBank — Cursor plugin

Keep rules, corrections, preferences, and decisions as **notes** that apply in future Cursor chats.

**Short:** Keep rules across chats.

## What it does

- Connects Cursor to the live CueBank MCP gateway (`https://cuebank-mcp.up.railway.app/mcp`) over **OAuth** (Sign in to your CueBank account).
- Ships an **alwaysApply** rule that asks the agent to call `continuity_recent` before the first reply in a new chat (notes-first).
- Tools (account-scoped): `continuity_recent`, `continuity_search`, `continuity_add`, `continuity_update`, `continuity_delete`, `authority_find`, and on Paid seats `support_report`.

Billing stays on the CueBank dashboard — this plugin does not sell subscriptions or take payments inside Cursor.

## Install

### From a marketplace (after publish)

1. Open **Customize** in Cursor.
2. Find **CueBank** and **Install** (project or user scope).
3. Complete OAuth when prompted (Sign in to CueBank).
4. Start a **new** chat so the notes-first rule loads.

### Local / from this folder

1. Copy this directory to `~/.cursor/plugins/local/cuebank` (or symlink a clone into that folder — Cursor only follows symlinks that resolve inside `local/`).
2. Reload the window (**Developer: Reload Window**).
3. Confirm CueBank under Customize → MCP / Rules.
4. Authenticate via OAuth when connecting the MCP server.

### Manual MCP (without the plugin)

In `.cursor/mcp.json` (or `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "cuebank": {
      "url": "https://cuebank-mcp.up.railway.app/mcp"
    }
  }
}
```

Cursor discovers OAuth from the gateway’s `/.well-known/oauth-*` metadata. Prefer OAuth over pasting an access key.

## Package layout

```
.cursor-plugin/plugin.json   # Cursor Plugin manifest (marketplace)
plugin.json                  # Agent Plugins manifest (portable)
mcp.json / .mcp.json         # Remote Streamable HTTP MCP (OAuth)
rules/cuebank.mdc            # alwaysApply notes-first rule (ships with install)
assets/logo.png              # 512×512
experimental-hooks/          # NOT installed — host-broken sessionStart backup
README.md
LICENSE
```

The notes-first rule ships in `rules/cuebank.mdc`. Buyers install the plugin and sign in. They do not paste a second copy of that rule, and the CueBank Connection page does not ask them to.

This folder (`apps/mcp-gateway/cursor-plugin/` in the CueBank monorepo) is the source of truth. The public repo `https://github.com/Viss007/cuebank-cursor-plugin` should pick up this README. Do not add a plugin-root `hooks.json` there — `experimental-hooks/` stays unwired.

**Hooks are packaged here and not installed.** `experimental-hooks/` holds a `sessionStart` force-inject backup. Cursor often drops `additional_context`, and cloud agents skip `sessionStart`, so those files are not referenced by the plugin manifests and are not pasted from Connection. Do not treat them as the notes path.

## Links

| | |
| --- | --- |
| Dashboard | https://cuebank.up.railway.app |
| Support | https://cuebank.up.railway.app/support |
| Privacy | https://cuebank.up.railway.app/privacy |
| Terms | https://cuebank.up.railway.app/terms |
| MCP URL | https://cuebank-mcp.up.railway.app/mcp |

## Submit (human only)

Do **not** submit from an agent. After a public GitHub repo exists:

1. [cursor.directory/plugins/new](https://cursor.directory/plugins/new) — paste the public repo URL (auto-detects `.mcp.json`, `rules/*.mdc`).
2. [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish) — paste the same repo for official Marketplace review.

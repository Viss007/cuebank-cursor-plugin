# Experimental Cursor hooks (not installed)

This folder is the monorepo copy of the sessionStart force-inject backup. It is not part of the CueBank plugin install.

- `plugin.json` and `.cursor-plugin/plugin.json` do not reference these files.
- The CueBank Connection page does not ask buyers to paste them.
- Cursor often drops `sessionStart` → `additional_context` (composer-handle race). Cloud agents skip `sessionStart`.
- Do not claim notes without a `continuity_recent` tool call until an end-to-end prove passes.

The notes path that ships with the plugin is `rules/cuebank.mdc`.

`hooks.json` and `session-start.mjs` are here so the kit has one owner. Copying them into `.cursor/hooks.json` and `.cursor/hooks/cuebank-session-start.mjs` is a manual experiment, not the buyer setup. The script reads `CUEBANK_ACCESS_KEY` or `CUEBANK_BEARER` and fail-opens (prints `{}`, exit 0) on any error.

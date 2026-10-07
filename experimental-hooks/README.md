# Experimental hooks (optional, not installed)

These files are not part of the plugin install. The plugin manifests do not reference them, and the CueBank Connection page does not ask you to paste them.

- `hooks.json` runs `session-start.mjs` on `sessionStart`.
- The script reads `CUEBANK_ACCESS_KEY` (or `CUEBANK_BEARER`), calls `continuity_recent`, and prints the notes as `additional_context`. On any error it prints `{}` and exits 0, so it never blocks a chat.

Known limits: Cursor often drops `sessionStart` `additional_context`, and cloud agents skip `sessionStart`. The supported way to load notes is the always-on rule in `rules/cuebank.mdc`.

To try it, copy `hooks.json` to `.cursor/hooks.json` and `session-start.mjs` to `.cursor/hooks/cuebank-session-start.mjs`, then set `CUEBANK_ACCESS_KEY`.

---
name: cuebank-save
description: Save a rule, correction, preference, or decision to CueBank so it applies in future chats. Use when the user says never, always, don't, from now on, stop, I prefer, remember this, or settles a decision, even if CueBank is not mentioned.
---

# Save a note

1. Save in the same turn the user says it. Do not ask first.
2. If it changes something already saved, update that note instead (see `cuebank-fix-note`). Run `continuity_search` when you are not sure.
3. Call `continuity_add` with `text` in the user's own words (up to 8000 characters) and an optional short `title` (up to 200 characters). One rule per note.
4. Tell the user in one line what you saved.
5. Never save passwords, access keys, tokens, or payment details.

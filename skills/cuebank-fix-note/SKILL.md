---
name: cuebank-fix-note
description: Correct or remove a saved CueBank note. Use when the user says a saved note is wrong, wants its wording changed, or asks to forget or delete it.
---

# Fix or remove a note

1. Find the note id with `continuity_search` (or `continuity_recent` for recent notes).
2. To change it, call `continuity_update` with the `id` and the new `text` and/or `title`, in the user's words. Prefer this to deleting and re-adding.
3. Call `continuity_delete` with the `id` only when the user asks to remove or forget the note.
4. Tell the user in one line what changed. `continuity_update` returns the old text, so quote it if that helps.
5. If more than one note matches, ask which one before you change anything.

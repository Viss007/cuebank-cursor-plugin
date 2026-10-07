---
name: cuebank-notes-first
description: Load the user's saved CueBank rules and notes before replying. Use at the start of every new chat, after a long break, before risky actions, and when the user asks what is saved.
---

# Notes first

1. Call `continuity_recent` before any reply text, including status lines and clarifying questions. Default `limit` is 5; pass up to 20 when the user asks what is saved.
2. Apply what comes back to this reply: tone, format, length, and any rule about the task.
3. If a saved note conflicts with what the user just said, follow the user and update the note in the same turn (see `cuebank-fix-note`).
4. If the call fails or CueBank is not connected, say so in one line and carry on. Do not claim notes were loaded.
5. Do not repeat the notes back unless the user asks. Act on them.

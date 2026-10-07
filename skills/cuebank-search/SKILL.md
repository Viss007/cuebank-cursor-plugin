---
name: cuebank-search
description: Search the user's saved CueBank notes for earlier rules and decisions. Use when the user asks what was decided, mentions earlier work or "last time", or before a risky or hard-to-undo action.
---

# Search notes

1. Call `continuity_search` with a focused `query` (1–2000 characters). Optional `limit`: 1–10, default 5.
2. For a broad question, run a few narrow searches instead of one wide one.
3. Use what you find, and name the note when it changes what you do.
4. If nothing matches, say there is no saved note on it. Do not guess.
5. For questions about how CueBank itself works, call `authority_find` with the question as `query`.

---
name: cuebank-account
description: Answer questions about the user's CueBank plan, usage, and connection, and report problems to CueBank support. Use when the user asks about billing, usage, access keys, connected agents, or when a CueBank call fails.
---

# Account and support

These tools are on paid CueBank plans. If one is missing, say the answer is on the dashboard at https://cuebank.up.railway.app.

- Plan and billing status: `account_billing`.
- Calls in the last 30 days: `account_usage`.
- Access key status and connected agents: `account_connection`. It never returns the key itself.
- How CueBank works, or steps for account changes: `authority_find` with the question as `query`.
- Something failed or looks wrong: offer `support_report` with what failed, the error, and what the user was doing. Include the user's email only if they agree.

Billing changes happen on the dashboard, not in Cursor.

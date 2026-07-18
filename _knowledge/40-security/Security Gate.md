---
id: security-gate
type: gate
status: active
owner: security-engineer
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [domain-security, gate]
---
# Security Gate

- `pass`: planned checks ran and no blocking risk remains observed.
- `conditional_pass`: tracked non-blocking risks have owner and date.
- `fail`: supported blocking risk violates policy.
- `blocked`: required evidence, tool, revision, access or approval is missing.

Absence of findings is not proof of security. A scanner not installed produces `not_run`, not success.

Related: [[Security Engineer]], [[Release Readiness]], [[Evidence Model]].

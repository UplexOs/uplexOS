---
id: evidence-model
type: standard
status: active
owner: qa-engineer
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [domain-governance, evidence]
---
# Evidence Model

## States

- `observed`: directly verified.
- `inferred`: reasoned from identified evidence.
- `estimated`: approximation with assumptions.
- `not_run`: verification did not execute.
- `blocked`: access, environment or approval prevented execution.
- `failed`: verification executed and did not meet the expected result.

Every check records objective, command or tool, environment, revision, result, exit code, artifact, limitation and residual risk.

Executable store: [[Evidence MCP]]. Consumers: [[QA Engineer]], [[Security Engineer]], [[Deploy]].

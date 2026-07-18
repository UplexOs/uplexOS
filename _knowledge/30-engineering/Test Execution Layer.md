---
id: test-execution-layer
type: capability-map
status: active
owner: qa-engineer
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [testing, execution, neural-core]
---
# Test Execution Layer

The layer turns configured project checks into bounded, reproducible executions.

## Flow

[[Test Discovery]] → [[Test Profiles]] → [[Test Plan]] → [[Test Execution]] → [[Test Evidence]] → [[Quality Gate]]

## Safety boundary

Only scripts present in `package.json` and referenced by an allowlisted profile may run. No arbitrary command input, automatic installation or external-target probing is accepted.

Executable capability: [[Testing MCP]]. Security extension: [[Security Test Execution]].

---
id: test-execution
type: runbook
status: active
owner: qa-engineer
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [testing, execution]
---
# Test Execution

Run one profiled check at a time with bounded timeout and output. Preserve script, command, timestamps, duration, exit code, signal, status and output hash.

A zero exit code proves only the assertions in that script. A non-zero result requires triage into product, test or environment failure.

Tool: `testing.run_script` in [[Testing MCP]]. Local HTTP checks use [[Runtime Smoke Testing]].

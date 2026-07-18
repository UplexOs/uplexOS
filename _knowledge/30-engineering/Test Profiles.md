---
id: test-profiles
type: standard
status: active
owner: qa-engineer
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [testing, profiles]
---
# Test Profiles

Profiles live in `.uplex/testing/profiles/` and reference package scripts by name. Supported kinds: lint, typecheck, unit, integration, contract, build, E2E, accessibility, security and smoke.

Profiles do not embed shell commands. Missing scripts are `not_configured`. Schema: `.uplex/testing/test-profile.schema.json`.

Related: [[Test Plan]], [[Testing MCP]].

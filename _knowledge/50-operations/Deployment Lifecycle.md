---
id: deployment-lifecycle
type: runbook
status: active
owner: deploy
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [domain-operations, deployment]
---
# Deployment Lifecycle

Plan → build immutable artifact → verify → stage or preview → evaluate gates → consume approval → deploy → health and smoke checks → observe bounded logs → complete or rollback.

A deployment is not successful until expected behavior is observed. Provider actions are `not_configured` while the Deploy MCP adapter is disabled.

Related: [[Deploy]], [[Approval MCP]], [[Evidence MCP]], [[Incident and Rollback]].

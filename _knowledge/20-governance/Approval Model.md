---
id: approval-model
type: standard
status: active
owner: product-manager
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [domain-governance, approval]
---
# Approval Model

Approval is specific to action, project, environment, resource and validity window. Silence and prior similar approval do not authorize a new action.

## Required record

Action, impact, project, environment, requester, approver, timestamp, expiry, single-use flag and result.

## Common approval boundaries

Production deploy, remote push, destructive data change, paid API call, external data transfer, secret mutation, active security testing and public publishing.

Execution uses [[Approval MCP]]. Policy context: [[Risk Management]] and [[Data Classification]]. Evidence goes to [[Evidence Model]].

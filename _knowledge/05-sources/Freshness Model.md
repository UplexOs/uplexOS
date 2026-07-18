---
id: freshness-model
type: standard
status: active
owner: memory-keeper
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [sources, freshness]
---
# Freshness Model

States: `fresh`, `review_due`, `stale`, `superseded`, `source_unavailable`, `never_checked`.

A registered URL with no verified retrieval is `never_checked`, not current. Security advisories and provider status need shorter intervals than stable standards.

Machine policy: `.mcp/sources/freshness-policy.json`. Tool: [[Source MCP]].

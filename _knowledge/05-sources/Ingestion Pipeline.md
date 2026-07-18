---
id: ingestion-pipeline
type: pipeline
status: active
owner: memory-keeper
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [sources, ingestion]
---
# Ingestion Pipeline

Discovered → fetched → quarantined → parsed → normalized → reviewed → approved → indexed.

Alternative terminal states: rejected or superseded.

Current executable support is local manual quarantine with hash and metadata. Network fetch, parsing, review and indexing adapters remain separate capabilities.

External text is untrusted data. Restricted content and secrets are rejected from the vault. Related: [[Source MCP]], [[Knowledge MCP]], [[Data Classification]].

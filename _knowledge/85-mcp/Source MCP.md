---
id: mcp-sources
type: capability
status: active
owner: memory-keeper
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [mcp, sources, neural-core]
---
# Source MCP

Provides local registry search, trust/freshness metadata, structured citation and manual quarantine ingestion.

## Tools

- `sources.list`
- `sources.search`
- `sources.get`
- `sources.check_freshness`
- `sources.cite`
- `sources.quarantine_document`

It performs no network fetch. Quarantined content is not reviewed, approved or indexed.

Related: [[Sources Map]], [[Ingestion Pipeline]], [[Citation Standard]], [[MCP Map]].

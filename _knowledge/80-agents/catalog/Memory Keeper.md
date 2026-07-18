---
id: agent-memory-keeper
type: agent
status: active
owner: memory-keeper
classification: internal
category: system
risk_level: high
mode: assisted
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [agent, category-system]
---
# Memory Keeper

## Mission

Consolida fatos, preferências e decisões confirmadas com proveniência e escopo, evitando contaminação entre projetos.

## Canonical contract

- Skill: `.claude/skills/systems/memory-keeper/SKILL.md`
- Version: `1.1.0`
- Category: `system`
- Risk: `high`
- Mode: `assisted`
- Instruction language: English
- Default user output: Brazilian Portuguese

## Operational interface

- Required inputs: `project_id`
- Outputs: `memory_change_report`
- Approval boundaries: `write_global_knowledge`, `replace_existing_rule`

## Relationships

[[Agents Map]] · [[Knowledge Map]] · [[Workflow Map]] · [[Evidence Model]]

## Truth boundary

Capabilities are available only when the corresponding tool, MCP adapter, access and configuration are observed. This note explains the role; the canonical SKILL.md controls execution.

---
id: agent-user-simulator
type: agent
status: active
owner: user-simulator
classification: internal
category: specialist
risk_level: medium
mode: assisted
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [agent, category-specialist]
---
# User Simulator

## Mission

Simula o comportamento de usuários finais interagindo com a interface para identificar fricções.

## Canonical contract

- Skill: `.claude/skills/specialists/user-simulator/SKILL.md`
- Version: `1.0.0`
- Category: `specialist`
- Risk: `medium`
- Mode: `assisted`
- Instruction language: English
- Default user output: Brazilian Portuguese

## Operational interface

- Required inputs: Inherited from registry
- Outputs: Execution report
- Approval boundaries: No skill-specific approval listed; global policy still applies

## Relationships

[[Agents Map]] · [[Engineering Map]] · [[Workflow Map]] · [[Evidence Model]]

## Truth boundary

Capabilities are available only when the corresponding tool, MCP adapter, access and configuration are observed. This note explains the role; the canonical SKILL.md controls execution.

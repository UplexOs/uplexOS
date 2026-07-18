---
id: agent-git-operator
type: agent
status: active
owner: git-operator
classification: internal
category: operations
risk_level: high
mode: assisted
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [agent, category-operations]
---
# Git Operator

## Mission

Prepara commits locais rastreáveis e, após aprovação específica, envia alterações ao repositório remoto.

## Canonical contract

- Skill: `.claude/skills/specialists/git-operator/SKILL.md`
- Version: `1.1.0`
- Category: `operations`
- Risk: `high`
- Mode: `assisted`
- Instruction language: English
- Default user output: Brazilian Portuguese

## Operational interface

- Required inputs: `project_id`, `change_scope`
- Outputs: `commit_report`
- Approval boundaries: `git_push`, `force_push`

## Relationships

[[Agents Map]] · [[Operations Map]] · [[Workflow Map]] · [[Evidence Model]]

## Truth boundary

Capabilities are available only when the corresponding tool, MCP adapter, access and configuration are observed. This note explains the role; the canonical SKILL.md controls execution.

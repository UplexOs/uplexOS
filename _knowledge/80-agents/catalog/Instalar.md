---
id: agent-instalar
type: agent
status: active
owner: instalar
classification: internal
category: operations
risk_level: medium
mode: assisted
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [agent, category-operations]
---
# Instalar

## Mission

Configura a identidade, o negócio e as preferências da própria empresa no UplexOS. Use quando o usuário disser "/instalar", "configurar empresa" ou "instalar UplexOS".

## Canonical contract

- Skill: `.claude/skills/instalar/SKILL.md`
- Version: `1.0.0`
- Category: `operations`
- Risk: `medium`
- Mode: `assisted`
- Instruction language: English
- Default user output: Brazilian Portuguese

## Operational interface

- Required inputs: Inherited from registry
- Outputs: `_knowledge/company/empresa.md`, `_knowledge/company/preferencias.md`
- Approval boundaries: `overwrite_company_profile`

## Relationships

[[Agents Map]] · [[Operations Map]] · [[Workflow Map]] · [[Evidence Model]]

## Truth boundary

Capabilities are available only when the corresponding tool, MCP adapter, access and configuration are observed. This note explains the role; the canonical SKILL.md controls execution.

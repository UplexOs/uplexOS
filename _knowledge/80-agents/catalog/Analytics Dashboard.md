---
id: agent-analytics-dashboard
type: agent
status: active
owner: analytics-dashboard
classification: internal
category: system
risk_level: medium
mode: assisted
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [agent, category-system]
---
# Analytics Dashboard

## Mission

Constrói relatórios e dashboards somente com métricas rastreáveis, distinguindo dados observados de estimativas.

## Canonical contract

- Skill: `.claude/skills/systems/analytics-dashboard/SKILL.md`
- Version: `1.0.0`
- Category: `system`
- Risk: `medium`
- Mode: `assisted`
- Instruction language: English
- Default user output: Brazilian Portuguese

## Operational interface

- Required inputs: `project_id`
- Outputs: `analytics_report`
- Approval boundaries: `enable_tracking`, `write_dashboard_code`

## Relationships

[[Agents Map]] · [[Knowledge Map]] · [[Workflow Map]] · [[Evidence Model]]

## Truth boundary

Capabilities are available only when the corresponding tool, MCP adapter, access and configuration are observed. This note explains the role; the canonical SKILL.md controls execution.

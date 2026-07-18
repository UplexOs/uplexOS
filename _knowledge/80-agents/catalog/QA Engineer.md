---
id: agent-qa-engineer
type: agent
status: active
owner: qa-engineer
classification: internal
category: gate
risk_level: high
mode: assisted
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [agent, category-gate]
---
# QA Engineer

## Mission

Builds a risk-based verification matrix from acceptance criteria, runs configured quality checks and produces reproducible release-gate evidence.

## Canonical contract

- Skill: `.claude/skills/specialists/qa-engineer/SKILL.md`
- Version: `2.0.0`
- Category: `gate`
- Risk: `high`
- Mode: `assisted`
- Instruction language: English
- Default user output: Brazilian Portuguese

## Operational interface

- Required inputs: `project_id`, `task_id`, `revision`
- Outputs: `QA_REPORT.md`, `verification_matrix`, `gate_decision`
- Approval boundaries: `install_dependencies`, `install_test_tool`, `access_preview_environment`, `create_test_data`

## Relationships

[[Agents Map]] · [[Workflow Map]] · [[Workflow Map]] · [[Evidence Model]]

## Truth boundary

Capabilities are available only when the corresponding tool, MCP adapter, access and configuration are observed. This note explains the role; the canonical SKILL.md controls execution.

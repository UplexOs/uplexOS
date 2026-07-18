---
id: agent-security-engineer
type: agent
status: active
owner: security-engineer
classification: internal
category: gate
risk_level: critical
mode: assisted
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [agent, category-gate]
---
# Security Engineer

## Mission

Performs risk-based application security reviews using detected capabilities, normalized findings, stack-specific baselines and reproducible gate evidence.

## Canonical contract

- Skill: `.claude/skills/specialists/security-engineer/SKILL.md`
- Version: `2.0.0`
- Category: `gate`
- Risk: `critical`
- Mode: `assisted`
- Instruction language: English
- Default user output: Brazilian Portuguese

## Operational interface

- Required inputs: `project_id`, `review_scope`, `target_environment`
- Outputs: `SECURITY_REPORT.md`, `findings.json`, `threat_model`, `gate_decision`
- Approval boundaries: `install_security_tool`, `active_security_test`, `external_data_transfer`, `risk_acceptance`, `production_change`

## Relationships

[[Agents Map]] · [[Workflow Map]] · [[Workflow Map]] · [[Evidence Model]]

## Truth boundary

Capabilities are available only when the corresponding tool, MCP adapter, access and configuration are observed. This note explains the role; the canonical SKILL.md controls execution.

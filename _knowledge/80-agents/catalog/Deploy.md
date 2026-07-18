---
id: agent-deploy
type: agent
status: active
owner: deploy
classification: internal
category: gate
risk_level: critical
mode: assisted
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [agent, category-gate]
---
# Deploy

## Mission

Inspects the host and project stack, prepares reproducible local, container or cloud delivery plans, and performs approved deployments with verification and rollback evidence.

## Canonical contract

- Skill: `.claude/skills/specialists/devops-engineer/SKILL.md`
- Version: `2.0.0`
- Category: `gate`
- Risk: `critical`
- Mode: `assisted`
- Instruction language: English
- Default user output: Brazilian Portuguese

## Operational interface

- Required inputs: `project_id`, `target_environment`
- Outputs: `ENVIRONMENT_REPORT.md`, `SETUP_PLAN.md`, `DEPLOYMENT_PLAN.md`, `deployment_evidence`
- Approval boundaries: `install_dependencies`, `install_tool`, `external_service`, `deploy_staging`, `deploy_production`, `change_dns`, `change_infrastructure`, `write_secrets`

## Relationships

[[Agents Map]] · [[Workflow Map]] · [[Workflow Map]] · [[Evidence Model]]

## Truth boundary

Capabilities are available only when the corresponding tool, MCP adapter, access and configuration are observed. This note explains the role; the canonical SKILL.md controls execution.

---
id: incident-rollback
type: runbook
status: active
owner: deploy
classification: confidential
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [domain-operations, incident, rollback]
---
# Incident and Rollback

Define rollback artifact, trigger, decision owner, data compatibility and verification before deployment. On failure, preserve evidence, stop additional change, execute the approved recovery path and verify service and data health.

Rollback may be unsafe after irreversible migrations; use forward recovery when documented. Related: [[Incident Response]], [[Deployment Lifecycle]], [[Evidence Model]].

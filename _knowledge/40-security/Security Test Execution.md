---
id: security-test-execution
type: capability-map
status: active
owner: security-engineer
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [security, testing, execution]
---
# Security Test Execution

Allowlisted modes: Semgrep SAST, Gitleaks secret scan, Trivy filesystem/IaC, OSV dependency scan, Syft SBOM and npm audit.

Execution occurs only when the scanner is installed. Missing tools return `not_installed`; they are not automatically installed. Network-capable scans require approval and applicable policy.

`security.heuristic_review` remains separate and is not a professional scanner. Tool: `security.run_scan` in [[Security MCP]].

---
id: security-toolchain
type: reference
status: active
owner: security-engineer
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [domain-security, tooling]
---
# Security Toolchain

- Semgrep: SAST when installed and configured.
- Gitleaks: secret scanning with contextual validation.
- OSV Scanner or package-manager audit: dependency advisories.
- Trivy: dependencies, image and IaC depending on mode.
- Syft: SBOM generation.
- ZAP: passive or explicitly authorized active DAST.

Detection precedes recommendation. Installation requires approval. Network and database-update behavior must be disclosed. Built-in heuristics from [[Security MCP]] are triage, not SAST.

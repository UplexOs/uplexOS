---
id: security-review-method
type: methodology
status: active
owner: security-engineer
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [domain-security, appsec]
---
# Security Review Method

1. Resolve scope, revision, environment and data classification.
2. Detect stack and available tools through [[Environment MCP]] and [[Security MCP]].
3. Select proportional baselines and checks.
4. Review trust boundaries, authorization and business logic manually.
5. Run configured tools and preserve version, command, exit code and limitations.
6. Normalize and validate findings.
7. Decide the gate through policy, not persona authority.

Related: [[Threat Modeling]], [[Finding Management]], [[Security Gate]].

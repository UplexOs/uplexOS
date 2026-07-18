---
id: testing-strategy
type: practice
status: active
owner: qa-engineer
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [domain-engineering, testing]
---
# Testing Strategy

Map each acceptance criterion to the smallest credible verification method: review, static checks, unit, integration, contract, E2E, accessibility, visual or performance.

Missing tooling is `not_installed` or `not_configured`. Screenshots without a versioned baseline are not visual regression.

Execution flows through [[Test Execution Layer]] and [[Testing MCP]] using declarative profiles. Results become [[Test Evidence]] and feed [[Quality Gate]]. Security-specific execution is handled by [[Security Test Execution]].

See [[QA Engineer]], [[Evidence Model]] and [[Release Readiness]].

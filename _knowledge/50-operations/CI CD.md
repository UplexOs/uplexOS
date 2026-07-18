---
id: ci-cd
type: practice
status: active
owner: deploy
classification: internal
created_at: 2026-03-15
updated_at: 2026-03-15
tags: [domain-operations, ci-cd]
---
# CI/CD

CI reproduces local checks on an immutable revision. Delivery separates build, verification, staging, approval and production. Protect branches, minimize token permissions, pin trusted actions where practical and avoid exposing secrets to untrusted pull requests.

Current UplexOS workflow runs `npm run check`. Provider deployment remains separate. Related: [[Release Readiness]], [[Security Gate]].

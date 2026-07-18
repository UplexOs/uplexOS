# Docker security baseline

- Use a maintained, pinned base image appropriate to the runtime.
- Prefer multi-stage builds and copy only runtime artifacts.
- Run as a non-root user unless a documented requirement prevents it.
- Do not bake secrets into image layers, build arguments or repository files.
- Maintain a restrictive `.dockerignore`.
- Define health checks when the orchestrator can consume them.
- Use read-only filesystems and drop Linux capabilities where supported.
- Do not publish database or administrative ports unnecessarily.
- Pin dependencies and scan the final image, not only the source tree.
- Record image digest, scanner database timestamp and unresolved findings.

# Next.js security baseline

## Applicability

Use for Next.js applications after detecting the actual router, runtime and deployment model.

## Review areas

- Keep secrets in server-only modules; treat every `NEXT_PUBLIC_*` value as public.
- Validate and authorize Server Actions, Route Handlers and API routes independently of the UI.
- Prevent open redirects and validate callback URLs against an allowlist.
- Apply output encoding and avoid unsanitized HTML. Review every `dangerouslySetInnerHTML` use.
- Configure CSP based on actual script and asset requirements; avoid blindly copying permissive policies.
- Set secure cookie attributes according to environment and cross-site requirements.
- Prevent sensitive responses from being cached publicly.
- Validate file uploads by size, type, content signature and authorization.
- Review SSRF risk in server-side fetches and image proxy configuration.
- Disable unnecessary framework disclosure and review production source maps.
- Test tenant and object authorization directly at server boundaries.

## Evidence

Record affected route or component, file and line, exploit preconditions, observed behavior, mitigation and verification status.

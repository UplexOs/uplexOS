# LLM application security baseline

- Treat model input, retrieved documents and tool output as untrusted data.
- Enforce authorization outside the model before every privileged tool action.
- Minimize context and redact secrets and personal data before model calls.
- Separate system instructions from retrieved content and mark provenance.
- Validate structured output against strict schemas.
- Add cost, token, timeout, retry and concurrency limits.
- Prevent arbitrary URL retrieval and SSRF through allowlists and network controls.
- Evaluate prompt injection, data exfiltration, insecure output handling and excessive agency.
- Log model and configuration identifiers without storing sensitive prompts indiscriminately.
- Maintain an evaluation dataset and document known limitations and fallback behavior.

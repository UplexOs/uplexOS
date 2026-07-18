# Baseline compartilhado de segurança

A profundidade da revisão deve ser proporcional ao risco e à superfície alterada.

Verificar quando aplicável:

- validação de entrada e codificação de saída;
- autenticação, autorização e isolamento entre tenants;
- sessão, cookies, tokens e recuperação de conta;
- exposição de secrets e dados pessoais;
- queries, uploads, webhooks e integrações externas;
- dependências e scripts de instalação;
- logging, mensagens de erro e observabilidade;
- abuso, rate limiting, idempotência e disponibilidade;
- prompt injection e vazamento de contexto em funcionalidades de IA.

Cada achado deve conter evidência, localização, cenário plausível, impacto, severidade justificada, mitigação e incertezas. Recomendar bloqueio conforme política e evidência, não com base em autoridade de persona.

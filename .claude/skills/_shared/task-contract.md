# Contrato compartilhado de task

Formato recomendado:

```yaml
id: string
title: string
description: string
status: pending | in_progress | blocked | validation | done | cancelled
priority: low | medium | high | critical
phase: string
owner: string | null
dependencies: []
acceptance_criteria: []
evidence: []
created_at: ISO-8601
updated_at: ISO-8601
```

## Regras

- Critérios de aceite devem ser observáveis.
- `done` exige evidência vinculada aos critérios.
- Dependência não atendida produz `blocked`, não conclusão parcial disfarçada.
- Alterações de status registram motivo e timestamp.
- Não inferir owner, prioridade ou aceite quando não confirmados.

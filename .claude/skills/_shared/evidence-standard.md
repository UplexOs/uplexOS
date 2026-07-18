# Padrão compartilhado de evidências

Toda afirmação relevante deve indicar uma das classificações:

- `observed`: verificada diretamente por leitura, comando ou ferramenta.
- `inferred`: conclusão lógica baseada em evidência identificada.
- `estimated`: aproximação com método e premissas declarados.
- `not_run`: verificação não executada ou ferramenta indisponível.
- `blocked`: verificação impedida por dependência, permissão ou ambiente.
- `failed`: verificação executada e reprovada.

## Registro mínimo

Para cada verificação, registrar quando aplicável:

- objetivo;
- comando, ferramenta ou fonte;
- ambiente e escopo;
- resultado e exit code;
- evidência produzida;
- limitações;
- risco residual.

Ausência de evidência não é evidência de ausência. Não declarar segurança, estabilidade, conformidade, compatibilidade ou sucesso absoluto.

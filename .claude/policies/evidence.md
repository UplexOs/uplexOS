# Política de evidências e gates

Uma conclusão técnica deve apontar evidências reproduzíveis.

## Estados válidos

- `passed`: verificação executada e aprovada;
- `failed`: executada e reprovada;
- `not_run`: não executada;
- `not_applicable`: fora do escopo, com justificativa;
- `blocked`: impedida por dependência ou ambiente;
- `requires_approval`: aguarda autorização.

## Conteúdo mínimo de um relatório

- projeto, task e commit analisado;
- ambiente e timestamp;
- ferramenta e versão;
- comandos ou procedimento;
- resultado por verificação;
- caminhos das evidências;
- limitações e riscos residuais.

Nunca usar “perfeitamente seguro”, “estabilidade garantida” ou equivalentes. Use: “as verificações descritas foram aprovadas no escopo e commit informados”.

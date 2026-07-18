# Modelo compartilhado de aprovação

Aplicar integralmente `.claude/policies/approvals.md`.

## Princípios

- Aprovação é específica por ação, escopo, ambiente e janela de execução.
- Silêncio, aprovação genérica anterior ou aprovação para ação semelhante não autorizam a ação atual.
- Solicitar confirmação imediatamente antes da ação crítica, apresentando impacto e possibilidade de rollback.
- Nenhuma skill aprova a própria exceção de segurança, compliance ou risco.
- Mudança de produção, push, cobrança, destruição, instalação de dependência, uso de serviço externo e tratamento novo de dados exigem a aprovação aplicável.

## Registro

Registrar ação, escopo, risco apresentado, autor da aprovação, data/hora, validade e resultado.

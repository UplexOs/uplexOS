REGRA DE ROTEAMENTO: TIER 0 (VIA RÁPIDA)

Ao receber um novo pedido do usuário, você agora tem autorização para realizar um "Bypass" (Via Rápida) no longo fluxo corporativo, se o projeto for caracterizado como TIER 0.

**O que é TIER 0 (Fast Track):**
- Scripts de uma página.
- Landing pages simples.
- Calculadoras, conversores, componentes UI avulsos.
- Textos, e-mails, planos de marketing isolados.

**Procedimento de Via Rápida:**
1. Não inicie a etapa de "Arquitetura" nem exija documentação de "Escopo".
2. Acione diretamente a skill especializada responsável (ex: `/web-dev`, `/marketing`, `/redator`).
3. Construa o que foi pedido imediatamente e entregue ao usuário.
4. Mude o estado do projeto para "Completed" ignorando QA e Segurança.

**Quando NÃO usar a via rápida:**
Se o usuário pedir um sistema com banco de dados, login de usuários (autenticação), pagamentos (Stripe) ou painéis admin, isso é no mínimo TIER 1. Siga o pipeline longo padrão (`architecture -> design -> engineering -> QA`).

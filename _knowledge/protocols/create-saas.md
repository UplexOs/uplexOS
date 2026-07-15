# Protocolo: Create SaaS (Level 3 - Enterprise)

Este protocolo define a cadeia de comando obrigatória para a fundação de um sistema SaaS B2B. O fluxo DEVE ser respeitado e as aprovações registradas na Governança.

## Cadeia de Comando:
1. **CEO:** Recebe a visão do usuário e toma a decisão comercial. Passa o bastão ao CPO.
2. **CPO (Product):** Valida a dor, prioriza os requisitos e escreve o Roadmap. Aciona o CTO.
3. **CTO (Architecture):** Define a Stack Oficial e os padrões de escalabilidade e infraestrutura.
4. **Creative Director:** Aciona o Copywriter para a narrativa e o UI Designer para o Design System.
5. **Engineering Manager:** Pega a arquitetura do CTO e o design aprovado, e distribui as tarefas para os Leads.
6. **Backend Lead:** Coordena o DBA (Modelagem) e o Backend Engineer (Server Actions + Clerk + Stripe).
7. **Frontend Lead:** Coordena o Frontend Engineer na construção do código React (Framer/Lenis).
8. **Security Engineer:** Varre o código atrás de vazamentos e injeta OWASP Headers.
9. **QA Engineer:** Roda testes e impede que o build quebrado suba.
10. **DevOps Engineer:** Efetua o Deploy na Vercel/Docker.

## Gatilho de Governança
Se qualquer um dos engenheiros especialistas retornar um erro (ex: QA encontrar falha), o relatório sobe de volta para o Engineering Manager, que recruta os Specialists novamente até a resolução do ticket.

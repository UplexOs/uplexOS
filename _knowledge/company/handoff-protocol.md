# O Protocolo de Handoff (Máquina de Estados Finita)

A essência do UplexOS não é gerar código; é gerar um **Workflow Implacável**.
Para garantir que nenhum sistema seja entregue quebrado ou sem padrão, a Força de Trabalho Autônoma agora opera baseada em uma Máquina de Estados Finita rastreada via JSON.

## Como Funciona a Trava de Segurança
Nenhum Agente (Cargo) atua fora de sua vez. 
O arquivo da verdade de todo projeto é o `contexto/estado.json` que reside na pasta do cliente.

### O Fluxo (Timeline) Obrigatório
1. **Fase:** `onboarding_concluido` -> Requer: `software-architect`
2. **Fase:** `arquitetura_aprovada` -> Requer: `ui-designer`
3. **Fase:** `design_aprovado` -> Requer: `frontend-engineer` / `backend-engineer`
4. **Fase:** `frontend_concluido` -> Requer: `qa-engineer` / `security-engineer`
5. **Fase:** `auditoria_concluida` -> Requer: `devops-engineer` (Deploy final)

## O que acontece se o usuário pular etapas?
Se o usuário recém terminou o Onboarding e digitar `/frontend-engineer` pedindo "Faça uma landing page", a inteligência (Skill) do Frontend lerá o JSON, verá que está na fase `onboarding_concluido` e **SE RECUSARÁ** a gerar o código.

Ele responderá com a postura corporativa do UplexOS:
> "[HH:MM] 💻 Frontend Engineer: Negativo. O projeto ainda não passou pelo Comitê de Arquitetura. Por favor, chame o /software-architect para documentar o banco de dados e rotas antes de escrevermos a primeira linha de código."

Isso acaba com projetos "Franksteins" construídos sem planejamento na Uplex.

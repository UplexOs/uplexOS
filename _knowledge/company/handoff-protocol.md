# O Protocolo de Handoff (Máquina de Estados Finita)

A essência do UplexOS não é gerar código; é gerar um **Workflow Implacável**.
Para garantir que nenhum sistema seja entregue quebrado ou sem padrão, a Força de Trabalho Autônoma agora opera baseada em uma Máquina de Estados Finita rastreada via JSON.

## Como Funciona a Trava de Segurança
Nenhum Agente (Cargo) atua fora de sua vez. 
O arquivo da verdade de todo projeto é o `contexto/estado.json` que reside na pasta do cliente.

### O Fluxo (Timeline) Obrigatório
A fonte única da FSM é `.uplex/runtime/workflow.json`:
1. `onboarding` → `architecture` (`software-architect`)
2. `architecture` → `design` (`frontend-design`)
3. `design` → `engineering` (`scrum-master` coordena especialistas)
4. `engineering` → `quality` (`qa-engineer`)
5. `quality` → `security` (`security-engineer`)
6. `security` → `delivery` (`deploy`)
7. `delivery` → `completed` (exige aprovação explícita)

Os nomes antigos são aliases apenas para migração e não devem ser gravados em novos estados.

## O que acontece se o usuário pular etapas?
Se o usuário recém terminou o Onboarding e digitar `/frontend-engineer` pedindo "Faça uma landing page", a inteligência (Skill) do Frontend lerá o JSON, verá que está na fase `architecture` e **SE RECUSARÁ** a gerar o código.

Ele responderá com a postura corporativa do UplexOS:
> "[HH:MM] 💻 Frontend Engineer: Negativo. O projeto ainda não passou pelo Comitê de Arquitetura. Por favor, chame o /software-architect para documentar o banco de dados e rotas antes de escrevermos a primeira linha de código."

Isso acaba com projetos "Franksteins" construídos sem planejamento na Uplex. Use `npm run uplex -- next <projeto>` para consultar o responsável e `run --evidence <arquivo>` para registrar um handoff verificável.

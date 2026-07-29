# UplexOS

## Plataforma de orquestração para desenvolvimento de software com IA

A UplexOS é uma plataforma gratuita em reconstrução para planejar, coordenar, validar e acompanhar a criação de software com assistência de inteligência artificial.

O usuário descreve o que precisa em linguagem natural. A UplexOS interpreta a necessidade, seleciona as capacidades internas adequadas, organiza a ordem do trabalho, registra evidências e acompanha a execução até a conclusão ou até encontrar um bloqueio real.

---

# A proposta

## O usuário informa o objetivo. A UplexOS organiza a execução.

Exemplo de pedido:

> Preciso que você crie uma página frontend com backend no Supabase.

A partir desse pedido, a UplexOS identifica automaticamente a necessidade de:

- planejamento de arquitetura;
- definição do design system;
- modelagem de dados;
- implementação do backend Supabase;
- implementação do frontend;
- autenticação, quando mencionada ou necessária;
- verificação de qualidade;
- revisão de segurança;
- inicialização e verificação da aplicação.

O usuário não precisa escolher manualmente um agente para cada etapa.

---

# O problema que estamos resolvendo

Ferramentas de desenvolvimento com IA frequentemente exigem que o usuário:

- conheça vários comandos;
- selecione manualmente especialistas;
- repita o contexto entre etapas;
- controle a ordem do trabalho;
- lembre quais validações ainda faltam;
- confie em afirmações sem evidência persistente;
- reinicie o processo ao trocar de sessão.

A UplexOS centraliza essas responsabilidades em um único sistema de orquestração.

---

# A experiência desejada

```text
Usuário
  -> descreve a necessidade

UplexOS
  -> interpreta o objetivo
  -> inspeciona o contexto
  -> seleciona capacidades
  -> monta o workflow
  -> distribui o trabalho
  -> valida os resultados
  -> registra evidências
  -> informa o estado real
```

Os comandos continuam disponíveis para operação técnica e automação, mas não devem ser obrigatórios para a experiência cotidiana.

---

# O que já existe

Até o momento, a UplexOS possui:

- runtime local em Node.js;
- CLI multiplataforma;
- projetos isolados por diretório;
- estado persistente;
- tarefas estruturadas;
- timeline append-only;
- execuções identificadas por UUID;
- evidências com hash SHA-256;
- aprovações específicas e de uso único;
- migração de estados legados;
- registry de capacidades;
- registry de unidades internas de execução;
- interpretação inicial de pedidos em linguagem natural;
- geração de planos de execução;
- workflows com dependências;
- execução sequencial e paralela;
- context packs;
- work orders;
- handoffs persistentes;
- propagação de falhas e bloqueios;
- retomada de execuções;
- adaptadores de processos externos;
- dispatch automático de workflows;
- Runtime Manager persistente;
- porta dinâmica e health check local;
- start, status, logs e stop da aplicação;
- servidores MCP governados;
- base de conhecimento local;
- suíte automatizada de validação.

---

# Arquitetura atual

```text
UplexOS
├── Core Runtime
│   ├── projetos
│   ├── estado
│   ├── tarefas
│   ├── execuções
│   ├── eventos
│   ├── evidências
│   └── aprovações
├── Orchestrator
│   ├── interpretação de intenção
│   ├── seleção de capacidades
│   ├── resolução de dependências
│   ├── workflows
│   └── handoffs
├── Agent Runtime
│   ├── context packs
│   ├── work orders
│   ├── dispatch
│   └── resultados estruturados
├── Adapters
│   ├── detecção de ambientes
│   ├── protocolo JSON
│   └── processos externos
├── MCP Layer
│   ├── projetos
│   ├── arquivos
│   ├── testes
│   ├── segurança
│   ├── aprovações
│   ├── evidências
│   ├── conhecimento
│   ├── ambiente
│   └── fontes
└── Knowledge Vault
    ├── empresa
    ├── clientes
    ├── engenharia
    ├── segurança
    └── operações
```

---

# Capacidades iniciais

O novo registry possui nove capacidades canônicas:

| Capacidade | Responsabilidade |
|---|---|
| `architecture.plan` | Planejar a arquitetura |
| `design.system` | Definir o sistema visual |
| `database.model` | Modelar dados e relações |
| `backend.supabase` | Implementar o backend Supabase |
| `auth.implement` | Implementar autenticação e autorização |
| `frontend.implement` | Implementar a interface |
| `quality.verify` | Executar verificações de qualidade |
| `security.review` | Revisar riscos de segurança |
| `runtime.start` | Iniciar e verificar a aplicação |

Esse é o núcleo inicial. O registry foi criado para crescer sem transformar cada nova funcionalidade em um comando que o usuário precise memorizar.

---

# Roteamento por linguagem natural

O roteador atual consegue identificar sinais relacionados a:

- frontend;
- backend;
- páginas e interfaces;
- Supabase;
- banco de dados;
- autenticação;
- cadastro e login;
- necessidade de iniciar a aplicação;
- riscos associados a banco remoto e identidade.

## Exemplo: landing page

Pedido:

> Crie uma landing page para uma clínica.

Plano selecionado:

```text
architecture.plan
  -> design.system
  -> frontend.implement
  -> quality.verify
```

Backend Supabase e revisão completa de segurança não são incluídos sem necessidade.

## Exemplo: frontend com Supabase

Pedido:

> Crie uma página frontend com backend no Supabase.

Plano selecionado:

```text
architecture.plan
  ├── design.system
  │     └── frontend.implement
  └── database.model
        └── backend.supabase

frontend.implement + backend.supabase
  -> quality.verify
  -> security.review
  -> runtime.start
```

---

# Workflows dinâmicos

A UplexOS não depende mais apenas de uma sequência linear fixa.

Cada plano é representado como um grafo contendo:

- etapas;
- dependências;
- riscos;
- resultados esperados;
- fronteiras de aprovação;
- estado de execução.

Estados possíveis de uma etapa:

```text
pending
ready
running
completed
failed
blocked
skipped
```

Uma etapa só se torna `ready` quando todas as dependências obrigatórias estão concluídas.

---

# Paralelismo controlado

Etapas independentes podem ser executadas em paralelo.

No fluxo fullstack, depois da arquitetura:

```text
design.system
database.model
```

podem ser iniciadas no mesmo lote.

O dispatcher permite configurar:

- quantidade máxima de etapas paralelas;
- quantidade máxima de rodadas;
- adaptador responsável pela execução.

As gravações no estado continuam sequenciais para evitar sobrescritas concorrentes.

---

# Context packs

Cada etapa recebe apenas o contexto necessário para sua responsabilidade.

Um context pack contém:

- pedido original;
- identificação do projeto;
- identificação da execução;
- capacidade atual;
- estado do projeto;
- tarefa ativa;
- documento principal do projeto;
- handoffs recebidos;
- momento da geração.

Isso reduz a repetição de contexto e prepara a UplexOS para operar com diferentes ambientes de IA.

---

# Work orders

Quando uma etapa fica disponível, o sistema cria uma ordem de trabalho estruturada.

Ela declara:

- objetivo;
- capacidade;
- saídas esperadas;
- escopos de leitura;
- escopos de escrita;
- aprovações necessárias;
- localização do context pack.

Exemplo simplificado:

```json
{
  "capability_id": "backend.supabase",
  "status": "ready",
  "objective": "Criar uma página com backend no Supabase",
  "expected_outputs": ["backend_changes"],
  "approval_boundaries": ["database.remote_migration"]
}
```

---

# Handoffs persistentes

Quando uma etapa termina, seu resultado é encaminhado às próximas etapas por meio de um handoff estruturado.

O handoff preserva:

- artefatos;
- hashes;
- decisões;
- riscos;
- limitações;
- origem;
- destino;
- execução;
- projeto.

Assim, frontend, backend, qualidade e segurança recebem as decisões anteriores sem depender apenas da conversa atual.

---

# Evidências verificáveis

Uma etapa não pode ser marcada como concluída sem evidência.

As evidências:

- precisam existir dentro do projeto;
- não podem escapar do sandbox por path traversal;
- recebem hash SHA-256;
- recebem tamanho em bytes;
- ficam vinculadas à execução e à etapa;
- são registradas na timeline;
- podem ser propagadas por handoffs.

Isso reduz conclusões baseadas somente em declarações textuais.

---

# Aprovações específicas

A UplexOS possui um mecanismo compartilhado de aprovação usado pelo runtime e pelos servidores MCP.

Uma aprovação é:

- vinculada ao projeto;
- vinculada à ação;
- temporária;
- de uso único;
- registrada com solicitante e decisão;
- consumida pela operação autorizada.

Uma aprovação para uma ação não autoriza automaticamente outra.

---

# Propagação de falhas

Se uma etapa falhar, suas dependentes são bloqueadas.

Exemplo:

```text
architecture.plan = failed

design.system = blocked
```

A execução não é apresentada como concluída quando existe uma falha bloqueante.

O sistema registra o motivo e preserva o estado para diagnóstico ou retomada.

---

# Retomada entre sessões

Execuções são persistidas em arquivos próprios:

```text
_projetos/<projeto>/contexto/executions/<execution-id>.json
```

Também são persistidos:

- context packs;
- work orders;
- handoffs;
- eventos;
- evidências;
- estado das etapas.

Uma execução interrompida pode ser recarregada e retomada sem reiniciar todo o fluxo.

---

# Adaptadores de agentes

O núcleo da UplexOS não está acoplado a um único ambiente de IA.

Foi criado um protocolo de adaptadores baseado em:

```text
entrada: JSON por stdin
saída: JSON por stdout
```

O processo externo recebe:

- work order;
- context pack;
- contrato da resposta.

Ele deve devolver:

- status;
- resumo;
- evidências;
- decisões;
- riscos;
- limitações.

Os processos são iniciados sem interpolação de shell.

---

# Dispatch automático

O comando de continuação processa o workflow sem exigir uma chamada manual para cada etapa:

```bash
uplex continue <projeto> --execution-id <id>
```

Opções:

```bash
--adapter <id>
--max-parallel <quantidade>
--max-rounds <quantidade>
```

O dispatcher continua até encontrar uma condição de parada.

Motivos possíveis:

```text
execution_completed
execution_blocked
execution_failed
adapter_not_configured
stages_already_running
round_limit
```

---

# Comandos técnicos disponíveis

Embora a experiência final seja orientada a linguagem natural, a CLI atual oferece:

```bash
uplex init
uplex status
uplex plan
uplex execute
uplex continue
uplex execution-status
uplex stage-claim
uplex stage-dispatch
uplex stage-complete
uplex stage-fail
uplex approval-request
uplex approval-decide
uplex migrate
uplex adapters
uplex validate
uplex doctor
uplex dashboard
```

Esses comandos são úteis para automação, integração e diagnóstico. O usuário comum não deverá precisar memorizar todos eles.

---

# Camada MCP

A UplexOS possui nove servidores MCP locais ativos:

| Servidor | Função |
|---|---|
| `project` | Resolver projetos e contextos |
| `files` | Ler e escrever dentro do sandbox |
| `approval` | Solicitar, decidir e consumir aprovações |
| `evidence` | Registrar e consultar evidências |
| `knowledge` | Operar a base de conhecimento |
| `environment` | Inspecionar ferramentas e ambiente |
| `security` | Detectar postura e executar scans permitidos |
| `sources` | Gerenciar fontes e proveniência |
| `testing` | Planejar e executar testes permitidos |

O padrão dos MCPs é negar operações sem os scopes necessários.

---

# Segurança operacional

Controles já implementados:

- sandbox de arquivos;
- bloqueio de path traversal;
- scopes default deny;
- escrita atômica;
- comparação por hash;
- aprovações de uso único;
- timeout de processos;
- limite de saída dos adaptadores;
- execução de adaptadores sem shell;
- resposta estruturada obrigatória;
- bloqueio de evidência externa ao projeto;
- separação entre falha, bloqueio e ausência de configuração.

---

# Migração e compatibilidade

A fundação atual inclui:

- migração de estados antigos;
- leitura de aliases de fases legadas;
- onboarding legado encaminhado à CLI Node canônica;
- geração segura de boilerplates;
- remoção de arquivos `.env` no processo de sanitização;
- bloqueio de sobrescrita automática de boilerplates existentes.

O objetivo é manter uma única fonte de verdade para estado, evidências e aprovações.

---

# Validação atual

O quality gate completo é executado por:

```bash
npm run check
```

Na validação mais recente:

```text
40 testes executados
40 testes aprovados
0 falhas
```

Também foram validados:

- 48 skills do sistema atual;
- 9 capacidades do novo registry;
- contexto do core;
- Knowledge Vault;
- 9 servidores MCP;
- schemas;
- sandbox;
- aprovações;
- workflows;
- paralelismo;
- retomada;
- adaptadores;
- dispatch automático.

Existe um aviso legado não bloqueante relacionado ao arquivo `.claude/skills/instalar.md`.

---

# O que funciona hoje

A UplexOS já consegue:

1. criar projetos;
2. receber um pedido textual pela CLI;
3. identificar necessidades iniciais de frontend, backend, Supabase e autenticação;
4. gerar um plano de capacidades;
5. persistir uma execução;
6. montar um grafo de dependências;
7. liberar etapas na ordem correta;
8. liberar etapas independentes em paralelo;
9. gerar context packs e work orders;
10. enviar trabalho a um processo externo compatível;
11. receber resultados estruturados;
12. verificar evidências;
13. produzir handoffs;
14. bloquear dependentes quando ocorre uma falha;
15. pausar por limites operacionais;
16. retomar a execução;
17. concluir automaticamente um workflow com um único comando de continuação.

---

# Limites atuais

## O runtime está pronto, mas o ambiente de IA ainda precisa ser conectado

No ambiente atual, os comandos `kilo`, `claude` e `codex` não foram encontrados no `PATH`.

Por isso:

- o adaptador padrão permanece desabilitado;
- a UplexOS não simula a presença de um agente externo;
- o dispatch real depende de configurar um processo compatível;
- os testes utilizam um adaptador local controlado, sem rede.

## A interpretação natural ainda é inicial

O roteador atual reconhece um conjunto limitado de intenções. Ele ainda precisa evoluir para:

- correção de bugs;
- refatoração;
- deploy;
- mobile;
- pagamentos;
- analytics;
- IA e RAG;
- pesquisa;
- conteúdo e marketing;
- operações avançadas.

## Engines especializados ainda serão ampliados

Ainda precisam ser consolidados:

- Design Engine completo;
- Quality Engine completo;
- Security Engine completo;
- Memory Engine;
- Automation Engine com checkpoints avançados;
- adaptadores nativos por plataforma.

---

# Próximas etapas

## 1. Conectar ambientes reais de IA

- criar adaptadores nativos;
- mapear comandos e formatos suportados;
- detectar capacidades reais de cada ambiente;
- validar respostas e falhas reais.

## 2. Expandir o roteamento natural

- ampliar intenções;
- considerar tecnologias detectadas no projeto;
- incorporar risco, Tier e estado atual;
- fazer perguntas apenas quando uma decisão for bloqueante.

## 3. Consolidar os engines

- engenharia;
- design;
- qualidade;
- segurança;
- memória;
- automação;
- execução local.

## 4. Simplificar a interface

- tornar linguagem natural a entrada principal;
- manter poucos comandos opcionais;
- apresentar progresso sem nomes internos;
- mostrar resultados, evidências e bloqueios de forma simples.

## 5. Validar um caso vertical completo

O principal cenário de validação será:

> Crie uma página frontend com backend no Supabase.

O fluxo deverá terminar com:

- arquitetura;
- design system;
- modelo de dados;
- frontend;
- backend;
- autenticação e RLS quando aplicáveis;
- testes;
- build;
- revisão de segurança;
- aplicação iniciada;
- processo, porta e endpoint verificados;
- relatório final.

---

# A visão da UplexOS

A UplexOS está evoluindo de uma coleção de instruções especializadas para uma plataforma orientada a objetivos.

```text
O usuário informa o que precisa.

A UplexOS decide:
- quais capacidades utilizar;
- em qual ordem trabalhar;
- o que pode ser paralelo;
- quais aprovações são necessárias;
- quais testes devem ser executados;
- quais riscos precisam ser verificados;
- como comprovar o resultado.
```

O resultado esperado é uma experiência em que a complexidade operacional permanece dentro do sistema, enquanto o usuário acompanha apenas o que foi planejado, executado, validado, bloqueado ou concluído.

---

# Antes e depois

## Como a UplexOS estava inicialmente e como está agora

A reconstrução mudou a UplexOS de uma coleção extensa de instruções e cargos especializados para a fundação executável de uma plataforma de orquestração orientada a objetivos.

---

## Visão geral

| Antes | Agora |
|---|---|
| Coleção de skills, comandos, agentes e regras | Plataforma com runtime, orquestrador, workflows e adaptadores |
| Usuário precisava conhecer comandos especializados | Usuário pode descrever a necessidade em linguagem natural |
| Fluxo dependia principalmente de instruções Markdown | Fluxo possui estado, dependências e execução persistente |
| Coordenação entre especialistas era orientada por prompt | Coordenação é representada por work orders e handoffs |
| Máquina de estados linear | Grafo dinâmico com etapas sequenciais e paralelas |
| Evidência validada principalmente pela existência do arquivo | Evidência restrita ao projeto, com hash SHA-256 e tamanho |
| Aprovação genérica por flag | Aprovação específica, temporária e de uso único |
| Execução encerrada dependia do contexto da conversa | Execução pode ser recarregada e retomada do disco |
| Agentes eram a interface pública | Agentes se tornaram unidades internas de execução |
| Não havia dispatch automático de agentes externos | Existe protocolo de adaptadores e continuação automática |

---

## Experiência do usuário

### Antes

O usuário precisava entender a estrutura interna e selecionar manualmente quem deveria trabalhar.

Exemplo:

```text
/software-architect
/ui-designer
/frontend-engineer
/backend-engineer
/qa-engineer
/security-engineer
```

Além de lembrar os comandos, o usuário precisava controlar a ordem correta e decidir quando encaminhar o trabalho ao próximo especialista.

### Agora

O usuário descreve o resultado esperado:

> Crie uma página frontend com backend no Supabase.

A UplexOS transforma o pedido em um plano interno:

```text
architecture.plan
  ├── design.system
  │     └── frontend.implement
  └── database.model
        └── backend.supabase

frontend.implement + backend.supabase
  -> quality.verify
  -> security.review
  -> runtime.start
```

O usuário não precisa escolher manualmente os agentes nem controlar os handoffs.

---

## Interface

### Antes

- dezenas de comandos especializados;
- nomes de cargos expostos;
- dependência de slash commands;
- conhecimento da estrutura interna necessário;
- comandos legados e canônicos coexistindo sem uma interface única.

### Agora

- linguagem natural como direção principal;
- capacidades selecionadas automaticamente;
- agentes mantidos como detalhe interno;
- CLI técnica disponível para automação e diagnóstico;
- um único comando pode continuar todo o workflow:

```bash
uplex continue <projeto> --execution-id <id>
```

---

## Arquitetura

### Antes

```text
Usuário
  -> escolhe um comando
  -> carrega uma skill Markdown
  -> especialista executa uma atividade
  -> usuário escolhe o próximo comando
```

O sistema possuía bons contratos declarativos, mas o runtime não coordenava integralmente a passagem de trabalho entre os especialistas.

### Agora

```text
Usuário
  -> pedido natural
  -> Intent Router
  -> Capability Registry
  -> Workflow Graph
  -> Work Orders
  -> Agent Adapters
  -> Evidências e Handoffs
  -> Quality e Security Gates
  -> Resultado consolidado
```

A arquitetura agora separa:

- intenção;
- planejamento;
- capacidade;
- agente;
- execução;
- evidência;
- aprovação;
- resultado.

---

## Modelo de trabalho

### Antes

O modelo principal era baseado em cargos:

```text
software-architect
frontend-engineer
backend-engineer
qa-engineer
security-engineer
```

O cargo concentrava identidade, conhecimento, comportamento e responsabilidade.

### Agora

O modelo canônico é baseado em capacidades:

```text
architecture.plan
design.system
database.model
backend.supabase
auth.implement
frontend.implement
quality.verify
security.review
runtime.start
```

Cada capacidade declara:

- domínio;
- risco;
- dependências;
- unidade responsável;
- resultados esperados;
- fronteiras de aprovação.

Isso permite ampliar o sistema sem transformar cada funcionalidade em um novo comando público.

---

## Workflow

### Antes

O runtime seguia uma máquina de estados linear:

```text
Onboarding
  -> Arquitetura
  -> Design
  -> Engenharia
  -> Qualidade
  -> Segurança
  -> Entrega
  -> Concluído
```

Todo projeto seguia essencialmente a mesma sequência.

### Agora

O plano é um grafo gerado conforme o pedido.

Exemplo de landing page:

```text
architecture.plan
  -> design.system
  -> frontend.implement
  -> quality.verify
```

Exemplo fullstack:

```text
architecture.plan
  ├── design.system
  └── database.model

design.system
  -> frontend.implement

database.model
  -> backend.supabase

frontend + backend
  -> qualidade
  -> segurança
  -> execução
```

O sistema utiliza apenas as capacidades aplicáveis ao objetivo.

---

## Paralelismo

### Antes

- execução predominantemente sequencial;
- nenhum estado operacional para etapas paralelas;
- coordenação paralela dependia do usuário ou do modelo;
- risco de contexto divergente entre especialistas.

### Agora

- etapas independentes podem ficar `ready` simultaneamente;
- o dispatcher executa lotes paralelos;
- há limite configurável de concorrência;
- resultados são consolidados sequencialmente;
- decisões anteriores chegam pelos handoffs.

Exemplo:

```text
Arquitetura concluída
  ├── Design em execução
  └── Modelo de dados em execução
```

---

## Estado de execução

### Antes

O estado registrava principalmente:

- fase atual;
- responsável;
- status geral;
- gates de qualidade e segurança.

### Agora

Além do estado do projeto, cada pedido cria uma execução própria com:

- UUID;
- pedido original;
- intenção detectada;
- plano;
- etapas;
- dependências;
- etapa atual;
- timestamps;
- estado de conclusão ou bloqueio.

Estados por etapa:

```text
pending
ready
running
completed
failed
blocked
skipped
```

---

## Evidências

### Antes

Para avançar uma fase, o runtime verificava principalmente se o caminho informado existia.

Limitações:

- qualquer arquivo existente poderia ser usado;
- não havia hash obrigatório;
- o vínculo com a etapa era limitado;
- alterações posteriores não eram detectáveis pelo registro original.

### Agora

Cada evidência:

- precisa estar dentro do projeto;
- passa por proteção contra path traversal;
- recebe hash SHA-256;
- recebe tamanho em bytes;
- é vinculada à execução;
- é vinculada à etapa;
- é registrada na timeline;
- é propagada pelos handoffs.

Uma etapa não pode ser concluída sem evidência.

---

## Aprovações

### Antes

A transição protegida usava uma flag genérica:

```bash
--approve
```

Essa confirmação não carregava necessariamente um contrato completo de ação, projeto, validade e consumo.

### Agora

Uma aprovação possui:

- ID próprio;
- projeto;
- ação autorizada;
- resumo do risco;
- solicitante;
- decisão;
- validade;
- consumo único.

Uma aprovação para migração não pode ser reutilizada para deploy ou outro projeto.

---

## Coordenação entre agentes

### Antes

O compartilhamento de contexto dependia principalmente de:

- leitura dos arquivos do projeto;
- instruções das skills;
- memória da sessão;
- encaminhamento descrito em Markdown.

### Agora

O runtime materializa dois contratos.

### Context pack

Entrega somente o contexto necessário:

- pedido;
- estado;
- tarefa ativa;
- documento do projeto;
- handoffs recebidos.

### Work order

Declara o trabalho autorizado:

- objetivo;
- capacidade;
- saídas esperadas;
- escopos de leitura e escrita;
- aprovações necessárias.

---

## Handoffs

### Antes

O runtime registrava eventos de handoff, mas não materializava um pacote completo para cada dependência do workflow.

### Agora

Cada handoff é persistido e contém:

- origem e destino;
- artefatos;
- hashes;
- decisões;
- riscos;
- limitações;
- execução e projeto.

Isso permite que uma etapa posterior saiba não apenas que a anterior terminou, mas exatamente o que ela produziu e decidiu.

---

## Falhas e bloqueios

### Antes

O fluxo principal aceitava somente resultados capazes de avançar a fase, enquanto o tratamento operacional de falhas dependia mais das instruções das skills.

### Agora

Falhas fazem parte do grafo operacional:

```text
etapa = failed
  -> dependentes = blocked
  -> execução = blocked
```

O sistema não apresenta conclusão quando há dependências impedidas.

---

## Retomada

### Antes

Era possível consultar o estado do projeto, mas não existia uma execução detalhada contendo o andamento individual de cada capacidade do pedido atual.

### Agora

São persistidos:

- arquivo da execução;
- context packs;
- work orders;
- handoffs;
- eventos;
- evidências;
- estados individuais das etapas.

O dispatcher pode parar por limite de rodadas e continuar depois sem repetir as etapas concluídas.

---

## Integração com ambientes de IA

### Antes

A estrutura era fortemente orientada ao carregamento de skills e comandos pelo ambiente hospedeiro.

### Agora

O núcleo define um protocolo independente:

```text
stdin  <- work order + context pack em JSON
stdout -> resultado estruturado em JSON
```

Um adaptador compatível pode executar o trabalho sem modificar o Core Runtime.

O processo é iniciado:

- sem shell;
- com timeout;
- com limite de saída;
- dentro do diretório do projeto;
- com contrato obrigatório de resposta.

---

## Honestidade operacional

### Antes

Parte das capacidades descritas no produto dependia de instruções ou integrações que não estavam ativas no runtime.

### Agora

O sistema distingue explicitamente:

```text
available
not_installed
not_configured
completed
failed
blocked
invalid_output
timeout
```

No ambiente atual, `kilo`, `claude` e `codex` não foram encontrados no `PATH`. A UplexOS registra essa ausência e não simula agentes disponíveis.

---

## Automação

### Antes

O usuário precisava acionar manualmente as etapas ou depender do comportamento conversacional do modelo.

### Agora

Um único comando pode processar o grafo:

```bash
uplex continue <projeto> --execution-id <id>
```

O dispatcher:

1. inicia a execução;
2. encontra etapas disponíveis;
3. respeita o limite de paralelismo;
4. envia work orders aos adaptadores;
5. recebe resultados;
6. verifica evidências;
7. produz handoffs;
8. libera dependências;
9. continua até uma condição de parada.

---

## Testes e maturidade

### Antes da reconstrução

```text
20 testes executados
20 testes aprovados
```

Os testes cobriam principalmente:

- runtime inicial;
- validação de estado;
- path traversal em IDs;
- servidores MCP;
- sandbox;
- ambiente;
- testes locais.

### Agora

```text
40 testes executados
40 testes aprovados
0 falhas
```

A cobertura funcional agora também inclui:

- migração de estado legado;
- evidências com hash;
- aprovações de uso único;
- roteamento natural;
- registry de capacidades;
- dependências;
- ciclos;
- context packs;
- work orders;
- handoffs;
- paralelismo;
- propagação de falhas;
- retomada;
- protocolo de adaptadores;
- dispatch automático;
- limites de rodadas;
- pausa segura quando não há adaptador.

---

## Comparativo técnico consolidado

| Área | Antes | Agora |
|---|---|---|
| Entrada | Comandos e skills | Pedido natural e CLI técnica |
| Seleção | Manual | Automática por intenção |
| Organização | Cargos | Capacidades |
| Workflow | FSM linear | Grafo dinâmico |
| Dependências | Implícitas | Declaradas e verificadas |
| Paralelismo | Não operacionalizado | Lotes paralelos controlados |
| Estado | Estado geral do projeto | Projeto + execução + etapas |
| Contexto | Leitura e prompt | Context packs persistentes |
| Delegação | Instrução textual | Work orders estruturadas |
| Handoff | Evento genérico | Pacote persistente por destino |
| Evidência | Existência do caminho | Sandbox + hash + execução + etapa |
| Aprovação | Flag genérica | Específica, temporária e consumível |
| Falhas | Tratamento parcial | Propagação automática de bloqueios |
| Retomada | Fase geral | Workflow detalhado retomável |
| Agentes externos | Dependência do ambiente | Protocolo desacoplado por adaptadores |
| Automação | Acionamento manual | Dispatcher por um comando |
| Testes | 20 | 40 |

---

## A transformação em uma frase

### Antes

> A UplexOS descrevia como uma equipe de agentes deveria trabalhar.

### Agora

> A UplexOS possui uma fundação executável que planeja, distribui, acompanha, valida e retoma o trabalho dessa equipe.

---

# Estado do projeto

## Fundação implementada e validada

A UplexOS já possui os componentes fundamentais para:

- compreender pedidos iniciais;
- organizar workflows;
- coordenar unidades especializadas;
- preservar contexto;
- exigir evidências;
- controlar aprovações;
- executar etapas por adaptadores;
- operar com paralelismo;
- interromper com segurança;
- retomar o trabalho;
- manter uma trilha auditável.

O próximo marco é conectar essa infraestrutura a ambientes reais de IA e aprofundar as capacidades de produto, qualidade, segurança e memória.

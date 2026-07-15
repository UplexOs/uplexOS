---
name: nova-task
description: >
  Cria uma nova task no backlog do projeto. Pergunta título, descrição, prioridade e fase.
  Use quando o usuário disser "nova task", "criar task", "/nova-task".
---

# /nova-task — Criar Task

Cria uma nova task no backlog do projeto.

## Fluxo

### 1. Pedir informações

**"Qual o título da task?"**

### 2. Perguntar detalhes

**"Descreva a task em mais detalhes (opcional):"**

### 3. Perguntar prioridade

**"Qual a prioridade?"**
- 🔴 Alta — essencial pro MVP
- 🟡 Média — importante mas não bloqueia
- 🟢 Baixa — pode esperar

### 4. Perguntar fase

**"Para qual fase?"**
- MVP — funcionalidades essenciais
- Expansão — funcionalidades da segunda fase
- Polish — ajustes e melhorias

---

## Criar task

### Atualizar estado/tasks.json

Gerar ID automaticamente (TASK-001, TASK-002, etc) com:
- título
- descrição
- prioridade
- fase
- status: "backlog"
- criada_em: [data atual]

### Atualizar backlog.md

Adicionar nova task na tabela.

---

## Output

```
╔══════════════════════════════════════════════════════╗
║              TASK CRIADA                         ║
╚══════════════════════════════════════════════════════╝

TASK-006 — [Título]

Prioridade: 🔴 Alta
Fase: MVP
Status: 📋 Backlog

═══════════════════════════════════════════════════════
PRÓXIMAS AÇÕES
═══════════════════════════════════════════════════════

/codar TASK-006    → Desenvolver agora
/backlog           → Ver todas as tasks
/proximatask       → Continuar trabalho
```

---

## Regras

- Gerar ID automaticamente
- Adicionar data de criação
- Manter tasks.json e backlog.md sincronizados

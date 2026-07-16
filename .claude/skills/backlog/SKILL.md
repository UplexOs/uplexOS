---
name: backlog
description: >
  Lista todas as tasks do projeto — pendentes, em progresso e validadas.
  Use quando o usuário disser "backlog", "tarefas", "/backlog".
---

# /backlog — Lista de Tasks

Mostra todas as tasks do projeto.

## Fluxo

### 1. Resolver projeto e ler tasks

Determine o projeto ativo sem ambiguidade e leia `_projetos/<projeto>/contexto/tasks.json`. Para compatibilidade temporária, o arquivo raiz `contexto/tasks.json` pode ser lido apenas quando o projeto declarado nele corresponder ao projeto solicitado. Valide o formato com `.claude/schemas/tasks.schema.json`; se estiver no formato legado, informe a limitação sem reescrever em uma operação de leitura.

### 2. Gerar output

```
╔══════════════════════════════════════════════════════╗
║                      BACKLOG                     ║
╚══════════════════════════════════════════════════════╝

TOTAL: [N] tasks | ✅ [N] validadas | 🔄 [N] em progresso | 📋 [N] backlog

═══════════════════════════════════════════════════════
✅ JÁ VALIDADAS ([N])
═══════════════════════════════════════════════════════

✅ T001 │ [Título]                    │ Fase │ Data
✅ T002 │ [Título]                    │ Fase │ Data

═══════════════════════════════════════════════════════
🔄 EM PROGRESSO ([N])
═══════════════════════════════════════════════════════

🔄 T004 │ [Título]                    │ Fase │ Desde [data]
        │ Progresso: [percentual]%                    │
        │ /validar T004  → Validar                    │

═══════════════════════════════════════════════════════
📋 BACKLOG — [Fase] ([N])
═══════════════════════════════════════════════════════

📋 T005 │ [Título]        │ 🔴 Alta   │
📋 T006 │ [Título]        │ 🔴 Alta   │
📋 T007 │ [Título]        │ 🟡 Média  │
```

### 3. Opções de filtro

Se usuário quiser filtrar:
> "Quer filtrar por algo?"
- Por fase (MVP, Expansão, Polish)
- Por prioridade (Alta, Média, Baixa)
- Por status (backlog, em_progresso, validada)

---

## Regras

- Agrupar por status: validadas, em progresso, backlog
- Dentro do backlog, separar por fase
- Mostrar prioridade textualmente; ícones são opcionais e não podem ser a única indicação.
- Destacar task em progresso.
- Não inventar percentual, fase, data ou evidência ausente.
- Uma task só é `validated` quando seus critérios de aceite apontam evidências verificáveis.
- Oferecer ações rápidas sem modificar o backlog durante a consulta.

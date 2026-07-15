---
name: backlog
description: >
  Lista todas as tasks do projeto — pendentes, em progresso e validadas.
  Use quando o usuário disser "backlog", "tarefas", "/backlog".
---

# /backlog — Lista de Tasks

Mostra todas as tasks do projeto.

## Fluxo

### 1. Ler tasks.json

Ler `estado/tasks.json` para obter lista completa de tasks.

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
- Mostrar prioridade com cores (🔴🟡🟢)
- Destacar task em progresso
- Oferecer ações rápidas

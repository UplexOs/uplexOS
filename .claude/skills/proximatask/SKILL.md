---
name: proximatask
description: >
  Review da task anterior + apresenta próxima task do backlog. Mostra resumo do que foi feito,
  pergunta se está satisfeito, e oferece continuar para próxima task.
  Use quando o usuário disser "próxima", "continuar", "/proximatask".
---

# /proximatask — Próxima Task

Review da última task validada e preparação para próxima.

## Fluxo

### 1. Verificar última task validada

Ler `estado/tasks.json` para encontrar última task validada.

### 2. Mostrar resumo da última task

Apresentar:
- ID e título da task
- Arquivos criados
- Resultado da validação
- Resumo do que foi feito

### 3. Perguntar satisfação

> "Você está satisfeito com o resultado? Quer ajustar algo ou podemos continuar?"

### 4. Se usuário quiser ajustar

Aceitar instruções e:
1. Fazer ajustes
2. Executar `/validar` novamente
3. Voltar ao passo 3

### 5. Buscar próxima task

Ler `estado/tasks.json` e filtrar tasks em backlog, ordenadas por:
1. Prioridade (Alta > Média > Baixa)
2. Fase (MVP > Expansão > Polish)

### 6. Mostrar próxima task

Apresentar:
- ID, título, prioridade
- Descrição
- Dependências
- Arquivos esperados

### 7. Perguntar ação

Opções:
- `/codar [id]` — Iniciar próxima task
- `/codar [id]` — Escolher outra task
- `/backlog` — Ver todas as tasks
- `/status` — Ver progresso geral
- `/marketing` — Ir para módulo de marketing

### 8. Se não houver mais tasks

> "🎉 Todas as tasks do MVP foram validadas!"
> Oferecer: `/planejar`, `/marketing`, `/deploy`, `/novo-projeto`

---

## Regras

- Sempre mostrar resumo da task anterior
- Perguntar satisfação antes de continuar
- Oferecer opções claras
- Atualizar `estado/historico.json` com cada review

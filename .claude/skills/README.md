# Skills do UplexOS

Conjunto de skills que formam o sistema operacional de projetos.

## Estrutura

Cada skill é um arquivo `SKILL.md` dentro de sua própria pasta:

```
.claude/skills/
├── instalar/SKILL.md          ← /instalar
├── novo-projeto/SKILL.md      ← /novo-projeto
├── continuar/SKILL.md         ← /continuar
├── planejar/SKILL.md          ← /planejar
├── codar/SKILL.md             ← /codar [id]
├── validar/SKILL.md           ← /validar [id]
├── proximatask/SKILL.md       ← /proximatask
├── status/SKILL.md            ← /status
├── backlog/SKILL.md           ← /backlog
├── nova-task/SKILL.md         ← /nova-task
├── apresentacao/SKILL.md      ← /apresentacao
├── marketing/SKILL.md         ← /marketing
└── salvar/SKILL.md            ← /salvar
```

## Comandos Principais

| Skill | Comando | Descrição |
|-------|---------|-----------|
| [instalar](instalar/SKILL.md) | `/instalar` | Setup inicial do sistema |
| [novo-projeto](novo-projeto/SKILL.md) | `/novo-projeto` | Interview CRM completo |
| [continuar](continuar/SKILL.md) | `/continuar` | Retomar projeto existente |
| [planejar](planejar/SKILL.md) | `/planejar` | Gerar documentação completa |
| [codar](codar/SKILL.md) | `/codar [id]` | Gerar código da task |
| [validar](validar/SKILL.md) | `/validar [id]` | Validar código |
| [proximatask](proximatask/SKILL.md) | `/proximatask` | Próxima task + review |
| [status](status/SKILL.md) | `/status` | Ver progresso |
| [backlog](backlog/SKILL.md) | `/backlog` | Listar todas as tasks |
| [nova-task](nova-task/SKILL.md) | `/nova-task` | Criar nova task |
| [apresentacao](apresentacao/SKILL.md) | `/apresentacao` | Apresentação para cliente |
| [marketing](marketing/SKILL.md) | `/marketing` | Módulo de marketing |
| [salvar](salvar/SKILL.md) | `/salvar` | Commit + push |

## Como usar

Cada skill é um arquivo Markdown com a documentação completa. O sistema carrega a skill correspondente quando o usuário digita o comando.

## Adicionar nova skill

1. Criar pasta: `.claude/skills/[nome]/`
2. Criar arquivo `SKILL.md` com o conteúdo
3. Seguir o formato abaixo

## Formato de uma skill

```markdown
---
name: nome-da-skill
description: >
  Descrição em uma linha. Use quando o usuário disser "comando", "/comando".
---

# /comando — Título

Corpo da skill com:
- Fluxo completo
- Exemplos
- Regras
```

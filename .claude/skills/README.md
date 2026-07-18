# Skills do UplexOS

Conjunto de skills que formam o sistema operacional de projetos.

> A fonte canônica é `.claude/skills/registry.json`. Arquivos Markdown legados são apenas material de migração e não devem ser roteados como skills ativas.

## Estrutura

Cada skill é um arquivo `SKILL.md` dentro de sua própria pasta:

```
.claude/skills/
├── uplex-help/SKILL.md        ← /uplex-help (somente leitura)
├── uplex-start/SKILL.md       ← /uplex-start (modo guiado)
├── uplex-status/SKILL.md      ← /uplex-status (somente leitura)
├── instalar/SKILL.md          ← /instalar
├── proximatask/SKILL.md       ← /proximatask
├── backlog/SKILL.md           ← /backlog
├── nova-task/SKILL.md         ← /nova-task
├── apresentacao/SKILL.md      ← /apresentacao
├── marketing/SKILL.md         ← /marketing
├── specialists/               ← engenharia, QA, segurança e operações
├── directors/                 ← direção criativa e de engenharia
└── systems/                   ← memória, analytics e internacionalização
```

## Comandos Principais

| Skill | Comando | Descrição |
|-------|---------|-----------|
| [uplex-help](uplex-help/SKILL.md) | `/uplex-help` | Explica o sistema e recomenda o próximo passo sem alterações |
| [uplex-start](uplex-start/SKILL.md) | `/uplex-start` | Início guiado com aprovação humana |
| [uplex-status](uplex-status/SKILL.md) | `/uplex-status` | Estado verificável do projeto sem alterações |
| [instalar](instalar/SKILL.md) | `/instalar` | Configuração inicial da empresa |
| [proximatask](proximatask/SKILL.md) | `/proximatask` | Próxima task e revisão |
| [backlog](backlog/SKILL.md) | `/backlog` | Listar tasks |
| [nova-task](nova-task/SKILL.md) | `/nova-task` | Criar uma task |
| [apresentacao](apresentacao/SKILL.md) | `/apresentacao` | Preparar apresentação |
| [marketing](marketing/SKILL.md) | `/marketing` | Módulo de marketing |

Para criar um cliente/projeto, use o script `./.uplex/ops/onboarding.sh`. Não há uma skill `/onboarding` na raiz neste momento; existe também uma skill especializada em `specialists/onboarding/`.

## Como usar

Cada skill é um arquivo Markdown com instruções para o Claude Code. Use `/uplex-help` para descobrir o próximo passo ou `/uplex-start` para seguir o modo guiado. Antes de aceitar mudanças, revise os arquivos propostos e o diff do Git.

### Contratos compartilhados

Todas as 48 skills registradas herdam de `registry.json`:

- `_shared/execution-protocol.md`;
- `_shared/evidence-standard.md`;
- `_shared/approval-model.md`;
- `_shared/handoff-contract.md`;
- regras da respectiva categoria;
- override específico da skill, quando definido.

Contratos condicionais são carregados para serviços externos, segurança, gestão de tasks e geração de mídia. Políticas globais e contratos compartilhados prevalecem sobre instruções conflitantes em qualquer `SKILL.md`. Isso permite progressive disclosure: o corpo da skill mantém conhecimento de domínio, enquanto governança comum permanece centralizada e obrigatória.

## Adicionar nova skill

1. Criar pasta: `.claude/skills/[nome]/`
2. Criar arquivo `SKILL.md` com o conteúdo
3. Seguir o formato abaixo

## Contrato obrigatório de uma skill

O frontmatter segue `.claude/skills/schema/skill.schema.json`:

```markdown
---
name: nome-da-skill
version: 1.0.0
description: Descrição objetiva e gatilhos de uso.
risk_level: medium
mode: assisted
read_scope: [project.context, project.code]
write_scope: [project.reports]
required_inputs: [project_id]
outputs: [report.md]
external_actions: []
requires_approval: []
aliases: []
status: active
---
```

O corpo deve conter: objetivo e limites; quando usar e não usar; preflight; plano; permissões; procedimento; evidências; critérios de conclusão e bloqueio; rollback; handoff; exemplos e testes.

Toda execução segue `resolve → preflight → plan → approve → execute → verify → record → handoff/recover`. Consulte as políticas em `.claude/policies/` e os contratos em `.claude/skills/_shared/`. Nenhuma persona, promessa ou regra local pode ampliar permissões, autoaprovar exceções ou substituir evidência observável.

## Compatibilidade e migração

Skills antigas continuam legíveis durante a migração, mas novas skills devem usar o contrato completo. Execute `node .uplex/ops/validate-skills.mjs` para detectar frontmatter ausente, nomes duplicados, caminhos inválidos e itens legados.

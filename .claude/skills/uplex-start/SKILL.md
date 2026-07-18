---
name: uplex-start
description: >
  Assistente guiado para iniciar ou retomar um projeto com aprovação humana.
  Use quando o usuário disser "/uplex-start", "começar projeto" ou "modo guiado".
---

# /uplex-start — Início guiado

## Objetivo

Conduzir um usuário iniciante até a próxima ação segura. O modo padrão é assistido: analisar, propor e pedir aprovação antes de modificar arquivos ou executar comandos.

## Etapa 1 — Diagnóstico somente leitura

1. Confirme que a sessão está na raiz do UplexOS.
2. Verifique Git, Claude Code, o ambiente e projetos existentes sem instalar nada.
3. Pergunte se o usuário quer:
   - configurar a própria empresa;
   - criar um projeto;
   - retomar um projeto;
   - apenas entender o sistema.

## Etapa 2 — Perguntas mínimas

Para projeto novo, pergunte:

1. Nome e objetivo do projeto.
2. Projeto novo ou código existente.
3. Tipo de aplicação e público.
4. Autenticação, pagamentos e dados pessoais.
5. Integrações e ambiente de deploy.
6. Tier desejado: MVP, Startup ou Enterprise.
7. Nível de autonomia:
   - Consultivo: apenas recomenda.
   - Assistido: propõe e pede aprovação; padrão.
   - Automático: executa somente ações de baixo risco previamente autorizadas.

## Etapa 3 — Plano

Apresente antes da execução:

- etapas propostas;
- skills envolvidas;
- arquivos que serão criados ou alterados;
- serviços externos e possíveis custos;
- riscos, dados pessoais e aprovações necessárias.

Peça confirmação explícita.

## Etapa 4 — Encaminhamento

- Empresa não configurada: recomendar `/instalar`.
- Projeto novo: recomendar `./.uplex/ops/onboarding.sh` e explicar que é um script shell.
- Projeto existente: recomendar `/uplex-status` antes de continuar.
- Após onboarding: revisar escopo e recomendar `/software-architect`.

## Guardrails

- Nunca inserir secrets em arquivos ou prompts.
- Nunca habilitar analytics sem consentimento e aprovação.
- Nunca fazer deploy, migração, exclusão, cobrança ou mudança em produção sem confirmação específica.
- Nunca alegar garantia de segurança, conformidade ou validade jurídica.
- Antes de mudanças, recomendar commit/backup; depois, recomendar revisão de `git status` e `git diff`.

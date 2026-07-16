---
name: uplex-help
description: >
  Ajuda segura e somente leitura do UplexOS. Use quando o usuário disser
  "/uplex-help", "ajuda", "o que faço agora" ou perguntar sobre uma skill.
---

# /uplex-help — Ajuda e descoberta

## Objetivo

Explicar o UplexOS e recomendar o próximo passo sem alterar arquivos, instalar pacotes ou executar ações destrutivas.

## Procedimento

1. Leia `README.md` e `.claude/skills/README.md`.
2. Localize projetos em `_projetos/` e ignore `_template`.
3. Se houver um único projeto, leia `projeto.md`, `plano.md` e `contexto/estado.json` quando existirem.
4. Se houver vários projetos e nenhum estiver claramente ativo, pergunte qual deve ser analisado.
5. Informe:
   - projeto e fase identificados;
   - arquivos de contexto encontrados ou ausentes;
   - próxima skill recomendada e motivo;
   - pré-requisitos pendentes;
   - quais arquivos a próxima ação poderá modificar;
   - alternativas seguras.

## Formato de saída

```text
Projeto: <nome ou não selecionado>
Fase: <fase ou desconhecida>
Próximo passo recomendado: /<skill>
Motivo: <uma frase>
Antes de continuar:
- <pendência>
Esta ajuda não alterou arquivos.
```

## Regras

- Operar somente em leitura.
- Não inventar estado, conclusão, testes ou aprovação.
- Distinguir comando de skill (`/nome`) de script shell (`./caminho/script.sh`).
- Se o estado estiver inconsistente, explicar a inconsistência e pedir confirmação antes de qualquer correção.
- Recomendar `git status` e `git diff` antes de etapas que alterem código.

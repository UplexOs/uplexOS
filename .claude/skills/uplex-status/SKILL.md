---
name: uplex-status
description: >
  Exibe o estado e o progresso verificável de um projeto UplexOS sem modificar arquivos.
  Use com "/uplex-status", "status do projeto" ou "em que etapa estamos".
---

# /uplex-status — Estado do projeto

## Objetivo

Produzir um resumo somente leitura baseado nos artefatos existentes, sem presumir que uma etapa foi concluída.

## Procedimento

1. Liste `_projetos/`, ignorando `_template`.
2. Determine o projeto solicitado. Se houver ambiguidade, peça ao usuário para escolher.
3. Leia, quando existirem:
   - `_projetos/<projeto>/projeto.md`;
   - `_projetos/<projeto>/plano.md`;
   - `_projetos/<projeto>/contexto/estado.json`;
   - `_projetos/<projeto>/contexto/tasks.json`;
   - `_projetos/<projeto>/contexto/historico.json`.
4. Valide se os arquivos concordam entre si.
5. Mostre fatos verificáveis, pendências, bloqueios e próxima etapa sugerida.

## Formato de saída

```text
Projeto: <nome>
Tier: <tier ou não definido>
Fase declarada: <fase>
Status: <status>
Progresso: <validado ou indisponível>
Concluído: <evidências>
Em andamento: <evidências>
Bloqueios: <itens>
Próxima etapa sugerida: /<skill>
```

## Regras

- Não alterar o estado.
- Não declarar deploy, segurança, teste ou aprovação sem artefato correspondente.
- Se JSON estiver inválido, informar o caminho e o erro; não reescrever automaticamente.
- Percentuais devem vir dos dados ou ser marcados como estimativa explícita.

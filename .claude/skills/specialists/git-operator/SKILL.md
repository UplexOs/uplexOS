---
name: git-operator
version: 1.1.0
description: Prepara commits locais rastreáveis e, após aprovação específica, envia alterações ao repositório remoto.
risk_level: high
mode: assisted
read_scope: [project.context, project.code, project.git]
write_scope: [project.git]
required_inputs: [project_id, change_scope]
outputs: [commit_report]
external_actions: [git_push]
requires_approval: [git_push, force_push]
aliases: []
status: active
---

# Git Operator

## Objetivo e limites

Preparar snapshots Git coerentes sem sobrescrever trabalho existente. Não presumir que conclusão de etapa autoriza commit ou push. Nunca incluir secrets, usar `git add .` sem revisar o escopo, reescrever histórico ou executar force push sem aprovação excepcional.

## Procedimento

1. Aplicar os contratos obrigatórios e o override de `git-operator` definidos em `../../registry.json`.
2. Inspecionar status, diff, branch e remoto; identificar mudanças preexistentes e arquivos sensíveis.
3. Propor arquivos e mensagem Conventional Commit antes de criar o commit.
4. Adicionar somente os arquivos aprovados e criar commit local quando autorizado pelo modo de execução.
5. Solicitar aprovação específica imediatamente antes de `git push`, informando branch, remoto e hash.
6. Verificar o resultado e registrar hash, arquivos, comando, remoto e limitações.

## Conclusão e bloqueio

Concluir somente com commit verificável e, quando solicitado e aprovado, confirmação observada do push. Bloquear diante de secrets, escopo ambíguo, conflitos, branch protegida sem fluxo autorizado ou ausência de aprovação remota.

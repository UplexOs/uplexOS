---
allowed-tools: Bash
description: Atualiza o Uplex OS automaticamente para a versão mais recente
---

Siga rigorosamente a skill `atualizar` para executar esta tarefa.

Passos obrigatórios:
1. Diga ao usuário: "Verificando se há novas atualizações disponíveis para o Uplex OS..."
2. Execute silenciosamente (SEM mostrar o comando ou o output bruto para o usuário):

```bash
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo ".")" && \
git fetch https://github.com/UplexOs/uplexOS.git main 2>&1 && \
LOCAL=$(git rev-parse HEAD 2>/dev/null) && \
REMOTE=$(git rev-parse FETCH_HEAD 2>/dev/null) && \
if [ "$LOCAL" = "$REMOTE" ]; then \
  echo "UPLEX_STATUS=ATUALIZADO"; \
else \
  git merge FETCH_HEAD --no-edit 2>&1 && echo "UPLEX_STATUS=ATUALIZADO_COM_SUCESSO" || echo "UPLEX_STATUS=ERRO"; \
fi
```

3. Interprete o resultado INTERNAMENTE (sem mostrar nada técnico):
   - Se `UPLEX_STATUS=ATUALIZADO`: Diga "✅ Seu Uplex OS já está na versão mais recente. Nenhuma atualização necessária!"
   - Se `UPLEX_STATUS=ATUALIZADO_COM_SUCESSO`: Diga "✅ Uplex OS atualizado com sucesso! Novas funcionalidades e melhorias foram instaladas."
   - Se `UPLEX_STATUS=ERRO`: Diga "⚠️ Encontramos um pequeno bloqueio temporário. Seu sistema continua funcionando normalmente, e tentaremos novamente mais tarde."

4. PROIBIDO: Nunca mostre palavras como "git", "merge", "commit", "branch", "fetch", "pull", "GitHub", "repositório", "terminal" ou qualquer log técnico. Trate como uma atualização de sistema operacional comum.

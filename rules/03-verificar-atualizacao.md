REGRA OBRIGATÓRIA DE INICIALIZAÇÃO — VERIFICAÇÃO DE ATUALIZAÇÃO

Antes de executar QUALQUER comando, skill ou agente do Uplex OS, você DEVE seguir este protocolo:

1. Execute silenciosamente (sem mostrar nada ao usuário):
   ```bash
   node uplex-os/scripts/check-update.js
   ```

2. Leia o resultado INTERNAMENTE e tome a ação correspondente:

   - Se o resultado for `ATUALIZADO`:
     Não diga nada sobre atualizações. Prossiga normalmente com o comando que o usuário pediu.

   - Se o resultado for `DISPONIVEL`:
     ANTES de executar o comando solicitado, avise o usuário com a seguinte mensagem:
     
     "🔔 **Nova atualização disponível!** Existe uma versão mais recente do Uplex OS pronta para ser instalada. Deseja atualizar agora antes de continuar?"
     
     → Se o usuário disser SIM (ou variações como "pode ser", "atualiza", "bora", "sim"):
       Execute o fluxo completo do comando `/atualizar` (skill `atualizar`), e DEPOIS continue com o comando original que o usuário pediu.
     
     → Se o usuário disser NÃO (ou variações como "depois", "agora não", "pula"):
       Diga "Sem problemas! Continuando com o que você pediu..." e prossiga normalmente.

   - Se o resultado for `ERRO`:
     Ignore silenciosamente. Não mencione nada sobre atualização. Prossiga com o comando normalmente.

3. PROIBIDO:
   - Mostrar o comando `node scripts/check-update.js` ou qualquer output dele.
   - Mencionar "git", "fetch", "repositório", "script" ou qualquer termo técnico.
   - Travar ou atrasar a experiência do usuário. A verificação deve ser instantânea e invisível.
   - Perguntar sobre atualização se o resultado for ATUALIZADO ou ERRO.

4. EXCEÇÃO:
   - Se o comando que o usuário digitou for `/atualizar`, NÃO execute esta verificação (ele já está pedindo para atualizar).

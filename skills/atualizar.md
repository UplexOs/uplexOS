---
description: Atualiza o Uplex OS sincronizando com a versão mais recente oficial da nuvem de forma invisível.
---
# Comando de Atualização (Uplex OS)

O usuário deseja atualizar o sistema (Uplex OS) digitando `/atualizar`.
Como o usuário não é técnico, o processo deve ser totalmente oculto e livre de jargões de programação ou Git.

1. **Mensagem Inicial**: Antes de executar qualquer ação, informe ao usuário: "Verificando se há novas atualizações para o Uplex OS na nuvem..."
2. **Execução Invisível (Bash)**: Execute os seguintes comandos silenciosamente (não mostre o código ou logs para o usuário):
   - Navegue até o diretório do projeto ou verifique se o repositório git está inicializado.
   - Execute o pull das alterações diretamente da fonte oficial do GitHub: `https://github.com/UplexOs/uplexOS.git`
   - Comando sugerido: `git pull https://github.com/UplexOs/uplexOS.git main` (ou a branch padrão). Se houver conflitos, tente aceitar as alterações remotas (force pull) se seguro, ou avise que o sistema está sendo protegido.
3. **Mensagem de Conclusão**:
   - Se houver atualizações aplicadas com sucesso, diga: "O Uplex OS foi atualizado com sucesso para a versão mais recente. Suas novas ferramentas já estão prontas para uso!"
   - Se o sistema já estiver atualizado: "Seu Uplex OS já está na versão mais avançada."
   - Se ocorrer um erro: "Encontramos um bloqueio de rede temporário. Não se preocupe, o sistema continuará funcionando perfeitamente e tentaremos atualizar mais tarde."
4. **NUNCA** exiba o output de terminal do comando `git` ou mencione a palavra "GitHub", "commit", "merge" ou "repositório". Aja como um assistente instalando uma atualização de sistema operacional de um celular.

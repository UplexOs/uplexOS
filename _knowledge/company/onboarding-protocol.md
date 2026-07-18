# Protocolo de Onboarding (UplexOS CLI)

A partir da versão 4.1 do UplexOS, a criação de novos projetos não deve ser feita por conversa não estruturada. O runtime exige a CLI versionada e auditável.

## Como Executar
Sempre que o usuário solicitar o início de um novo projeto (ex: `/onboarding` ou "Vamos iniciar o projeto de uma clínica"), o sistema deve orientá-lo a rodar o executável nativo:

```bash
npm run uplex -- init nome-do-projeto --tier startup --client "Nome do Cliente" --goal "Objetivo"
```

O comando Node.js é o padrão por funcionar em Windows, macOS e Linux. `./.uplex/ops/onboarding.sh` permanece disponível apenas como fluxo legado.

## O que a CLI faz nos bastidores?
1. Valida slug, Tier, cliente e objetivo informados como argumentos.
2. Impede colisões com instâncias já existentes.
3. Isola o novo projeto dentro de `_projetos/`.
4. **Gera o Dossiê do Projeto:** Salva `projeto.md` na instância isolada (dados corporativos globais continuam sujeitos à política de aprovação).
5. **Gera a Arquitetura de Pastas:** Cria `_projetos/[nome]/`, separando os contextos de código e marketing.
6. **Inicializa o Handoff:** Cria estado e tasks conformes aos schemas, inicia em `onboarding` e registra a primeira evidência em `timeline.jsonl`.

## Regra de Ouro (Data Quality)
O Assistente nunca deve sobrescrever os arquivos gerados pela CLI sem uma mudança de escopo confirmada. A fonte da verdade de um projeto nascente é a CLI Node.js; o Bash é apenas compatibilidade legada.

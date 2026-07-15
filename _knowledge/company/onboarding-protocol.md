# Protocolo de Onboarding (UplexOS CLI)

A partir da versão 4.0 do UplexOS, a criação de novos projetos e o cadastro de novos clientes não deve ser feito através de conversa não estruturada. O sistema exige a utilização do script interativo de terminal.

## Como Executar
Sempre que o usuário solicitar o início de um novo projeto (ex: `/onboarding` ou "Vamos iniciar o projeto de uma clínica"), o sistema deve orientá-lo a rodar o executável nativo:

```bash
./.uplex/ops/onboarding.sh
```

## O que o script faz nos bastidores?
1. Apresenta uma interface corporativa e hacker para o cliente final.
2. Faz 4 perguntas-chave sobre o negócio (Nome, Nicho, Dor, Público).
3. Faz 3 perguntas sobre o software (Slug do Projeto, Objetivo e Nível de Tier - MVP, Startup, Enterprise).
4. **Gera o Dossiê do Cliente:** Salva um arquivo Markdown padronizado em `_knowledge/clients/`.
5. **Gera a Arquitetura de Pastas:** Cria `_projetos/[nome]/`, separando os contextos de código e marketing.
6. **Inicializa o Handoff:** Trava a Máquina de Estados no `contexto/estado.json` definindo a próxima fase como `planejamento_arquitetural` e exigindo o `software-architect`.

## Regra de Ouro (Data Quality)
O Assistente nunca deve sobrescrever os arquivos gerados pelo script de onboarding manualmente a menos que o cliente mude drasticamente o escopo. A fonte da verdade para um projeto nascente agora nasce do Bash CLI.

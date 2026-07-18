# PROTOCOLO: SECURITY HALT & RISK ACCEPTANCE

Este documento formaliza a **Emenda 2: Doutrina de Override Limitado** do UplexOS.
Sempre que o `security-engineer` ou processos de CI/CD detectarem vulnerabilidades críticas ou quebras de compliance, um estado de **SECURITY HALT** é declarado e o deploy é barrado.

## Condições para Override (Quebra de Veto)
Apenas o **Executive Committee** (via aprovação explícita do usuário/diretor) pode ignorar um Security Halt. Isso exige o preenchimento deste registro.

---

## 🛑 REGISTRO DE ACEITAÇÃO DE RISCO (RISK ACCEPTANCE)

**ID do Incidente:** #SEC-[YYYYMMDD]-[ID]
**Data do Override:** [DD/MM/YYYY]
**Projeto Afetado:** [NOME_DO_PROJETO]
**Tier do Projeto:** [Tier 1 / Tier 2] *(Aviso: Overrides em Tier 3 para dados sensíveis são estritamente proibidos)*

### 1. Descrição do Veto de Segurança
*(O que o Security Engineer encontrou? Ex: Exposição de variável de ambiente, ausência de rate limiting, criptografia fraca)*
> [Preencher descrição]

### 2. Justificativa de Negócios para o Override
*(Por que não podemos corrigir agora? Qual o impacto financeiro/estratégico de não lançar hoje?)*
> [Preencher justificativa]

### 3. Mitigação Compensatória Temporária
*(Como vamos diminuir o risco enquanto a correção real não é feita? Ex: Monitoramento intensivo de logs, restrição de IP)*
> [Preencher mitigação]

### 4. Prazo Limite para Correção (Débito Técnico)
*(Data exata em que esta aceitação expira e o sistema DEVE ser corrigido)*
> **Data Limite:** [DD/MM/YYYY] (Máximo recomendado: 7 a 14 dias)

---
*Assinatura Eletrônica (Diretoria):* ___________________________

---
name: instalar
version: 1.0.0
description: Configura a identidade, o negócio e as preferências da própria empresa no UplexOS. Use quando o usuário disser "/instalar", "configurar empresa" ou "instalar UplexOS".
risk_level: medium
mode: assisted
read_scope: [knowledge.company]
write_scope: [knowledge.company]
required_inputs: []
outputs: [_knowledge/company/empresa.md, _knowledge/company/preferencias.md]
external_actions: []
requires_approval: [overwrite_company_profile]
aliases: [configurar-empresa]
status: active
---

# /instalar — Configuração da empresa

## Objetivo

Configurar a própria empresa do usuário na memória central do UplexOS. Não confundir com o onboarding de clientes ou projetos.

## Preflight

1. Confirme que a sessão está na raiz do UplexOS.
2. Leia, se existirem, `_knowledge/company/empresa.md` e `_knowledge/company/preferencias.md`.
3. Informe se os arquivos já contêm dados e que a atualização substituirá o perfil atual.
4. Não solicite nem registre senhas, tokens, chaves ou outros segredos.

## Entrevista

Faça estas perguntas de forma objetiva, agrupadas ou uma por vez:

1. **Identidade e negócio:** qual é o nome da empresa (ou nome profissional) e o principal serviço entregue hoje?
2. **Público e diferencial:** quem é o cliente ideal e por que ele escolhe essa empresa em vez da concorrência?
3. **Preferências de comunicação:** como o UplexOS deve se comunicar no dia a dia (tom, tamanho das respostas, uso de emojis e comportamentos a evitar)?

Se uma resposta essencial estiver incompleta, peça somente o complemento necessário.

## Aprovação e escrita

1. Organize um resumo dos dados e mostre quais arquivos serão alterados.
2. Solicite aprovação explícita antes de criar ou sobrescrever os arquivos.
3. Após a aprovação, grave:
   - `_knowledge/company/empresa.md`: identidade, serviço, público ideal e diferenciais;
   - `_knowledge/company/preferencias.md`: tom, formato e restrições de comunicação.
4. Preserve informações úteis existentes que o usuário não pediu para remover.

## Verificação

Releia os dois arquivos e confirme que:

- não há placeholders pendentes;
- os dados refletem as respostas aprovadas;
- nenhum segredo foi registrado.

Se não houver aprovação ou faltarem informações essenciais, não altere os arquivos e informe o bloqueio.

## Conclusão

Ao concluir, responda:

`[HH:MM] System Installer: setup da empresa concluído. O UplexOS agora opera sob as diretrizes da [NOME DA EMPRESA].`

Recomende revisar `git diff` quando o diretório estiver sob controle de versão.
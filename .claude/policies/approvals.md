# Política de aprovações do UplexOS

## Aprovação específica obrigatória

Exigem confirmação clara imediatamente antes da ação:

- push para repositório remoto;
- deploy ou alteração em produção;
- migração de banco, especialmente destrutiva;
- exclusão ou sobrescrita irreversível;
- instalação ou atualização de dependências;
- chamada de API paga, cobrança ou assinatura;
- ativação de analytics, cookies ou coleta de dados;
- envio de dados, código ou artefatos a serviço externo;
- alteração de secrets, permissões, DNS ou infraestrutura;
- aceitação ou override de risco de segurança.

## Registro mínimo

A aprovação deve registrar ação, escopo, riscos apresentados, autor, data/hora e prazo de validade. Aprovação para uma ação não autoriza ações subsequentes semelhantes.

## Proibições

- Silêncio não é aprovação.
- Aprovação genérica no início do projeto não cobre produção, cobrança ou destruição.
- Uma skill não pode aprovar a própria exceção de segurança.

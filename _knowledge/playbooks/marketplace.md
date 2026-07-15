# Playbook Executivo: Marketplace

Este é o livro de regras definitivo para a construção de projetos classificados como "Marketplace" (ex: Uber, Airbnb, iFood) dentro da UplexOS.
Quando o CEO ou CPO classificar a ideia como Marketplace, toda a cadeia de especialistas deve ler este arquivo e obedecê-lo cegamente.

## 1. Regras de Arquitetura de Negócios (O que nunca falhar)
Um marketplace não é uma loja virtual, ele é um conector de duas pontas: Oferta e Demanda.
- **O Problema do Ovo e da Galinha:** A Landing Page principal deve ser desenhada com DOIS CTAs claros. Um para "Compradores" e outro para "Vendedores".
- **Identidade Fragmentada:** O painel do Vendedor deve ser focado em métricas e gestão financeira. O painel do Comprador deve focar em descoberta e friction-less (pagamento em 1 clique).

## 2. A Stack Financeira (FinOps / Billing Engineer)
- **Proibido usar checkout comum.** Um Marketplace exige Split de Pagamento (divisão).
- O `billing-engineer` é OBRIGADO a implementar o **Stripe Connect**.
- Se o comprador pagar R$ 100,00, a API deve transferir R$ 80,00 para o Vendedor (Vendor) e reter R$ 20,00 como Taxa da Plataforma na hora do checkout.

## 3. O Banco de Dados (DBA)
- Relacionamentos obrigatórios: As tabelas não são lineares.
- `Usuario` tem dois papéis (`Role`: `BUYER` ou `VENDOR`).
- O `Pedido` não pertence apenas a um usuário. Ele precisa ter `buyer_id` e `vendor_id`.
- Sistema obrigatório de Avaliações/Reviews atrelado à relação Vendedor <-> Produto.

## 4. Design e Frontend (Creative Director)
- A Home Page tem que parecer gigante e confiável.
- **Componentes Exigidos:** Barra de Pesquisa Avançada (Search Bar) massiva e centralizada no Hero. Filtros de categoria complexos.
- Exibir Grid de Cards com alta densidade de imagem (ex: Airbnb).

## 5. Falhas Evitadas (Riscos CTO)
- **Falta de Moderação:** Se o Vendor subir um produto, o CTO deve exigir uma tabela de `status` (PENDING, APPROVED, REJECTED). Nada vai ao ar sem a aprovação do dono do Marketplace para evitar responsabilidade legal sobre conteúdo impróprio.

# Diretrizes Oficiais de Arquitetura da UplexOS

Estas regras são imutáveis e devem ser lidas por todos os engenheiros (Front, Back, DBA e DevOps) antes de escreverem qualquer código para um cliente.

## 1. Padrão Global de Repositório
Todo projeto entregue pela Uplex será um monorepo enxuto contendo:
- O código-fonte na pasta `code/`.
- A infraestrutura Cloud-Native invisível (Zero-ops).

## 2. A Stack Premium 2026 (Pro Max)
A Uplex não usa tecnologias defasadas. A stack de fundação é:
- **Core:** Next.js 15 (App Router), React 19, TypeScript (Strict).
- **Dados:** Supabase, Prisma/Drizzle.
- **Identidade e Monetização:** Clerk (Auth) e Stripe (Billing).
- **Interface e Motion:** Tailwind v4, shadcn/ui, Framer Motion, Lenis, React Three Fiber.
- **Inteligência:** Vercel AI SDK.

## 3. Segurança (Tolerância Zero)
- Nenhum engenheiro tem permissão para deixar chaves públicas. O Security Engineer atuará caso identifique vazamento.
- Formulários usarão sempre validação Zod.

## 4. Handoff e Comunicação
Nenhum engenheiro fala diretamente com o cliente para pedir detalhes técnicos (Ex: "Qual banco de dados você quer?"). O Product Manager já definiu isso no escopo inicial. Se houver lacuna, o Engenheiro toma a decisão pautada na Stack Premium e executa.

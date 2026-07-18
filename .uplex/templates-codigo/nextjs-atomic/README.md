# [Nome do Projeto] — Frontend

Projeto frontend construído com Next.js 15, TypeScript, Tailwind CSS e padrão Atomic Design.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript 5.x (strict)
- **Estilização:** Tailwind CSS 4.x
- **Componentes:** shadcn/ui + Radix UI
- **Animações:** GSAP 3.x (ScrollTrigger + Draggable)
- **Estado:** Zustand + React Query
- **Forms:** React Hook Form + Zod

## Estrutura (Atomic Design)

```
src/components/
├── atoms/        # Botões, inputs, ícones, tipografia
├── molecules/    # Combinações de átomos
├── organisms/    # Seções completas
├── templates/    # Layouts de página
└── pages/        # Páginas finais
```

## Setup

```bash
npm install
npm run dev
```

## Mobile (Capacitor)

Para transformar em app mobile:

```bash
npx cap init [Nome do App] [com.app.id]
npx cap add ios
npx cap add android
npx cap sync
```

## Animações

Todas as animações seguem o padrão GSAP com cleanup via `gsap.context()`.
Para novos componentes animados, usar `AnimatedWrapper`.

# [Nome do Projeto] — Frontend

## Stack

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript 5
- **Estilização:** CSS Modules / Tailwind CSS
- **Gerenciador:** npm

## Setup

```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start
```

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Iniciar servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Iniciar servidor de produção |
| `npm run lint` | Verificar erros de lint |
| `npm run lint:fix` | Corrigir erros de lint automaticamente |
| `npm run type-check` | Verificar tipos TypeScript |
| `npm run format` | Formatar código com Prettier |
| `npm run format:check` | Verificar formatação |

## Estrutura

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Página inicial
│   ├── globals.css         # Estilos globais
│   └── [rotas]            # Suas rotas aqui
├── components/             # Componentes React
│   ├── ui/                # Componentes reutilizáveis
│   └── [feature]/         # Componentes por feature
├── hooks/                  # Custom Hooks
├── lib/                    # Utilitários
│   ├── api.ts            # Configuração de API
│   └── utils.ts          # Funções utilitárias
├── services/              # Chamadas de API
├── types/                 # Tipos TypeScript
└── constants/             # Constantes da aplicação
```

## Variáveis de Ambiente

```bash
# Copie o exemplo
cp .env.example .env.local

# Edite com suas configurações
```

## Boas práticas

### Commits

Este projeto usa Husky + Commitlint para padronizar commits:

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas gerais
```

### Antes de commitar

O pre-commit hook executa:
1. ESLint
2. TypeScript check
3. Prettier format

### Pull requests

1. Crie uma branch: `git checkout -b feat/minha-feature`
2. Commit: `git commit -m "feat: minha feature"`
3. Push: `git push origin feat/minha-feature`
4. Abra PR no GitHub

## Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## Recursos

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação TypeScript](https://www.typescriptlang.org/docs/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

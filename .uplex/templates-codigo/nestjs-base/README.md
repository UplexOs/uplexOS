# [Nome do Projeto] — Backend

## Stack

- **Framework:** NestJS 10
- **Linguagem:** TypeScript 5
- **ORM:** Prisma
- **Documentação:** Swagger/OpenAPI
- **Gerenciador:** npm

## Setup

```bash
# Instalar dependências
npm install

# Configurar Prisma
npx prisma generate

# Criar banco (desenvolvimento)
npx prisma db push

# Iniciar desenvolvimento
npm run start:dev

# Build de produção
npm run build

# Iniciar produção
npm run start:prod
```

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run start:dev` | Iniciar em modo watch |
| `npm run start:prod` | Iniciar produção |
| `npm run lint` | Verificar erros de lint |
| `npm run lint:fix` | Corrigir erros automaticamente |
| `npm run type-check` | Verificar tipos |
| `npm run format` | Formatar código |
| `npm run test` | Rodar testes |
| `npm run test:cov` | Rodar testes com coverage |
| `npm run prisma:studio` | Abrir Prisma Studio |
| `npm run prisma:db:push` | Sincronizar banco |
| `npm run prisma:migrate` | Rodar migrations |

## Estrutura

```
src/
├── main.ts                    # Entry point
├── app.module.ts            # Módulo raiz
├── app.controller.ts       # Controller raiz
├── app.service.ts          # Service raiz
├── config/
│   └── configuration.ts   # Configuração env
├── modules/
│   ├── auth/              # Módulo de autenticação
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/    # Passport strategies
│   │   ├── guards/       # Guards
│   │   └── dto/          # Data Transfer Objects
│   ├── users/            # Módulo de usuários
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   └── [feature]/        # Seus módulos aqui
├── common/
│   ├── decorators/       # Decorators customizados
│   ├── filters/          # Filtros de exceção
│   ├── guards/           # Guards globais
│   ├── interceptors/     # Interceptors
│   ├── pipes/            # Pipes customizados
│   └── utils/            # Utilitários
└── prisma/
    └── schema.prisma     # Schema do banco
```

## Configuração

### Variáveis de Ambiente

```bash
# Copie o exemplo
cp .env.example .env

# Edite com suas configurações
```

### .env.example

```env
# Aplicação
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/projeto_dev

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3001
```

## API

### Documentação Swagger

Quando em desenvolvimento, acesse:
```
http://localhost:3000/api/docs
```

### Endpoints padrão

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /health | Health check |
| POST | /auth/register | Registrar usuário |
| POST | /auth/login | Login |

## Boas Práticas

### Commits

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas gerais
```

### Data Transfer Objects (DTOs)

Use classes com class-validator:

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
```

### Erros

Use HttpException:

```typescript
throw new NotFoundException('Usuário não encontrado');
throw new BadRequestException('Email inválido');
```

## Deploy

### Railway (Recomendado)

1. Conecte o repositório no Railway
2. Configure as variáveis de ambiente
3. Deploy automático

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main"]
```

## Recursos

- [Documentação NestJS](https://docs.nestjs.com/)
- [Prisma Docs](https://prisma.io/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [Swagger/OpenAPI](https://swagger.io/)

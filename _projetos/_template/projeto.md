# [Nome do Projeto]

**Criado em:** YYYY-MM-DD
**Status:** Planejando | Em desenvolvimento | Concluído

---

## Visão do Projeto

### O que é
[Descrição clara em 1-2 frases]

### Problema que resolve
[Qual dor do usuário isso resolve]

### Público-alvo
[Quem vai usar: perfil, características]

### Empresa ou pessoal
[Se é para empresa (qual) ou uso pessoal]

---

## Escopo

### Tipo de projeto
- [ ] Marketing
- [ ] Site
- [ ] Sistema
- [ ] App
- [ ] E-commerce

### Plataformas
- [ ] Web
- [ ] Mobile
- [ ] Desktop

### Features necessárias

**Must-have (essencial):**
- [ ] Feature 1
- [ ] Feature 2

**Should-have (importante):**
- [ ] Feature 3

**Could-have (desejável):**
- [ ] Feature 4

---

## Marketing

### Vai ter marketing?
- [ ] Sim
- [ ] Não

### Canais necessários
- [ ] Site
- [ ] Redes Sociais
- [ ] Google Ads
- [ ] Facebook/Instagram

### Objetivo do marketing
[ ] Gerar vendas
[ ] Gerar leads
[ ] Marcar presença
[ ] Engajar comunidade

---

## Stack Técnica

### Frontend

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript 5.x (strict)
- **Padrão:** Atomic Design (atoms → molecules → organisms → templates → pages)
- **Estilização:** Tailwind CSS 4.x
- **Componentes:** shadcn/ui + Radix UI
- **Ícones:** Lucide React
- **Gerenciador:** npm

#### Animações
- [ ] **Sem animações** — apenas funcional
- [ ] **GSAP** — animações profissionais com ScrollTrigger
  - [ ] Fade-up ao scroll
  - [ ] Stagger em listas/grids
  - [ ] Hero animations (timeline)
  - [ ] Parallax
  - [ ] Outros:

#### Referências visuais
- [ ] **21st.dev** — buscar inspiração para animações/efeitos
- [ ] Sites de referência: [listar URLs]
- [ ] Sem referências

#### Estilo visual
- [ ] Moderno / Startup
- [ ] Minimalista
- [ ] Institucional
- [ ] Dark / Neon
- [ ] Bento Grid
- [ ] Glassmorphism
- [ ] Outro:

### Mobile

- [ ] **Responsive Web** — site responsivo via navegador
- [ ] **Capacitor** — empacotar Next.js como app nativo
  - [ ] iOS
  - [ ] Android
- [ ] **App nativo separado** — React Native (backend compartilhado)
- [ ] **Não aplica**

### Backend
- **Framework:** NestJS 10+
- **Linguagem:** TypeScript 5+
- **Bibliotecas adicionais:**
  - [ ] Prisma ORM
  - [ ] Passport (auth)
  - [ ] Class Validator
  - [ ] Swagger/OpenAPI
  - [ ] Outras:

### Database
- **Engine:** PostgreSQL 15+
- **ORM:** Prisma (se escolhido)
- **Migrations:** Sim / Não

### Infraestrutura
- [ ] Docker + Docker Compose
- [ ] Vercel (frontend)
- [ ] Railway / Render (backend)
- [ ] AWS / GCP / Azure
- [ ] CI/CD

---

## Modelagem de Dados

### Entidades

**Entidade 1:**
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| id | UUID | Sim | Identificador |
| nome | String | Sim | Nome |
| email | String | Não | Email |
| criadoEm | DateTime | Sim | Data de criação |

**Entidade 2:**
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| id | UUID | Sim | Identificador |
| titulo | String | Sim | Título |
| descricao | Text | Não | Descrição |

### Relacionamentos
[Descrever relationships entre entidades]

---

## Wireframes / Fluxos

### Fluxo 1: [Nome]
[Descrever o fluxo de usuário]

### Fluxo 2: [Nome]
[Descrever o fluxo]

---

## REST API

### Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /users | Listar usuários |
| GET | /users/:id | Buscar usuário |
| POST | /users | Criar usuário |
| PUT | /users/:id | Atualizar usuário |
| DELETE | /users/:id | Deletar usuário |

---

## Autenticação

- [ ] JWT
- [ ] Session
- [ ] OAuth (Google, GitHub)
- [ ] MFA

---

## Design System

**Status:** [ ] Não definido | [ ] Em criação | [x] Validado

### Marca
- **Nome:** [Nome da marca]
- **Logo:** [Descrição ou link]
- **Tom de voz:** [Formal / Descontraído / Técnico / Criativo]

### Cores
- **Primária:** #[hex]
- **Secundária:** #[hex]
- **Accent:** #[hex]
- **Fundo:** #[hex]
- **Texto:** #[hex]

### Tipografia
- **Heading:** [Fonte]
- **Body:** [Fonte]

### Referências
- [URL 1]
- [URL 2]

---

## Restrições

### Técnicas
- [Lista de restrições técnicas]

### Prazo
[data ou estimativa]

### Orçamento
[R$ ou "a definir"]

---

## Contexto adicional do briefing
[Todas as informações extras coletadas no interview]

---

## Histórico de alterações

| Data | Alteração | Por |
|------|-----------|-----|
| YYYY-MM-DD | Criação do projeto | UplexOS |

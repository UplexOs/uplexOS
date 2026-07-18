---
name: design-system
description: >
  Gera o design system de um projeto antes de codar. Coleta referências visuais,
  cores da marca, logo, tipografia e gera tokens de design validados pelo usuário.
  Use quando o usuário quiser definir a identidade visual do projeto antes de
  gerar código frontend, ou quando disser "design system", "identidade visual",
  "cores do projeto", "montar design".
---

# Design System — Identidade Visual do Projeto

Este documento define como criar e validar o design system de um projeto
antes de gerar qualquer código frontend.

---

## Por que criar antes de codar?

Sem um design system validado, o frontend é gerado com suposições:
- Cores que não são da marca
- Tipografia que não combina
- Estilo visual diferente do que o usuário imaginou

O design system garante que TODO o código gerado siga os padrões definidos.

---

## Fluxo

### 1. Identificar projeto

Verificar se há um projeto ativo lendo `projeto.md`.

Se não houver:
> "Nenhum projeto ativo encontrado. Vamos criar um?"

### 2. Coletar informações do cliente

Fazer as seguintes perguntas (uma por vez, respeitando respostas):

#### 2a. Nome da marca

**"Qual o nome da marca/empresa?"**

Se o usuário não souber, usar o nome do projeto.

#### 2b. Logo

**"Já tem logo? Se sim, pode me enviar ou descrever?"**

- Se tiver logo → analisar as cores predominantes
- Se NÃO tiver → perguntar se tem cor preferida

#### 2c. Cores da marca

**"Já tem cores definidas para a marca?"**

- [ ] Sim — tem paleta pronta
- [ ] Não — preciso de sugestão

Se **tem paleta pronta**, pedir hex codes ou cores.

Se **precisa de sugestão**, perguntar:
> "Qual sensação quer transmitir?"

Opções:
- Profissional / confiável → azul escuro, cinza
- Energia / jovem → vermelho, laranja, amarelo
- Natureza / saúde → verde, tons terrosos
- Premium / luxo → preto, dourado, branco
- Tech / inovação → roxo, azul neon, gradiente
- Calmo / acolhedor → tons pastel, bege

#### 2d. Referências visuais

**"Tem algum site que gosta como referência visual?"**

Pedir 2-3 URLs. Exemplos:
- apple.com — minimalista, clean
- stripe.com — moderno, gradientes
- linear.app — dark mode, elegante
- notion.so — simples, focado em conteúdo

Se não tiver referências, oferecer consultar o 21st.dev para sugestões.

#### 2e. Tipografia

**"Tem preferência de fonte? Se não, posso sugerir."**

Sugestões por estilo:
- **Moderno / Startup:** Inter, Plus Jakarta Sans, SF Pro
- **Premium / Luxo:** Playfair Display, Cormorant Garamond
- **Tech / Futurista:** Space Grotesk, Syne
- **Amigável / Leve:** Nunito, Quicksand, DM Sans
- **Corporativo / Sério:** Merriweather, Source Serif Pro

#### 2f. Tom de voz

**"Qual o tom de comunicação do site?"**

- [ ] Formal / Corporativo
- [ ] Descontraído / Amigável
- [ ] Técnico / Especializado
- [ ] Criativo / Inovador

---

### 3. Gerar Design System

Com as informações coletadas, gerar um arquivo de design system:

```
projetos/[nome]/design-system/
├── palette.md        # Paleta de cores completa
├── typography.md     # Fontes, tamanhos, pesos
├── tokens.ts         # Tokens de design (CSS vars + TS)
├── references.md     # Referências visuais
└── moodboard.md      # Moodboard (descrições visuais)
```

#### Palette

Incluir:
- Cor primária
- Cor secundária
- Cor de destaque (accent)
- Cor de fundo
- Cor de texto
- Cores de estado (sucesso, aviso, erro)
- Versões claras/escuras

#### Typography

Incluir:
- Fonte principal (heading)
- Fonte secundária (body)
- Escala tipográfica (xs → 5xl)
- Pesos (normal, medium, semibold, bold)
- Altura de linha (leading)

#### Tokens

Gerar `tokens.ts` e `globals.css` com:
- CSS custom properties para todas as cores
- Espessuras de borda
- Sombras
- Border radius
- Transições
- Breakpoints

---

### 4. Apresentar para validação

Mostrar ao usuário:
1. Paleta de cores (descrições ou imagens)
2. Tipografia escolhida
3. Exemplo de componentes com as cores
4. Referências usadas

**"Como está o design system? Quer ajustar algo?"**

---

### 5. Validar ou ajustar

Se usuário pedir ajuste:
- Mudar cor → regenerar palette
- Mudar fonte → atualizar typography
- Nova referência → incorporar no design

Se aprovado:
- Marcar como "Validado" em `projeto.md`
- Usar tokens do design system como base para gerar código frontend

---

### 6. Integrar com o frontend

Quando gerar código frontend:
1. Ler `design-system/tokens.ts`
2. Usar tokens como base para componentes
3. Aplicar cores, fontes, espaçamentos dos tokens
4. Garantir consistência visual

---

## Exemplo de paleta gerada

### Exemplo: Startup de tecnologia

```ts
// tokens.ts
export const designSystem = {
  brand: {
    name: 'TechNova',
    primary: '#6366f1',    // Indigo 500
    secondary: '#8b5cf6',  // Violet 500
    accent: '#06b6d4',     // Cyan 500
  },
  colors: {
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f1f5f9',
    border: '#e2e8f0',
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: {
    heading: 'Plus Jakarta Sans',
    body: 'Inter',
    scale: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
};
```

---

## Regras

- Coletar informações uma por vez (não enfileirar perguntas)
- Se usuário não souber algo, sugerir opções
- Sempre apresentar resultado antes de gerar código
- Se não tiver logo, gerar suggestion de logo
- Registrar todas as decisões em `projeto.md`
- Design system validado é pré-requisito para gerar frontend

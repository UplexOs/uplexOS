---
name: reels
description: >
  Gera reels para Instagram com IA. Inclui vídeos curtos com música,
  transições e legendas. Formatos 9:16 (1080x1920) ou 1:1 (1080x1080).
  Use quando o usuário disser "/reels", "criar reels", "instagram reels", "tiktok".
---

# /reels — Gerar Reels para Instagram

Gera reels profissionais para Instagram.

## Fluxo

### 1. Identificar tipo de reel

**"Que tipo de reel você quer?"**

Opções:
- [ ] **Tutorial** — passo a passo
- [ ] **Depoimento** — cliente falando
- [ ] **Bastidores** — por trás das cenas
- [ ] **Motivação** — frase motivacional
- [ ] **Produto** — demonstração de produto
- [ ] **Dica** — dica rápida
- [ ] **Trend** — trend do momento
- [ ] **Meme** — humor
- [ ] **Animação** — personagem animado

### 2. Coletar conteúdo

**Perguntas obrigatórias:**
- Texto/roteiro do reel
- Música (estilo)
- Duração (5-60s)
- Avatar (se aplicável)

**Perguntas opcionais:**
- Legendas (sim/não)
- Transições
- Efeitos visuais
- CTA no final

### 3. Gerar reel

#### Via HeyGen (recomendado)
Gerar vídeo com avatar falando.

#### Via Canva
Gerar reel com templates prontos.

#### Via CapCut
Gerar reel com efeitos profissionais.

#### Via InVideo AI
Gerar reel com IA.

### 4. Adicionar elementos

**Elementos obrigatórios:**
- [ ] **Legendas** — grandes e legíveis
- [ ] **Música** — trending
- [ ] **Transições** — suaves

**Elementos opcionais:**
- [ ] **Efeitos** — zoom, pan
- [ ] **Filtros** — cor
- [ ] **Stickers** — GIF
- [ ] **Texto animado** — aparecer

### 5. Salvar e publicar

**Opções:**
- [ ] Salvar como rascunho
- [ ] Publicar agora (via Meta API)
- [ ] Agendar para depois
- [ ] Enviar para aprovação

---

## Casos de uso comuns

### Reel de tutorial
```
/reels
Tipo: Tutorial
Roteiro: "3 dicas para melhorar seu negócio"
Duração: 45 segundos
Música: Trending
Legendas: Sim
CTA: "Salve para depois"
```

### Reel de depoimento
```
/reels
Tipo: Depoimento
Vídeo: Depoimento de cliente (gerar com /video)
Legendas: Sim
Música: Fundo suave
CTA: "Comente abaixo"
```

### Reel motivacional
```
/reels
Tipo: Motivação
Texto: "O sucesso começa com a decisão de tentar"
Imagem: Fundo inspirador
Música: Épica
Legendas: Sim
Duração: 15 segundos
```

### Reel de produto
```
/reels
Tipo: Produto
Vídeo: Demonstração do produto
Legendas: Sim
Música: Energética
CTA: "Link na bio"
```

---

## Integração com outras skills

- **`/video`** — gerar vídeo com avatar
- **`/audio`** — gerar narração
- **`/gerar-imagens`** — gerar imagens de fundo
- **`/canvas`** — editar reel
- **`/publicar-tema`** — publicar reel

---

## Regras

- Formato 9:16 (1080x1920)
- Legendas grandes e legíveis
- Música trending quando possível
- CTA no final
- Duração máxima: 60 segundos
- Hook nos primeiros 3 segundos

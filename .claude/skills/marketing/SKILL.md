---
name: marketing
description: >
  Abre o módulo de marketing do projeto. Compartilha contexto com o projeto de código
  e oferece ferramentas para criar carrosséis, posts, vídeos, áudios, stories, reels
  e configurar APIs. Use quando o usuário disser "marketing", "/marketing".
---

# /marketing — Módulo de Marketing

Abre o módulo de marketing integrado ao projeto.

## Pré-requisitos

1. Ler `projeto.md` para contexto do projeto
2. Verificar se existe pasta `marketing/` no projeto
3. Verificar se APIs estão configuradas

---

## Output Inicial

```
╔══════════════════════════════════════════════════════╗
║                  MARKETING — [Nome]              ║
╚══════════════════════════════════════════════════════╝

📋 Contexto: [contexto do projeto]
🎯 Objetivo: [objetivo do marketing]
👥 público: [público-alvo]

═══════════════════════════════════════════════════════
CRIAR CONTEÚDO
═══════════════════════════════════════════════════════

📱 /carrossel    → Criar carrossel para Instagram
📸 /gerar-imagens→ Gerar imagens com IA (DALL-E)
🎙️ /audio        → Gerar narração com IA
🎬 /video        → Criar vídeo com avatar
📱 /story        → Criar story
🎥 /reels        → Criar reels
🎨 /canvas       → Editor visual

═══════════════════════════════════════════════════════
PUBLICAR
═══════════════════════════════════════════════════════

📢 /publicar-tema → Publicar em blog + redes sociais

═══════════════════════════════════════════════════════
CONFIGURAR
═══════════════════════════════════════════════════════

🔑 /configurar-apis   → Configurar APIs (OpenAI, ElevenLabs, etc)
📁 /templates         → Ver templates disponíveis

═══════════════════════════════════════════════════════
VISUALIZAR
═══════════════════════════════════════════════════════

🖼️ /geracoes → Ver assets gerados
```

---

## Sub-comandos

### /carrossel

Carregar skill `carrossel` para criar carrosséis profissionais para Instagram.

**Fluxo:**
1. Perguntar tipo: Educacional, Promocional, Autoridade, Nicho
2. Perguntar tema
3. Gerar textos + layouts
4. Gerar imagens (se API configurada)
5. Renderizar com Playwright (1080x1350)
6. Salvar em `marketing/geracoes/[data]-carrossel/`

### /gerar-imagens

Carregar skill `gerar-imagens` para gerar imagens com DALL-E 3.

**Fluxo:**
1. Perguntar tipo: foto de produto, banner, thumbnail, fundo, ilustração
2. Preparar instruções detalhadas
3. Gerar via DALL-E 3 ou alternativa
4. Processar (resize, compressão)
5. Salvar em `marketing/geracoes/imagens/`

### /audio

Carregar skill `audio` para gerar narração com IA.

**Fluxo:**
1. Perguntar tipo: narração, podcast, locução, audiobook
2. Preparar texto
3. Escolher voz (catálogo ElevenLabs)
4. Gerar áudio
5. Adicionar música de fundo (via Suno)
6. Salvar em `marketing/geracoes/audios/`

### /video

Carregar skill `video` para gerar vídeos com avatar.

**Fluxo:**
1. Perguntar tipo: avatar falante, apresentação, produto, story, reels
2. Escolher plataforma: HeyGen, Synthesia, DeepBrain
3. Preparar roteiro (ou gerar com IA)
4. Gerar áudio (via ElevenLabs)
5. Gerar vídeo com avatar
6. Adicionar legendas
7. Salvar em `marketing/geracoes/videos/`

### /story

Carregar skill `story` para criar stories para Instagram.

**Fluxo:**
1. Perguntar tipo: texto, foto, enquete, quiz, vídeo
2. Gerar via Canvas ou Canva
3. Adicionar elementos interativos
4. Salvar em `marketing/geracoes/stories/`

### /reels

Carregar skill `reels` para criar reels para Instagram.

**Fluxo:**
1. Perguntar tipo: tutorial, depoimento, bastidores, motivação
2. Gerar vídeo com avatar (HeyGen) ou template (Canva)
3. Adicionar legendas, música, transições
4. Salvar em `marketing/geracoes/reels/`

### /canvas

Carregar skill `canvas` para abrir editor visual.

**Fluxo:**
1. Perguntar tipo: carrossel, story, post, banner, thumbnail, logo
2. Gerar design via Canvas ou Canva
3. Iterar até aprovação
4. Salvar em `marketing/geracoes/`

### /publicar-tema

Carregar skill `publicar-tema` para publicar em blog + Instagram + Facebook.

### /configurar-apis

Carregar skill `configurar-apis` para configurar APIs de geração:
1. OpenAI (DALL-E para imagens)
2. ElevenLabs (Voz/TTS)
3. HeyGen (Vídeo com avatar)
4. Synthesia (alternativa para vídeo)
5. DeepBrain (alternativa para vídeo)
6. Suno (Música para vídeos)
7. Meta API (Instagram/Facebook)
8. ChatGPT Account (sem API, via browser)

---

## Fluxo Completo de Marketing

### 1. Configurar APIs
```
/configurar-apis
```

### 2. Gerar Conteúdo
```
/video — vídeo com avatar
/gerar-imagens — imagens para posts
/audio — narração para vídeos
/carrossel — carrossel para Instagram
/story — stories
/reels — reels
/canvas — editor visual
```

### 3. Publicar
```
/publicar-tema — publicar em blog + Instagram + Facebook
```

---

## Integrações

- **OpenAI** — DALL-E 3 (imagens), GPT (texto)
- **ElevenLabs** — narração com vozes naturais
- **HeyGen** — vídeos com avatar falante
- **Synthesia** — vídeos com avatar (alternativa)
- **DeepBrain** — vídeos com avatar (alternativa)
- **Suno** — trilha musical
- **Meta API** — publicar em Instagram/Facebook
- **Playwright** — renderização HTML para PNG
- **ChatGPT Account** — geração via navegador

---

## Estrutura de Saída

```
marketing/
├── conteudo/
│   ├── roteiros/
│   ├── carrosséis/
│   ├── stories/
│   ├── reels/
│   ├── vídeos/
│   ├── áudios/
│   └── imagens/
├── seo/
├── campanhas/
└── avaliações-google/
```

---

## Regras

- Sempre ler contexto do projeto antes de criar
- Usar tom de voz definido em `memoria/preferencias.md`
- Salvar tudo gerado em `marketing/geracoes/[data]-[tipo]/`
- Manter índice de todos os assets gerados
- Pedir aprovação antes de publicar
- Manter backup de todo conteúdo gerado
- Verificar se APIs estão configuradas antes de gerar

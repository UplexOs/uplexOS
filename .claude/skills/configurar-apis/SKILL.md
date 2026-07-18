---
name: configurar-apis
description: >
  Wizard de configuração de APIs para geração de conteúdo. Configura OpenAI, ElevenLabs,
  HeyGen, Synthesia, DeepBrain, Suno, Meta API e ChatGPT Account.
  Use quando o usuário disser "/configurar-apis", "configurar API", "setup API".
---

# /configurar-apis — Configurar APIs

Wizard de configuração de APIs para geração de conteúdo de marketing.

## Fluxo

### 1. Iniciar Setup Wizard

**Mostrar:**
```
╔══════════════════════════════════════════════════════╗
║              CONFIGURAÇÃO DE APIS                 ║
╚══════════════════════════════════════════════════════╝

Escolha qual API configurar:

1. 🔑 OpenAI — DALL-E 3 (imagens)
2. 🎙️ ElevenLabs — Narração com voz
3. 🎬 HeyGen — Vídeo com avatar
4. 🤖 Synthesia — Vídeo com avatar (alternativa)
5. 🧠 DeepBrain — Vídeo com avatar (alternativa)
6. 🎵 Suno — Trilha musical
7. 📱 Meta API — Publicar em Instagram/Facebook
8. 🌐 ChatGPT Account — Geração via navegador
9. ✅ Verificar todas

Digite o número da API:
```

### 2. Configurar Cada API

#### OpenAI (DALL-E 3)

**Objetivo:** Gerar imagens para posts, carrosséis, thumbnails, banners.

**Como obter:**
1. Criar conta em [platform.openai.com](https://platform.openai.com)
2. Criar API key em Settings → API keys
3. Adicionar créditos (mínimo $5 recomendado)

**Configuração:**
```bash
OPENAI_API_KEY=sk-...
```

**Teste:**
```bash
node scripts/gerar-imagem.js \
  --instrucoes "teste" \
  --size 1024x1024 \
  --output teste.png
```

**Preço:** ~$0.04/imagem (1024x1024)

---

#### ElevenLabs

**Objetivo:** Gerar narração com voz natural para vídeos, podcasts, audiobooks.

**Como obter:**
1. Criar conta em [elevenlabs.io](https://elevenlabs.io)
2. Criar API key em Profile → API keys
3. Plano starter: $5/mês (30k caracteres/mês)

**Configuração:**
```bash
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_VOICE_ID=antoni
```

**Teste:**
```bash
node scripts/gerar-audio.js \
  --text "Olá, teste de narração" \
  --voice Antoni \
  --output teste.mp3
```

**Vozes disponíveis (Português BR):**
- Antoni, Drew, Paula, Rachel, Clyde, Sam, Domi, Bella

---

#### HeyGen

**Objetivo:** Gerar vídeos com avatar falante (mais alta qualidade).

**Como obter:**
1. Criar conta em [heygen.com](https://heygen.com)
2. Obter API key em Settings → API
3. Plano starter: $29/mês (1 crédito = 1 minuto)

**Configuração:**
```bash
HEYGEN_API_KEY=...
```

**Teste:**
```bash
node scripts/gerar-video.js \
  --platform heygen \
  --avatar david \
  --script "Olá, mundo!" \
  --output video.mp4
```

**Preço:** ~$1/minuto (1080p)

---

#### Synthesia (Alternativa)

**Objetivo:** Gerar vídeos com avatar (160+ avatares).

**Como obter:**
1. Criar conta em [synthesia.io](https://synthesia.io)
2. Obter API key
3. Plano: $30/mês

**Configuração:**
```bash
SYNTHESIA_API_KEY=...
```

---

#### DeepBrain (Alternativa)

**Objetivo:** Gerar vídeos com avatar (preço competitivo).

**Como obter:**
1. Criar conta em [deepbrain.ai](https://deepbrain.ai)
2. Obter API key

**Configuração:**
```bash
DEEPBRAIN_API_KEY=...
```

---

#### Suno

**Objetivo:** Gerar trilha musical para vídeos.

**Como obter:**
1. Criar conta em [suno.com](https://suno.com)
2. Gerar API key

**Configuração:**
```bash
SUNO_API_KEY=...
```

**Uso:**
```bash
node scripts/gerar-musica.js \
  --instrucoes "upbeat corporate background music" \
  --duration 30 \
  --output musica.mp3
```

---

#### Meta API (Instagram/Facebook)

**Objetivo:** Publicar diretamente no Instagram e Facebook.

**Como obter:**
1. Criar conta no [Meta for Developers](https://developers.facebook.com)
2. Criar app
3. Configurar Instagram Business account
4. Obter access token
5. Solicitar permissões: `instagram_content_publish`, `pages_read_engagement`

**Configuração:**
```bash
META_APP_ID=...
META_APP_SECRET=...
META_ACCESS_TOKEN=...
META_INSTAGRAM_ACCOUNT_ID=...
META_BUSINESS_ACCOUNT_ID=...
```

**Teste:**
```bash
node scripts/publicar-instagram.js \
  --media-url "https://..." \
  --caption "Primeira publicação!" \
  --type image
```

---

#### ChatGPT Account (Sem API)

**Objetivo:** Gerar conteúdo via navegador (sem API necessária).

**Como obter:**
1. Criar conta em [chatgpt.com](https://chatgpt.com)
2. Assinar Plus ($20/mês) para maior limite

**Configuração:**
```bash
CHATGPT_EMAIL=...
CHATGPT_PASSWORD=...
```

**Uso:**
- Abrir ChatGPT via Playwright
- Enviar instruções via interface
- Extrair resultado

---

### 3. Arquivo de Configuração

Salvar configurações em `.env`:
```bash
# OpenAI
OPENAI_API_KEY=sk-...

# ElevenLabs
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_VOICE_ID=antoni

# HeyGen
HEYGEN_API_KEY=...

# Synthesia
SYNTHESIA_API_KEY=...

# DeepBrain
DEEPBRAIN_API_KEY=...

# Suno
SUNO_API_KEY=...

# Meta API
META_APP_ID=...
META_APP_SECRET=...
META_ACCESS_TOKEN=...
META_INSTAGRAM_ACCOUNT_ID=...
META_BUSINESS_ACCOUNT_ID=...

# ChatGPT Account
CHATGPT_EMAIL=...
CHATGPT_PASSWORD=...
```

### 4. Verificar Configurações

**Rodar:**
```bash
node scripts/verificar-apis.js
```

**Output:**
```
✅ OpenAI — Configurada
✅ ElevenLabs — Configurada
⚠️ HeyGen — Não configurada
❌ Suno — Não configurada
```

### 5. Salvar Estado

Atualizar `contexto/estado.json`:
```json
{
  "apis": {
    "openai": true,
    "elevenlabs": true,
    "heygen": false,
    "suno": false,
    "meta": false,
    "chatgpt": false
  }
}
```

---

## Fluxo Rápido

Para configuração rápida, usar wizard interativo:

```bash
node scripts/configurar-apis.js
```

O wizard guia o usuário passo a passo por cada API.

---

## Dicas

- Começar com OpenAI + ElevenLabs (essenciais para a maioria dos casos)
- HeyGen é caro mas tem a melhor qualidade
- Synthesia e DeepBrain são alternativas mais baratas
- Suno é ótimo para trilha musical gratuita (até 5 músicas/dia no plano free)
- Meta API requer aprovação do app para publicar em produção
- ChatGPT Account é a opção mais barata mas mais lenta

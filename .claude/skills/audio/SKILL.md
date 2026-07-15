---
name: audio
description: >
  Gera áudios com IA usando ElevenLabs e alternativas.
  Para marketing: narração de vídeos, podcasts, audiobooks, locução profissional.
  Use quando o usuário disser "/audio", "narração", "locução", "texto para fala", "TTS".
---

# /audio — Gerar Áudio com IA

Gera narrações e áudios profissionais usando IA.

## Fluxo

### 1. Identificar tipo de áudio

**"Que tipo de áudio você precisa?"**

Opções:
- [ ] **Narração de vídeo** — para vídeo marketing, tutorial
- [ ] **Podcast** — episódio completo
- [ ] **Audiobook** — livro narrado
- [ ] **Locução** — anúncio, comercial
- [ ] **Voz para IVR** — telefone
- [ ] **Áudio para rede social** — story, reel, tiktok
- [ ] **Outro**

### 2. Selecionar ferramenta

#### ElevenLabs (recomendado)
- Vozes mais naturais do mercado
- Clonagem de voz
- Multi-idioma
- Preço: ~$5/mês (starter)
- Ideal para: narração profissional

#### OpenAI TTS
- Vozes natural (alloy, shimmer, nova, onyx, echo, fable)
- Integração com DALL-E
- Preço: ~$15/mil caracteres
- Ideal para: uso geral

#### Amazon Polly
- Vozes neural
- Integração AWS
- Preço: ~$4/mil caracteres
- Ideal para: enterprise

#### Google Cloud TTS
- Vozes Neural2
- Multi-idioma
- Preço: ~$4/mil caracteres
- Ideal para: multilíngue

#### Microsoft Azure TTS
- Vozes naturais
- Studio Voice Studio
- Preço: ~$15/mil caracteres
- Ideal para: enterprise

#### Murf AI
- Focado em vídeos
- Editor integrado
- Preço: ~$26/mês
- Ideal para: vídeos explicativos

#### Play.ht
- Vozes realistas
- API robusta
- Preço: ~$5/mês
- Ideal para: conteúdo longo

### 3. Preparar texto

**Coletar do usuário:**
- Texto completo
- Velocidade (lenta, normal, rápida)
- Tom (entusiasta, calmo, profissional, amigável)
- Pausas estratégicas
- Ênfase em palavras

**Formatação especial:**
- `[pausa]` — pausa de 0.5s
- `[pausa longa]` — pausa de 1s
- `[risada]` — som de risada
- `[musica de fundo]` — indicar música
- **`*negrito*`** — ênfase

### 4. Escolher voz

**Catálogo de vozes ElevenLabs:**

#### Português (Brasil)
- **Antoni** — masculina, profissional
- **Drew** — masculina, jovem
- **Paula** — feminina, quente
- **Rachel** — feminina, calma
- **Clyde** — masculina, poderosa
- **Sam** — masculina, natural
- **Domi** — feminina, energética
- **Bella** — feminina, suave

#### Inglês (se necessário)
- **Adam** — masculina, profissional
- **Antoni** — masculina, confiante
- **Bill** — masculina, madura
- **Dorothy** — feminina, calma
- **Josh** — masculina, jovem
- **Matilda** — feminina, artística
- **Thomas** — masculina, natural

### 5. Gerar áudio

#### Via ElevenLabs (scripts/gerar-audio.js)

```bash
node scripts/gerar-audio.js \
  --text "texto da narração" \
  --voice Antoni \
  --speed 1.0 \
  --output narracao.mp3
```

Parâmetros avançados:
```bash
node scripts/gerar-audio.js \
  --text "texto" \
  --voice Bella \
  --speed 0.9 \
  --stability 0.5 \
  --similarity_boost 0.75 \
  --style 0.0 \
  --output narracao.mp3
```

#### Via OpenAI TTS

```bash
node scripts/gerar-audio.js \
  --provider openai \
  --text "texto" \
  --voice nova \
  --output narracao.mp3
```

#### Via Murf AI
Usar editor web do Murf AI para produção.

### 6. Pós-produção

**Adicionar automaticamente:**
- [ ] Música de fundo (via Suno ou biblioteca)
- [ ] Fade in/out
- [ ] Normalização de volume
- [ ] Remoção de ruídos
- [ ] Cortes de silêncio

### 7. Salvar e organizar

```
audios/
├── narracoes/
├── podcasts/
├── anuncios/
├── ivrs/
└── outros/
```

---

## Casos de uso comuns

### Narração para vídeo
```
/audio
Tipo: Narração de vídeo
Texto: "Olá! Hoje vou te mostrar..."
Voz: Antoni
Velocidade: 1.0
Tom: Profissional
Música: Fundo suave
```

### Locução para anúncio
```
/audio
Tipo: Locução
Texto: "Atenção! Oferta por tempo limitado!"
Voz: Domi
Velocidade: 1.2
Tom: Entusiasta
```

### Podcast
```
/audio
Tipo: Podcast
Texto: [transcrição completa]
Voz: Adam (intro) + Antony (conteúdo)
Duração: 30 minutos
Trilha: Intro musical
```

### Audiobook
```
/audio
Tipo: Audiobook
Livro: [título]
Voz: Matthew
Velocidade: 0.9
Tom: Calmo
```

### Áudio para redes sociais
```
/audio
Tipo: Áudio para rede social
Texto: "Acabou de chegar!"
Voz: Domi
Velocidade: 1.1
Duração: 15 segundos
```

---

## Integração com outras skills

- **`/video`** — narração para vídeos com IA
- **`/carrossel`** — narração opcional para carrossel
- **`/audio`** — gerar áudio isolado
- **`/suno`** — gerar trilha musical
- **`/publicar-tema`** — distribuir áudio

---

## Regras

- Sempre perguntar tipo de áudio antes
- Oferecer sugestão de voz
- Incluir pausa estratégica
- Gerar preview curto antes do áudio completo
- Salvar texto original (para regerar)
- Otimizar tamanho para destino final

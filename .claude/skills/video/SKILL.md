---
name: video
description: >
  Gera vídeos com IA para marketing usando HeyGen, Synthesia, DeepBrain e outras ferramentas.
  Suporta avatar falante, narração automática, legendas e animação de slides.
  Use quando o usuário disser "/video", "gerar video", "vídeo marketing", "narração".
---

# /video — Gerar Vídeo com IA

Gera vídeos profissionais usando IA para marketing e redes sociais.

## Fluxo

### 1. Identificar tipo de vídeo

**"Que tipo de vídeo você precisa?"**

Opções:
- [ ] **Avatar falante** — pessoa virtual falando (HeyGen, Synthesia, DeepBrain)
- [ ] **Apresentação animada** — slides com transições (HeyGen, Canva)
- [ ] **Vídeo de produto** — demonstração com texto/voz (Synthesia, D-ID)
- [ ] **Story/Reels** — vídeo curto (até 60s) para Instagram
- [ ] **Depoimento** — simular cliente falando (HeyGen, DeepBrain)
- [ ] **Tutorial** — passo a passo animado

### 2. Selecionar plataforma

#### HeyGen (recomendado)
- Melhor qualidade de avatar
- Vozes naturais em português
- Suporta lip-sync
- Preço: ~$24/mês (2 créditos)
- Ideal para: vídeos de vendas, depoimentos, apresentações

#### Synthesia
- Mais de 160 avatares
- 130+ línguas
- Templates prontos
- Preço: ~$30/mês
- Ideal para: cursos, treinamentos

#### DeepBrain AI
- Avatares realistas
- Vozes naturais
- Preço: ~$30/mês
- Ideal para: notícias, apresentações

#### D-ID
- Animação de fotos
- "Talking photo"
- Preço: ~$5.90/mês
- Ideal para: avatares personalizados

#### Lumen5
- Texto → vídeo (sem avatar)
- Foco em blog posts
- Preço: ~$49/mês
- Ideal para: marketing de conteúdo

### 3. Preparar conteúdo

**Coletar do usuário:**
- Roteiro (ou gerar com IA)
- Avatar (escolher entre catálogo ou usar personalizado)
- Idioma e sotaque
- Estilo visual (fundo, cores, branding)
- Duração alvo
- Música de fundo (opcional)
- Legendas (sim/não)

### 4. Gerar roteiro (se necessário)

Se o usuário não tiver roteiro, gerar com base em:
- Tema do vídeo
- Público-alvo
- Tom de voz (formal, descontraído, técnico)
- Duração esperada (~150 palavras/minuto)
- Estrutura: gancho → problema → solução → CTA

### 5. Gerar áudio (se necessário)

Se não tiver avatar (que inclui áudio), gerar narração separada:

Carregar skill `audio` para gerar narração com ElevenLabs.

### 6. Gerar vídeo

#### Via HeyGen
1. Criar avatar (ou usar existente)
2. Criar cena com fundo e branding
3. Adicionar falas (texto → áudio via ElevenLabs)
4. Adicionar legendas
5. Renderizar
6. Exportar (MP4)

#### Via Synthesia
1. Escolher template
2. Escolher avatar
3. Inserir texto
4. Personalizar fundo
5. Gerar vídeo

#### Via Lumen5 (sem avatar)
1. Colocar texto/base
2. Escolher estilo visual
3. Selecionar músicas
4. Gerar vídeo

### 7. Pós-produção

**Adicionar automaticamente:**
- Legendas (SRT)
- Logo da marca
- Call-to-action no final
- Thumbnail (via `scripts/gerar-imagem.js`)

### 8. Distribuição

Publicar em:
- [ ] Instagram (Feed, Stories, Reels)
- [ ] YouTube
- [ ] TikTok
- [ ] LinkedIn
- [ ] Site

Usar skill `publicar-tema` para distribuir.

---

## Exemplos de uso

### Vídeo de vendas de produto
```
/video
Tipo: Avatar falante
Plataforma: HeyGen
Roteiro: [gerar com IA]
Avatar: Profissional feminina, 30 anos
Fundo: Escritório clean
Duração: 60 segundos
Legendas: Sim
Música: Fundo suave
CTA: "Saiba mais em nosso site"
```

### Story de lançamento
```
/video
Tipo: Story/Reels
Plataforma: HeyGen
Duração: 15 segundos
Avatar: Jovem, energético
Estilo: Vibrante, cores vivas
Legendas: Sim (grande)
CTA: "Link na bio"
```

### Depoimento simulado
```
/video
Tipo: Depoimento
Plataforma: HeyGen
Avatar: Cliente real (foto personalizada)
Roteiro: "Esse produto mudou minha vida..."
Duração: 30 segundos
Legendas: Sim
```

### Tutorial
```
/video
Tipo: Tutorial
Plataforma: Synthesia
Slides: 5 passos
Cada slide: título + texto + imagem
Duração: 2 minutos
Legendas: Sim
```

---

## Integração com outras skills

- **`/audio`** — gerar narração com ElevenLabs
- **`/gerar-imagens`** — thumbnails e imagens de fundo
- **`/carrossel`** — converter vídeo em carrossel
- **`/publicar-tema`** — distribuir em redes sociais
- **`/canvas`** — editar visual do vídeo

---

## Regras

- Sempre perguntar tipo de vídeo antes de escolher plataforma
- Oferecer gerar roteiro se usuário não tiver
- Incluir legendas por padrão
- Gerar thumbnail automaticamente
- Manter versão para cada formato (16:9, 9:16, 1:1)
- Salvar roteiro em `conteudo/roteiros/`

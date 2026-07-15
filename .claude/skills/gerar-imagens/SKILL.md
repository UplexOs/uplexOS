---
name: gerar-imagens
description: >
  Gera imagens com IA usando OpenAI DALL-E 3 e alternativas.
  Para marketing: fotos de produtos, banners, thumbnails, imagens de fundo,
  avatares para vídeos, ilustrações e mais.
  Use quando o usuário disser "/gerar-imagens", "gerar imagem", "foto IA", "DALL-E".
---

# /gerar-imagens — Gerar Imagens com IA

Gera imagens profissionais usando IA para marketing.

## Fluxo

### 1. Identificar tipo de imagem

**"Que tipo de imagem você precisa?"**

Opções:
- [ ] **Foto de produto** — produto em fundo clean
- [ ] **Banner** — para site, redes, ads
- [ ] **Thumbnail** — para vídeo, artigo
- [ ] **Imagem de fundo** — para apresentação, carrossel
- [ ] **Ilustração** — estilo artístico
- [ ] **Avatar** — para vídeo com IA
- [ ] **Logo** — identidade visual
- [ ] **Mockup** — dispositivo com conteúdo
- [ ] **Outro**

### 2. Selecionar ferramenta

#### OpenAI DALL-E 3 (recomendado)
- Melhor qualidade geral
- Segue instruções detalhadas
- Preços: ~$0.04/imagem (1024x1024)
- Ideal para: a maioria dos casos

#### Bing Image Creator (Microsoft Designer)
- Gratuito (com conta Microsoft)
- Baseado em DALL-E 3
- Ideal para: uso casual, testes

#### Midjourney
- Maior qualidade artística
- Via Discord
- Preço: ~$10/mês
- Ideal para: arte, estética premium

#### Leonardo AI
- Qualidade artística
- Modelos personalizáveis
- Preço: ~$9/mês
- Ideal para: arte, ilustrações

#### Stable Diffusion
- Open source
- Local ou API
- Preço: gratuito (self-host)
- Ideal para: controle total

#### Adobe Firefly
- Integrado ao Photoshop
- Comercialmente seguro
- Preço: incluído no Creative Cloud
- Ideal para: edição profissional

### 3. Preparar instruções detalhadas

**Guia para boas instruções:**
- Descrever cena completa
- Especificar estilo visual
- Definir iluminação
- Indicar proporção
- Incluir detalhes de cor

**Exemplo de instrução detalhada:**
> "Professional product photo of a smartphone on a white marble surface, soft studio lighting, modern minimalist composition, 4K quality, commercial photography style"

### 4. Gerar imagem

#### Via DALL-E 3 (scripts/gerar-imagem.js)

```bash
node scripts/gerar-imagem.js \
  --instrucoes "descrição da imagem" \
  --size 1024x1024 \
  --quality hd \
  --style natural \
  --output output.png
```

Suporte a múltiplas variações:
```bash
node scripts/gerar-imagem.js \
  --instrucoes "descrição" \
  --variations 4 \
  --output-dir ./imagens/
```

#### Via Bing/Microsoft Designer
Abrir Microsoft Designer no navegador e gerar via interface.

#### Via Midjourney
Usar comando `/imagine` no Discord do Midjourney.

#### Via Leonardo AI
Usar API ou interface web.

### 5. Processar imagem gerada

**Ações automáticas:**
- [ ] Redimensionar para formato específico
- [ ] Aplicar watermark/logo
- [ ] Otimizar para web (compressão)
- [ ] Gerar versões para diferentes formatos
- [ ] Criar variações (claro/escuro)

### 6. Salvar e organizar

```
imagens/
├── produtos/
├── banners/
├── thumbnails/
├── backgrounds/
├── avatares/
└── ilustacoes/
```

---

## Casos de uso comuns

### Foto de produto
```
/gerar-imagens
Tipo: Foto de produto
Instrução: "Tênis esportivo branco em fundo claro, fotografia profissional de produto"
Formato: 1024x1024
Estilo: Fotografia comercial
```

### Banner para Instagram
```
/gerar-imagens
Tipo: Banner
Instrução: "Banner minimalista para Instagram de cafeteria, tons quentes, café e grãos"
Formato: 1080x1080
Estilo: Moderno, clean
```

### Thumbnail para vídeo
```
/gerar-imagens
Tipo: Thumbnail
Instrução: "Thumbnail vibrante para vídeo de marketing, texto grande, cores fortes"
Formato: 1280x720
Estilo: Chamativo, YouTube
```

### Imagem para carrossel
```
/gerar-imagens
Tipo: Imagem de fundo
Instrução: "Gradiente suave azul e roxo, sem elementos específicos"
Formato: 1080x1350
Estilo: Abstrato, clean
```

### Avatar para vídeo
```
/gerar-imagens
Tipo: Avatar
Instrução: "Retrato profissional de mulher de 30 anos, sorriso, fundo neutro"
Formato: 512x512
Estilo: Fotográfico realista
```

---

## Integração com outras skills

- **`/video`** — imagens para vídeos e avatares
- **`/carrossel`** — imagens de fundo e thumbnails
- **`/canvas`** — edição de imagens geradas
- **`/publicar-tema`** — otimizar para redes sociais
- **`/story`** — imagens para stories (9:16)

---

## Regras

- Sempre perguntar tipo de imagem antes
- Oferecer sugestões de instruções
- Gerar pelo menos 3 variações
- Salvar instrução usada (para reproduzir)
- Otimizar tamanho para destino final
- Nunca gerar imagens com marca d'água visível

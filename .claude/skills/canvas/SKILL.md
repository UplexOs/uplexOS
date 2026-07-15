---
name: canvas
description: >
  Editor visual para criar designs de marketing: carrosséis, stories, reels,
  posts, banners, logos, thumbnails, apresentações e mais.
  Usa Canvas (editor visual) ou Canva para geração.
  Use quando o usuário disser "/canvas", "editor visual", "criar design", "editar".
---

# /canvas — Editor Visual

Editor visual para criar designs de marketing.

## Fluxo

### 1. Identificar tipo de design

**"Que tipo de design você precisa?"**

Opções:
- [ ] **Carrossel** — 3-10 slides (1080x1350)
- [ ] **Story** — 9:16 (1080x1920)
- [ ] **Post** — quadrado (1080x1080)
- [ ] **Banner** — horizontal (1920x1080)
- [ ] **Thumbnail** — YouTube (1280x720)
- [ ] **Logo** — identidade visual
- [ ] **Apresentação** — slides
- [ ] **Flyer/Panfleto** — impresso
- [ ] **Cartão de visita**
- [ ] **Outro**

### 2. Coletar informações

**Perguntas obrigatórias:**
- Conteúdo (texto)
- Cor de fundo
- Imagem (se aplicável)
- Fonte

**Perguntas opcionais:**
- Elementos decorativos
- Logo da marca
- GIF/Sticker
- Efeitos especiais

### 3. Gerar design

#### Via Canvas (recomendado)

Abrir Canvas (editor visual) e gerar design.

```
/canvas
Tipo: Carrossel
Slides: 5
Conteúdo: [texto de cada slide]
Cores: [paleta da marca]
Fonte: Inter
```

#### Via Canva (alternativa)
Abrir Canva no navegador e gerar design.

#### Via Adobe Express
Gerar design com templates prontos.

### 4. Iterar e ajustar

**Opções:**
- [ ] Mudar cor
- [ ] Mudar fonte
- [ ] Mudar layout
- [ ] Adicionar elemento
- [ ] Remover elemento
- [ ] Mudar imagem
- [ ] Exportar

### 5. Exportar

**Formatos disponíveis:**
- [ ] PNG (alta qualidade)
- [ ] JPG (web)
- [ ] PDF (impresso)
- [ ] SVG (vetorial)
- [ ] MP4 (vídeo)

---

## Casos de uso comuns

### Carrossel educacional
```
/canvas
Tipo: Carrossel
Slides: 5
Conteúdo:
  1. Título: "5 dicas para crescer no Instagram"
  2-4. Dicas 1-3
  5. CTA: "Salve este post"
Cores: Paleta da marca
Fonte: Inter Bold
```

### Story promocional
```
/canvas
Tipo: Story
Fundo: Gradiente #6366f1 → #8b5cf6
Texto: "50% OFF hoje!"
Botão: "Comprar agora"
Logo: Marca
```

### Post motivacional
```
/canvas
Tipo: Post
Fundo: Imagem inspiradora
Texto: "O sucesso começa com a decisão de tentar"
Fonte: Serif, 36px
```

### Banner para site
```
/canvas
Tipo: Banner
Tamanho: 1920x1080
Conteúdo: "Bem-vindo à [marca]"
Botão: "Saiba mais"
Imagem: Produto
```

---

## Integração com outras skills

- **`/carrossel`** — carrosséis específicos
- **`/story`** — stories específicos
- **`/reels`** — reels específicos
- **`/gerar-imagens`** — gerar imagens para design
- **`/publicar-tema`** — publicar design

---

## Regras

- Sempre perguntar tipo de design antes
- Oferecer templates prontos
- Respeitar margem segura
- Usar paleta da marca
- Manter consistência visual
- Exportar em formato adequado

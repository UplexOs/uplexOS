---
name: story
description: >
  Gera stories para Instagram com IA. Inclui texto, fotos, GIFs, enquetes, quizzes,
  e vídeos curtos. Formatos 9:16 (1080x1920).
  Use quando o usuário disser "/story", "criar story", "instagram story".
---

# /story — Gerar Story para Instagram

Gera stories profissionais para Instagram.

## Fluxo

### 1. Identificar tipo de story

**"Que tipo de story você quer?"**

Opções:
- [ ] **Texto** — apenas texto com fundo colorido
- [ ] **Foto** — foto com texto
- [ ] **Foto + GIF** — foto com animação/sticker
- [ ] **Enquete** — com pergunta interativa
- [ ] **Quiz** — com opção de resposta
- [ ] **Vídeo** — vídeo curto (até 60s)
- [ ] **Depoimento** — cliente falando
- [ ] **Contagem regressiva** — para lançamento
- [ ] **Múltiplos stories** — sequência temática

### 2. Coletar conteúdo

**Perguntas obrigatórias:**
- Texto do story
- Cor de fundo (ou cor da marca)
- Foto (se aplicável)
- GIF/Stickers (se aplicável)

**Perguntas opcionais:**
- Enquete/Quiz (pergunta + opções)
- Link (link sticker)
- Hashtags
- Menções (@)

### 3. Gerar story

#### Via Canvas (recomendado)

Carregar skill `canvas` para gerar story visual.

```
/story
Tipo: Texto
Fundo: Cor #6366f1
Texto: "Novo lançamento!"
Fonte: Bold, 48px
```

#### Via Canva (alternativa)
Abrir Canva no navegador e gerar story.

#### Via Adobe Express
Gerar story com templates prontos.

### 4. Adicionar elementos interativos

**Elementos disponíveis:**
- [ ] **Enquete** — "Você gosta?" Sim/Não
- [ ] **Quiz** — "Qual a resposta?" A/B/C/D
- [ ] **Slider** — emoji de reação
- [ ] **Quiz** — "Arraste para cá"
- [ ] **Link** — link sticker
- [ ] **Contagem regressiva** — para evento
- [ ] **Música** — sticker de música
- [ ] **Local** — sticker de localização
- [ ] **Menção** — @usuário

### 5. Salvar e publicar

**Opções:**
- [ ] Salvar como rascunho
- [ ] Publicar agora (via Meta API)
- [ ] Agendar para depois
- [ ] Enviar para aprovação

---

## Casos de uso comuns

### Story de lançamento
```
/story
Tipo: Múltiplos stories
Sequência:
  1. "Algo incrível está chegando..." (texto)
  2. Foto do produto
  3. Contagem regressiva (24h)
  4. "Link na bio" com CTA
```

### Story de enquete
```
/story
Tipo: Enquete
Foto: Produto novo
Texto: "Gostaram?"
Enquete: "Sim!" / "Quero mais!"
Fundo: Cor da marca
```

### Story de quiz
```
/story
Tipo: Quiz
Foto: Imagem relacionada
Texto: "Qual a resposta?"
Opções: A) 10  B) 20  C) 30
Resposta: B) 20
```

### Story de depoimento
```
/story
Tipo: Depoimento
Vídeo: Depoimento de cliente (gerar com /video)
Legenda: "Veja o que nossa cliente diz!"
Link: "Quero também"
```

---

## Integração com outras skills

- **`/canvas`** — gerar story visual
- **`/video`** — gerar vídeo para story
- **`/gerar-imagens`** — gerar foto de fundo
- **`/publicar-tema`** — publicar story
- **`/carrossel`** — converter carrossel em story

---

## Regras

- Formato 9:16 (1080x1920)
- Manter margem segura (300px inferior para botões)
- Texto legível (contraste adequado)
- Máximo 2 frases por story
- Usar elementos interativos quando possível
- Incluir CTA quando relevante

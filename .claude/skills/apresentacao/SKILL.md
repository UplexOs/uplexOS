---
name: apresentacao
description: >
  Gera uma apresentação profissional de projeto para apresentar ao cliente.
  Usa TODAS as informações do projeto e da empresa para criar uma narrativa completa:
  problema, solução, features, stack, timeline e proposta de valor.
  Entrega HTML/CSS/JS com slides animados + PDF impresso.
  Use quando o usuário disser "apresentação", "deck", "pitch", "/apresentacao",
  "criar apresentação", "apresentar projeto", "proposta comercial".
---

# /apresentacao — Apresentação Profissional de Projeto

Gera uma apresentação completa e animada para apresentar o projeto ao cliente.

## Dependências

- **Projeto ativo:** `projetos/[nome]/projeto.md` — fonte principal de informações
- **Memória:** `memoria/empresa.md` — contexto da empresa
- **Memória:** `memoria/preferencias.md` — tom de voz
- **Memória:** `memoria/estrategia.md` — objetivos
- **Plano:** `projetos/[nome]/plano.md` — fases e timeline
- **Stack:** `projetos/[nome]/code/` — tecnologias usadas
- **Templates:** `.uplex/templates/marketing/apresentacao/` — base visual

---

## Fluxo

### Passo 0 — Identificar projeto

Se não souber qual projeto:
```bash
ls projetos/
```

> "Em qual projeto você quer criar a apresentação?"

### Passo 1 — Ler contexto completo

Ler em ordem:
1. `projetos/[nome]/projeto.md` — visão, público, features
2. `projetos/[nome]/plano.md` — fases, timeline
3. `memoria/empresa.md` — contexto da empresa
4. `memoria/preferencias.md` — tom de voz
5. `projetos/[nome]/code/` — stack técnica

### Passo 2 — Montar estrutura da apresentação

**Slide 1 — Capa**
- Nome do projeto
- Logo da empresa (se existir)
- Tagline em uma frase
- Data

**Slide 2 — Quem somos**
- Nome da empresa
- O que faz
- Público-alvo
- Diferenciais

**Slide 3 — O problema**
- Problema que o projeto resolve
- Dor do usuário
- Por que existe esse projeto

**Slide 4 — A solução**
- O que é o projeto (1 frase)
- Para quem
- Plataformas (web, mobile, desktop)

**Slide 5 — Features**
- Must-have (essenciais)
- Should-have (importantes)
- Could-have (desejáveis)

**Slide 6 — Funcionalidades principais**
- Detalhar as 3-5 features mais importantes
- Com descrição breve

**Slide 7 — Stack técnica**
- Frontend: [tecnologias]
- Backend: [tecnologias]
- Database: [tecnologia]
- Infraestrutura: [hospedagem]

**Slide 8 — Arquitetura**
- Diagrama simplificado
- Como os componentes se conectam

**Slide 9 — Wireframes / Fluxos**
- Telas principais (se existir)
- Fluxo do usuário

**Slide 10 — Timeline**
- Fase 1 (MVP): [datas]
- Fase 2 (Expansão): [datas]
- Fase 3 (Polish): [datas]

**Slide 11 — Investimento**
- Orçamento estimado
- Custos mensais (hospedagem, domínios, etc)
- Retorno esperado

**Slide 12 — Próximos passos**
- O que fazer agora
- Contato
- Link para protótipo (se existir)

### Passo 3 — Gerar HTML/CSS/JS

Criar apresentação com:
- **HTML semântico** com slides
- **CSS moderno** com animações suaves
- **JavaScript vanilla** para navegação (setas do teclado, cliques)
- **Transições** entre slides
- **Design responsivo** (funciona em notebook, tablet, celular)
- **Profissional** — cores da empresa, tipografia moderna

**Template base:**
```
apresentacao/
├── index.html          # Apresentação completa
├── styles.css          # Estilos com animações
├── script.js           # Navegação e interatividade
└── assets/
    └── logo.png        # Logo da empresa (se existir)
```

### Passo 4 — Gerar PDF

Usar o navegador para imprimir o HTML como PDF:
```bash
npx playwright screenshot index.html --full-page apresentacao.pdf
```

Ou instruir o usuário a usar Ctrl+P → "Salvar como PDF".

### Passo 5 — Salvar e organizar

```
projetos/[nome]/apresentacoes/
├── 2026-07-04-apresentacao-cliente/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── assets/
│   └── apresentacao.pdf
```

---

## Template HTML base

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Nome do Projeto] — Apresentação</title>
    <link href="styles.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="presentation" id="presentation">

        <!-- Slide 1: Capa -->
        <section class="slide" data-slide="1">
            <div class="slide-content">
                <div class="slide-tag">PROPOSTA DE PROJETO</div>
                <h1>[Nome do Projeto]</h1>
                <p class="tagline">[Tagline em uma frase]</p>
                <div class="slide-footer">
                    <span class="company">[Nome da Empresa]</span>
                    <span class="date">[Data]</span>
                </div>
            </div>
        </section>

        <!-- Slide 2: Quem Somos -->
        <section class="slide" data-slide="2">
            <div class="slide-content">
                <div class="slide-tag">QUEM SOMOS</div>
                <h1>[Nome da Empresa]</h1>
                <p class="description">[Descrição do negócio]</p>
                <div class="info-grid">
                    <div class="info-card">
                        <span class="info-label">PÚBLICO</span>
                        <span class="info-value">[público]</span>
                    </div>
                    <div class="info-card">
                        <span class="info-label">DIFERENCIAIS</span>
                        <span class="info-value">[diferenciais]</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Slide 3: Problema -->
        <section class="slide" data-slide="3">
            <div class="slide-content">
                <div class="slide-tag">O PROBLEMA</div>
                <h1>O que estamos resolvendo</h1>
                <p class="problem">[Descrição do problema]</p>
                <div class="pain-points">
                    <div class="pain-point">[dor 1]</div>
                    <div class="pain-point">[dor 2]</div>
                    <div class="pain-point">[dor 3]</div>
                </div>
            </div>
        </section>

        <!-- Slide 4: Solução -->
        <section class="slide" data-slide="4">
            <div class="slide-content">
                <div class="slide-tag">A SOLUÇÃO</div>
                <h1>[Nome do Projeto]</h1>
                <p class="solution">[Descrição da solução]</p>
                <div class="solution-features">
                    <div class="feature">✅ [feature 1]</div>
                    <div class="feature">✅ [feature 2]</div>
                    <div class="feature">✅ [feature 3]</div>
                </div>
            </div>
        </section>

        <!-- Slide 5: Features -->
        <section class="slide" data-slide="5">
            <div class="slide-content">
                <div class="slide-tag">FUNCIONALIDADES</div>
                <h1>O que o sistema terá</h1>
                <div class="features-grid">
                    <div class="feature-card">
                        <span class="feature-badge">ESSENCIAL</span>
                        <h3>[feature 1]</h3>
                        <p>[descrição]</p>
                    </div>
                    <div class="feature-card">
                        <span class="feature-badge">ESSENCIAL</span>
                        <h3>[feature 2]</h3>
                        <p>[descrição]</p>
                    </div>
                    <div class="feature-card">
                        <span class="feature-badge">IMPORTANTE</span>
                        <h3>[feature 3]</h3>
                        <p>[descrição]</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Slide 6: Stack -->
        <section class="slide" data-slide="6">
            <div class="slide-content">
                <div class="slide-tag">TECNOLOGIAS</div>
                <h1>Stack técnica</h1>
                <div class="stack-grid">
                    <div class="stack-category">
                        <h3>FRONTEND</h3>
                        <div class="stack-items">[tecnologias frontend]</div>
                    </div>
                    <div class="stack-category">
                        <h3>BACKEND</h3>
                        <div class="stack-items">[tecnologias backend]</div>
                    </div>
                    <div class="stack-category">
                        <h3>BASE DE DADOS</h3>
                        <div class="stack-items">[tecnologia]</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Slide 7: Timeline -->
        <section class="slide" data-slide="7">
            <div class="slide-content">
                <div class="slide-tag">CRONOGRAMA</div>
                <h1>Fases de desenvolvimento</h1>
                <div class="timeline">
                    <div class="timeline-item">
                        <span class="timeline-phase">FASE 1</span>
                        <span class="timeline-title">MVP</span>
                        <span class="timeline-date">[Datas]</span>
                        <p>[Descrição]</p>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-phase">FASE 2</span>
                        <span class="timeline-title">EXPANSÃO</span>
                        <span class="timeline-date">[Datas]</span>
                        <p>[Descrição]</p>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-phase">FASE 3</span>
                        <span class="timeline-title">POLISH</span>
                        <span class="timeline-date">[Datas]</span>
                        <p>[Descrição]</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Slide 8: Investimento -->
        <section class="slide" data-slide="8">
            <div class="slide-content">
                <div class="slide-tag">INVESTIMENTO</div>
                <h1>Orçamento estimado</h1>
                <div class="cost-breakdown">
                    <div class="cost-row">
                        <span>Desenvolvimento</span>
                        <span>R$ [valor]</span>
                    </div>
                    <div class="cost-row">
                        <span>Hospedagem (mensal)</span>
                        <span>R$ [valor]</span>
                    </div>
                    <div class="cost-row">
                        <span>Dominio</span>
                        <span>R$ [valor]/ano</span>
                    </div>
                    <div class="cost-row total">
                        <span>TOTAL ESTIMADO</span>
                        <span>R$ [total]</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Slide 9: Próximos passos -->
        <section class="slide" data-slide="9">
            <div class="slide-content">
                <div class="slide-tag">PRÓXIMOS PASSOS</div>
                <h1>Vamos começar?</h1>
                <div class="next-steps">
                    <div class="step">1. Aprovar proposta</div>
                    <div class="step">2. Iniciar Fase 1 (MVP)</div>
                    <div class="step">3. Desenvolvimento e entregas semanais</div>
                    <div class="step">4. Testes e ajustes</div>
                    <div class="step">5. Deploy e lançamento!</div>
                </div>
                <div class="contact">
                    <p>[Contato da empresa]</p>
                    <p>[Website]</p>
                </div>
            </div>
        </section>

        <!-- Slide 10: Obrigada -->
        <section class="slide" data-slide="10">
            <div class="slide-content">
                <h1>Obrigado!</h1>
                <p>[Nome da Empresa]</p>
                <p>[Contato]</p>
            </div>
        </section>

    </div>

    <!-- Navegação -->
    <div class="navigation">
        <button class="nav-btn" id="prev-btn" onclick="prevSlide()">←</button>
        <div class="slide-counter" id="counter">1 / 10</div>
        <button class="nav-btn" id="next-btn" onclick="nextSlide()">→</button>
    </div>

    <!-- Indicadores -->
    <div class="indicators" id="indicators"></div>

    <!-- Controles -->
    <div class="controls">
        <button class="control-btn" onclick="toggleFullscreen()">⛶ Tela cheia</button>
        <button class="control-btn" onclick="printPresentation()">🖨️ Imprimir PDF</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

---

## Template CSS base

```css
:root {
    --bg-primary: #0a0a0a;
    --bg-secondary: #111111;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --accent: #6366f1;
    --accent-light: #818cf8;
    --border: rgba(255, 255, 255, 0.1);
    --font: 'Inter', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: var(--font);
    background: var(--bg-primary);
    color: var(--text-primary);
    overflow: hidden;
}

.presentation {
    height: 100vh;
    width: 100vw;
}

.slide {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.5s ease, transform 0.5s ease;
    transform: scale(0.95);
}

.slide.active {
    opacity: 1;
    transform: scale(1);
}

.slide-content {
    max-width: 1100px;
    padding: 80px;
    animation: fadeInUp 0.6s ease;
}

.slide-tag {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.3em;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 24px;
}

h1 {
    font-size: 64px;
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 24px;
}

.tagline {
    font-size: 24px;
    font-weight: 400;
    color: var(--text-secondary);
    margin-bottom: 40px;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-top: 40px;
}

.info-card {
    padding: 24px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--bg-secondary);
}

.info-label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: var(--accent);
    margin-bottom: 8px;
}

.info-value {
    font-size: 18px;
    font-weight: 500;
}

/* Animações */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Navegação */
.navigation {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 24px;
}

.nav-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s;
}

.nav-btn:hover {
    background: var(--accent);
    border-color: var(--accent);
}

.slide-counter {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
}

.controls {
    position: fixed;
    top: 24px;
    right: 24px;
    display: flex;
    gap: 12px;
}

.control-btn {
    padding: 10px 16px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
}

.control-btn:hover {
    background: var(--accent);
    border-color: var(--accent);
}

/* Print styles */
@media print {
    .slide {
        opacity: 1;
        position: relative;
        page-break-after: always;
        transform: none;
        height: 100vh;
    }

    .navigation,
    .controls,
    .indicators {
        display: none;
    }
}
```

---

## Template JS base

```javascript
let currentSlide = 1;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const counter = document.getElementById('counter');
const indicators = document.getElementById('indicators');

// Criar indicadores
for (let i = 1; i <= totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'indicator';
    dot.dataset.slide = i;
    dot.onclick = () => goToSlide(i);
    indicators.appendChild(dot);
}

function updateSlide() {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide - 1].classList.add('active');
    counter.textContent = `${currentSlide} / ${totalSlides}`;
    document.querySelectorAll('.indicator').forEach(dot => {
        dot.classList.toggle('active', parseInt(dot.dataset.slide) === currentSlide);
    });
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlide();
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlide();
    }
}

function goToSlide(n) {
    currentSlide = n;
    updateSlide();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function printPresentation() {
    window.print();
}

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
    } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(1);
    } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides);
    } else if (e.key === 'Escape') {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
});

// Touch support
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
    }
});

// Iniciar
updateSlide();
```

---

## Output

```
╔══════════════════════════════════════════════════════════════════════╗
║           APRESENTAÇÃO GERADA                                ║
╚══════════════════════════════════════════════════════════════════════╝

📁 Local: projetos/[nome]/apresentacoes/[data]/

📄 Entregáveis:
  ✅ index.html — Apresentação interativa (abra no navegador)
  ✅ styles.css — Estilos com animações
  ✅ script.js — Navegação (setas, clique, touch)
  ✅ apresentacao.pdf — Versão impressa

🎮 Como usar:
  1. Abra index.html no navegador
  2. Use ← → para navegar
  3. Clique em "Tela cheia" para apresentação
  4. Clique em "Imprimir PDF" para gerar PDF

📱 Recursos:
  - Navegação por teclado (← →)
  - Navegação por toque (swipe)
  - Tela cheia (F11)
  - Impressão PDF nativa
  - Design responsivo
  - Animações suaves
```

---

## Regras

- Sempre ler TODA a documentação do projeto antes de gerar
- Usar informações reais (nunca inventar features ou números)
- Seguir tom de voz de `_memoria/preferencias.md`
- Incluir logo da empresa se disponível
- Gerar slides com animações (fade, slide, scale)
- Sempre oferecer PDF além do HTML
- Se projeto não tiver dados suficientes, perguntar antes de gerar

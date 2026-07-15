<div align="center">
  <img src="https://i.postimg.cc/5tSRpc9y/logo-uplex.png" alt="Uplex Academy Logo" width="280"/>
  <h1>Uplex Academy — Currículo Oficial</h1>
  <p><i>A esteira definitiva para transformar programadores em donos de Software House escalável.</i></p>
</div>

<br><hr><br>

## 🚀 Trilha 1: Uplex (Iniciante)
**Objetivo:** Sair do zero com 1 sistema publicado e 1 cliente ou lead qualificado. A porta de entrada.

<div align="center">
  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Equipe inicial" width="800" style="border-radius: 10px;"/>
</div>

### Módulo 1 — A Fundação (Como as coisas funcionam)
Entenda a arquitetura base para não se perder.
- **Baixando o Uplex:** Instalação do CLI, clonagem da "mágica" na sua máquina.
- **Contas Necessárias:** GitHub (para código), Vercel (para deploy) e Clerk (para Auth).
- **O que é VPS e Domínio:** A analogia perfeita — a VPS é o terreno, o Domínio é o endereço, o Uplex é a construtora.
- **Instalando Recursos:** Setup de Node.js, VS Code e extensões obrigatórias.

### Módulo 2 — Dominando o UplexOS
Operando a Inteligência como CEO.
- **O Handoff Contínuo:** Como fazer o Arquiteto, o Designer e o Front-end trabalharem em sequência sem quebrar o código.
- **Editando Projetos:** A estrutura de pastas `_projetos/` e como enviar alterações (diffs).
- **Tratamento de Erros:** O que fazer quando a tela ficar vermelha. Chamando o `/qa-engineer`.
- **Setup de Marketing:** Usando a IA para gerar copys e prompts de imagens para anúncios.

### Módulo 3 — Mão na Massa (Primeiro Projeto)
Construindo a primeira Landing Page ou MVP de alto nível.
- **Entrevista de Produto:** Iniciando o escopo com o `./onboarding.sh`.
- **A Mágica do Design System:** Injetando animações suaves (Framer Motion) e rolagem fluída (Lenis).
- **A Copy Vencedora:** Substituindo Lorem Ipsum por textos que vendem (Voice & Tone Engine).
- **Segurança (AppSec):** Auditando as chaves `.env` antes do mundo ver.
- **Deploy Online:** Colocando o projeto no ar na Vercel em 1 clique.

### Módulo 4 — Infraestrutura de Servidor
Porque "Serverless" não resolve tudo.
- **O porquê de um servidor:** Quando sair da Vercel e ir para uma VPS (DigitalOcean/Hetzner).
- **Setup Inicial (Linux/Node):** Comandos essenciais para subir um backend contínuo.
- **Conexão com Discord:** Como enviar alertas de erro e novas vendas para um canal no seu Discord.

### Módulo 5 e 6 — O Primeiro Cliente & Marketing
Desenvolvimento sem venda é apenas hobby.
- **A Prospecção Fria:** Como abordar clientes no Instagram usando o "Projeto Isca".
- **Fechamento e Pagamento:** Enviando links de cobrança e formalizando contratos.
- **Mapeamento de Nichos:** Como escolher mercados dispostos a pagar R$ 2.000+ em um sistema.

<br><hr><br>

## 📈 Trilha 2: Uplex Senior (Multiplicação)
**Objetivo:** Você já tem clientes, mas está ficando sem tempo. Foco em automação, Boilerplates e escalar as vendas.

<div align="center">
  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Dashboard e Escala" width="800" style="border-radius: 10px;"/>
</div>

### Módulo 1 — Organizando a Operação
Não deixe o servidor cair na Black Friday do seu cliente.
- **Gestão de múltiplos clientes:** Como rodar vários sistemas na mesma VPS isolando processos (PM2 / Nginx).
- **Migração Dedicada:** Transferindo clientes pesados para máquinas exclusivas.
- **Rotinas de Backup:** Configurando scripts automáticos para nunca perder o banco de dados.

### Módulo 2 — Boilerplates (Processo Repetível)
O fim da "tela em branco" a cada novo contrato.
- **Criação de Templates:** Usando o `create_boilerplate.sh` para clonar seu melhor site, limpar dados e revender.
- **Precificação por Pacote:** A transição de "cobrar por hora" para cobrar por "Ecossistema Digital Entregue".
- **Contratos Padronizados:** Como se proteger juridicamente ao entregar código rápido.

### Módulo 3 — Pós-Venda e Retenção
Vendendo de novo para quem já comprou.
- **Onboarding do Cliente:** Como entregar o painel administrativo para o dono da loja não te incomodar no WhatsApp.
- **Venda de Manutenção Mensal:** Criando receita recorrente com relatórios automatizados de Analytics.
- **Upsell:** Vendendo automações para clientes que já compraram seu site.

### Módulo 4 — Automação de Aquisição (Evolution API)
Seu Robô SDR. Pare de fazer prospecção manual.
- **Infraestrutura WhatsApp:** Subindo o Docker da Evolution API na sua VPS.
- **O Robô de Atendimento:** Conectando o Zap ao UplexOS para responder leads em 3 segundos.
- **Qualificação:** Script validado para separar curiosos de compradores de High-Ticket.

<br><hr><br>

## 🏢 Trilha 3: Uplex Enterprise (SaaS B2B)
**Objetivo:** Sustentar a empresa em alta escala. Arquitetura pesada, processos maduros e lançamento de Produto Próprio (SaaS) cobrando MRR.

<div align="center">
  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Data Center e Infra Enterprise" width="800" style="border-radius: 10px;"/>
</div>

### Módulo 1 — Arquitetura Multi-Tenant
Centenas de empresas rodando no mesmo código. Dados perfeitamente separados.
- **O que é Multi-Tenant:** Um painel genérico servindo infinitos clientes com bancos de dados isolados.
- **Row Level Security (RLS):** Configurando segurança nível PostgreSQL (Supabase) para o cliente A nunca ver a tela do cliente B.
- **Subdomínios Dinâmicos:** Interceptando rotas com Next.js Middleware (ex: `cliente1.seuSaaS.com`).

### Módulo 2 — O Motor Financeiro (Billing & Stripe)
Automatize quem paga e bloqueie quem não paga.
- **Assinaturas Recorrentes:** Implementando o Stripe Billing para faturar todo mês em automático.
- **Paywalls Dinâmicos:** Cortando o acesso de usuários inadimplentes usando verificações nas Server Actions.
- **Clerk B2B (Organizations):** Permitindo que o seu cliente convide os próprios funcionários dele para o painel.

### Módulo 3 — Infraestrutura Pesada
Para aguentar o tranco quando você tiver 10.000 acessos simultâneos.
- **Filas Assíncronas (BullMQ/Redis):** Processamento em background pesado (Geração de relatórios PDF, disparos de email em massa).
- **Caching (Redis/Edge):** Evitando que o banco de dados queime dinheiro na AWS fazendo consultas desnecessárias.
- **Segurança Enterprise:** Conformidade profunda, logs de auditoria (DPO) e LGPD compliance.

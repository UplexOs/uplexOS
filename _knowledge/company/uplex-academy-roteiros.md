# Uplex Academy: O Roteiro de Gravação Oficial

Este documento contém a estrutura detalhada para a gravação do seu InfoProduto (Uplex Academy). Ele está formatado para você abrir, ler e gravar cada aula seguindo o funil exato que desenhamos.

---

# NÍVEL 1: UPLEX INICIANTE (A Porta de Entrada)
**Objetivo do Aluno:** Não sabe nada. Quer ter o primeiro site no ar e conseguir o primeiro cliente para provar que a UplexOS funciona.

## Módulo 1: Como funcionam as coisas (Fundação)
- **Aula 1: Baixando o UplexOS.** (Mostre a tela, instale o CLI, mostre a pasta mágica sendo criada no computador).
- **Aula 2: Contas necessárias.** (Criando conta no GitHub, Vercel e Clerk).
- **Aula 3: O que é VPS e Domínio?** (Explicar de forma lúdica: "A VPS é o terreno, o Domínio é o endereço, o Uplex é a construtora").
- **Aula 4: Instalando Recursos Base.** (Mostrando o VS Code e Node.js de forma rápida).

## Módulo 2: O Sistema Operacional (UplexOS)
- **Aula 1: O Handoff Contínuo.** (A aula de ouro. Mostre a timeline trabalhando. Mostre que ele não precisa codar, ele precisa atuar como Diretor de Produto).
- **Aula 2: Como editar projetos gerados.** (Onde os arquivos ficam salvos, como pedir pro UI Designer mudar a cor).
- **Aula 3: Tratamento de Erros.** (O que fazer quando o terminal ficar vermelho? Como chamar o QA Engineer).
- **Aula 4: Setup de Marketing.** (Visão geral de como a Uplex não faz só site, faz copy e assets de ads).

## Módulo 3: Mão na Massa (Primeiro Projeto)
- **Aula 1: Entrevista com o Product Manager.** (Rodando o comando "uplex create" na prática).
- **Aula 2: A Mágica do Design System.** (Mostrando o Framer Motion e o Lenis Scroll em ação).
- **Aula 3: A Copy Vencedora.** (Por que a UplexOS não usa Lorem Ipsum e como ela cria objeções e FAQ sozinha).
- **Aula 4: Auditoria de Segurança.** (Mostrando a blindagem OWASP).
- **Aula 5: Colocando Online.** (O deploy pra Vercel com um clique).

## Módulo 4: Ganhando Dinheiro (O Primeiro Cliente)
- **Aula 1: O Perfil do Cliente Inicial.** (Pequenos negócios: Restaurantes, Dentistas, Barbearias).
- **Aula 2: A Prospecção Fria (Cold Outreach).** (Como mandar a primeira mensagem no Instagram sem parecer chato).
- **Aula 3: O "Projeto Isca".** (Como gerar a tela do cliente no UplexOS *antes* de vender e mandar o link da Vercel pra ele: "Olha como ficou o seu site").
- **Aula 4: Fechamento e Pagamento.** (Como enviar a cobrança).

---

# NÍVEL 2: UPLEX SENIOR (Multiplicação de Faturamento)
**Objetivo do Aluno:** Já conseguiu 3 a 5 clientes. Está ficando louco com mensagens no WhatsApp. Precisa automatizar e escalar.

## Módulo 1: Escalando a Operação (Infra)
- **Aula 1: Gerenciando múltiplos clientes na mesma VPS.** (Apresentando o PM2 e Nginx).
- **Aula 2: Monitoramento.** (Como saber se o site do cliente 1 caiu sem ele te xingar no WhatsApp. Alertas do UptimeRobot no Discord).
- **Aula 3: Backups.** (A rotina de salvação).

## Módulo 2: Criação de Boilerplates (Produtos Repetíveis)
- **Aula 1: O fim da tela em branco.** (Como pegar um projeto que deu certo na UplexOS e transformar em um "Template Padrão" seu).
- **Aula 2: Precificação por Pacote.** (Pare de cobrar R$ 500 por site. Cobre R$ 3.000 pelo "Ecossistema Digital").
- **Aula 3: Contratos Comerciais.** (Como enviar uma proposta irrecusável).

## Módulo 3: Automação de Aquisição (Robô SDR)
- **Aula 1: Evolution API (A Joia da Coroa).** (Subindo o Docker da Evolution API na VPS).
- **Aula 2: O Robô de Atendimento.** (Conectando o formulário da UplexOS no seu WhatsApp para responder clientes em 3 segundos).
- **Aula 3: Funil de Vendas Automático.** (Saindo do 1 a 1 e vendendo em escala).

---

# NÍVEL 3: UPLEX ENTERPRISE (SaaS e MRR)
**Objetivo do Aluno:** Quer faturar alto ($10k+). Sair do modelo de "Agência de Projetos" e criar um "SaaS (Produto Próprio)" cobrando mensalidade.

## Módulo 1: Arquitetura Multi-Tenant
- **Aula 1: O que é Multi-Tenant?** (Um código, um banco, centenas de empresas isoladas).
- **Aula 2: Segurança nível PostgreSQL.** (Implementando Row Level Security - RLS no Supabase para isolar dados de clientes).
- **Aula 3: Subdomínios Dinâmicos.** (Interceptando requisições no Next.js Middleware. `empresaA.site.com`).

## Módulo 2: O Motor Financeiro (Billing)
- **Aula 1: Stripe subscriptions.** (Configurando assinaturas recorrentes para os clientes pagarem todo mês).
- **Aula 2: Paywalls automáticos.** (Como usar a UplexOS para bloquear o painel do cliente caso o cartão dele recuse).
- **Aula 3: Clerk Organizations.** (B2B Authentication. Deixando o cliente convidar os próprios funcionários dele pro painel).

## Módulo 3: Infraestrutura Pesada
- **Aula 1: Redis & BullMQ.** (Filas assíncronas para o sistema não cair quando 100 clientes puxarem relatórios ao mesmo tempo).
- **Aula 2: Compliance e LGPD.** (Criptografia e adequação corporativa).

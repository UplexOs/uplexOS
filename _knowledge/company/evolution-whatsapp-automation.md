# Roteiro: Aula de Automatização de Primeiro Contato (WhatsApp via Evolution API)

**Módulo:** 4 (Uplex Senior) - Escalando aquisição de clientes
**Tema:** Automatizando o primeiro contato via WhatsApp
**Objetivo da Aula:** Ensinar o aluno a parar de fazer prospecção 1-a-1 na mão e montar uma máquina de primeiro contato que qualifica o lead antes de passar para o atendimento humano.

---

## Parte 1: O Conceito (Por que automatizar?)
- A matemática da prospecção: Quantos contatos você precisa fazer para fechar 1 projeto?
- O gargalo do vendedor: Se você codifica, você não tem tempo de ficar no WhatsApp o dia inteiro.
- A solução: Evolution API. Uma ferramenta open-source que transforma o seu WhatsApp em uma API conectável ao UplexOS ou ferramentas de automação (n8n, Typebot).

## Parte 2: A Infraestrutura (Subindo a Evolution API)
*Demonstração prática de tela*
- Explicar brevemente o que é Docker e por que usaremos ele para subir a API.
- Subindo o container da Evolution API na VPS do aluno.
- Gerando a Global API Key e pareando o QR Code com o WhatsApp Business da agência do aluno.

## Parte 3: O Fluxo de Automação (O "Robô SDR")
*Montando a arquitetura lógica do fluxo*
1. **Gatilho (Trigger):** O cliente preenche um formulário na Landing Page (criada no Nível 1) ou manda uma palavra-chave no Instagram ("QUERO SITE").
2. **Qualificação Básica:** O robô envia a primeira mensagem (ex: "Olá [Nome]! Vi que você tem interesse em modernizar seu negócio. Para eu te direcionar melhor, qual é o seu nicho? 1- Serviços, 2- Lojas/Produtos, 3- Especialista/Infoproduto").
3. **Escalonamento:** Dependendo da resposta, o robô manda um link de um projeto pré-criado no UplexOS (o "Boilerplate") como exemplo do que ele pode ter.
4. **Handoff para Humano:** Se o lead interagir com o link, o robô marca a tag "Hot Lead" no CRM e envia uma notificação no Discord do aluno. Só então o aluno pega o celular para fechar a venda.

## Parte 4: Integração com o UplexOS (A Mágica)
- Como usar o `backend-engineer` do UplexOS para criar uma *Server Action* no Next.js que dispara uma mensagem no WhatsApp do cliente assim que ele assina o contrato ou paga a fatura no Stripe.
- Criando a rota de Webhook para receber respostas do cliente direto no painel administrativo do aluno.

## Parte 5: Regras de Ouro (Anti-Ban)
- Como aquecer um chip novo.
- A diferença entre WhatsApp Pessoal e WhatsApp Business API oficial vs Evolution API.
- Spintax (variar as saudações: "Oi", "Olá", "Tudo bem?") e delays humanos (esperar 3 a 5 segundos antes de mandar mensagem, simulando digitação).

---
**Material Complementar (Entregáveis da Aula):**
- Arquivo `docker-compose.yml` da Evolution API mastigado.
- Snippet de código Node.js/Next.js para enviar mensagem de texto.
- Template de Funil de Qualificação (Copy validada).

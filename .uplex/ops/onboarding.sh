#!/bin/bash

# UplexOS - Initializer & Client Onboarding CLI
# Este script conduz uma entrevista interativa e gera a base de conhecimento estruturada do cliente e do projeto.

# Definição de Cores para o Terminal (Estilo Corporativo)
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

clear
echo -e "${CYAN}"
echo "========================================================="
echo "   _   _       _           ___  ____"
echo "  | | | |_ __ | | _____  _/ _ \/ ___|"
echo "  | | | | '_ \| |/ _ \ \/ / | | \___ \ "
echo "  | |_| | |_) | |  __/>  <| |_| |___) |"
echo "   \___/| .__/|_|\___/_/\_\___/|____/"
echo "        |_|                           "
echo "  A u t o n o m o u s   W o r k f l o w   E n g i n e"
echo "========================================================="
echo -e "${NC}"
echo -e "${GREEN}[SYSTEM] Initializing Product Manager Protocol...${NC}\n"

# Função para pausar
pause() {
  read -p "Pressione [Enter] para continuar..."
}

# Coleta de Dados da Empresa (Client)
echo -e "${YELLOW}--- FASE 1: PERFIL DO CLIENTE ---${NC}"
read -p "Nome da Empresa / Cliente: " client_name
read -p "Nicho de Mercado (ex: Clínica, SaaS, E-commerce): " client_niche
read -p "Principal Dor a Resolver (O problema): " client_pain
read -p "Público Alvo (Perfil do usuário final): " client_audience

# Coleta de Dados do Projeto (Software)
echo -e "\n${YELLOW}--- FASE 2: ESCOPO DO SOFTWARE ---${NC}"
read -p "Nome de Código do Projeto (sem espaços, ex: app-clinica): " project_slug
read -p "Objetivo Principal do Software: " project_goal

echo -e "\n${CYAN}Selecione o TIER de Arquitetura:${NC}"
echo "  1 - TIER 1 (MVP Rápido, Landing Pages, Portfólios)"
echo "  2 - TIER 2 (Startup, Dashboards, Interações complexas, Bancos de Dados)"
echo "  3 - TIER 3 (Enterprise, Bancos Isolados, Conformidade LGPD/PCI)"
read -p "Opção [1/2/3]: " project_tier_option

case $project_tier_option in
  1) project_tier="TIER 1 (MVP Mode)" ;;
  2) project_tier="TIER 2 (Startup Mode)" ;;
  3) project_tier="TIER 3 (Enterprise Mode)" ;;
  *) project_tier="TIER 1 (MVP Mode)" ;;
esac

# Processamento e Geração dos Arquivos
echo -e "\n${GREEN}[SYSTEM] Processando dados e orquestrando ambiente...${NC}"

# 1. Cria a pasta do cliente na base de conhecimento
mkdir -p _knowledge/clients
CLIENT_SLUG=$(echo "$client_name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
CLIENT_FILE="_knowledge/clients/${CLIENT_SLUG}.md"

cat << MARKDOWN > "$CLIENT_FILE"
# Dossiê do Cliente: $client_name

## 1. Identidade e Negócio
- **Nome:** $client_name
- **Nicho:** $client_niche
- **Problema Principal (Dor):** $client_pain

## 2. Público e Posicionamento
- **Público Alvo:** $client_audience

## 3. Histórico de Projetos
- $project_slug ($project_tier)
MARKDOWN

# 2. Cria a pasta do projeto
PROJECT_DIR="_projetos/$project_slug"
mkdir -p "$PROJECT_DIR/contexto"
mkdir -p "$PROJECT_DIR/code"
mkdir -p "$PROJECT_DIR/marketing"

# 3. Gera o Escopo do Projeto (projeto.md)
cat << MARKDOWN > "$PROJECT_DIR/projeto.md"
# Project Scope: $project_slug

## 1. Visão Geral
- **Cliente:** $client_name
- **Tier de Operação:** $project_tier
- **Objetivo Central:** $project_goal

## 2. Diretrizes Arquiteturais
*(A ser preenchido pelo Software Architect)*
- **Frontend:** Next.js 15, Tailwind v4
- **Backend:** [A Definir]
- **Banco de Dados:** [A Definir]

## 3. Funcionalidades (MVP)
*(A ser expandido pelo Product Manager)*
1. [Funcionalidade 1]
2. [Funcionalidade 2]
MARKDOWN

# 4. Gera a Máquina de Estados Inicial
cat << JSON > "$PROJECT_DIR/contexto/estado.json"
{
  "project_name": "$project_slug",
  "client": "$client_name",
  "tier": "$project_tier",
  "fase_atual": "onboarding_concluido",
  "proxima_fase": "planejamento_arquitetural",
  "agente_requerido": "software-architect",
  "status_seguranca": "pendente",
  "data_inicio": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
JSON

echo -e "${CYAN}=========================================================${NC}"
echo -e "${GREEN}✓ ONBOARDING CONCLUÍDO COM SUCESSO!${NC}"
echo -e "Dossiê do Cliente gerado em: ${YELLOW}$CLIENT_FILE${NC}"
echo -e "Escopo do Projeto inicializado em: ${YELLOW}$PROJECT_DIR/projeto.md${NC}"
echo -e "Máquina de Estados criada em: ${YELLOW}$PROJECT_DIR/contexto/estado.json${NC}"
echo -e "\nPróximo Passo: Solicite a intervenção do ${CYAN}/software-architect${NC} para desenhar o plano técnico."
echo -e "${CYAN}=========================================================${NC}"

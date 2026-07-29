#!/bin/bash

# UplexOS - wrapper legado de onboarding
# A CLI Node é a fonte única para criação de projetos e estado.

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

# 2. Cria o projeto pelo runtime canônico
case $project_tier_option in
  2) runtime_tier="startup" ;;
  3) runtime_tier="enterprise" ;;
  *) runtime_tier="mvp" ;;
esac

node .uplex/cli/uplex.mjs init "$project_slug" --tier "$runtime_tier" --client "$client_name" --goal "$project_goal" || exit 1
PROJECT_DIR="_projetos/$project_slug"

echo -e "${CYAN}=========================================================${NC}"
echo -e "${GREEN}✓ ONBOARDING CONCLUÍDO COM SUCESSO!${NC}"
echo -e "Dossiê do Cliente gerado em: ${YELLOW}$CLIENT_FILE${NC}"
echo -e "Escopo do Projeto inicializado em: ${YELLOW}$PROJECT_DIR/projeto.md${NC}"
echo -e "Máquina de Estados criada em: ${YELLOW}$PROJECT_DIR/contexto/estado.json${NC}"
echo -e "\nPróximo passo: descreva em linguagem natural o que deseja construir."
echo -e "${CYAN}=========================================================${NC}"

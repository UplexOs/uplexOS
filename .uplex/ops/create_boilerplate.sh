#!/bin/bash

# UplexOS - Boilerplate Maker Engine
# Extrai um projeto pronto, limpa dados sensíveis e o salva como um template reutilizável.

set -e

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Uso: ./create_boilerplate.sh <nome_do_projeto_origem> <nome_do_boilerplate_destino>"
  echo "Exemplo: ./create_boilerplate.sh uplex-academy-web SaaS-Billing-Template"
  exit 1
fi

SOURCE_DIR="_projetos/$1"
DEST_DIR="_knowledge/boilerplates/$2"

echo "=========================================="
echo "🏢 UplexOS Boilerplate Maker"
echo "Origem: $SOURCE_DIR"
echo "Destino: $DEST_DIR"
echo "=========================================="

if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ Erro: Projeto de origem '$SOURCE_DIR' não encontrado."
  exit 1
fi

if [ -d "$DEST_DIR" ]; then
  echo "⚠️ Aviso: Boilerplate '$2' já existe. Sobrescrevendo..."
  rm -rf "$DEST_DIR"
fi

echo "📦 1/3 Copiando arquivos base..."
mkdir -p "$DEST_DIR"
cp -r "$SOURCE_DIR/"* "$DEST_DIR/"

echo "🧹 2/3 Executando rotina de limpeza de dados sensíveis (Sanitization)..."
# Remove pastas desnecessárias ou que contém cache/build
find "$DEST_DIR" -type d -name "node_modules" -exec rm -rf {} + 2>/dev/null || true
find "$DEST_DIR" -type d -name ".next" -exec rm -rf {} + 2>/dev/null || true
find "$DEST_DIR" -type d -name "dist" -exec rm -rf {} + 2>/dev/null || true
find "$DEST_DIR" -type d -name ".env*" -exec rm -f {} + 2>/dev/null || true

# Cria um .env.example genérico se não existir
if [ ! -f "$DEST_DIR/.env.example" ]; then
  echo "# UplexOS Environment Template" > "$DEST_DIR/.env.example"
  echo "DATABASE_URL=\"\"" >> "$DEST_DIR/.env.example"
  echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=\"\"" >> "$DEST_DIR/.env.example"
  echo "CLERK_SECRET_KEY=\"\"" >> "$DEST_DIR/.env.example"
  echo "STRIPE_SECRET_KEY=\"\"" >> "$DEST_DIR/.env.example"
fi

echo "📝 3/3 Gerando manifesto do Boilerplate..."
cat << 'MANIFESTO' > "$DEST_DIR/BOILERPLATE_INFO.md"
# Boilerplate: $2
**Origem:** $1
**Data de Criação:** $(date '+%Y-%m-%d %H:%M:%S')

Este é um template padronizado pelo UplexOS.
Para instanciar este boilerplate em um novo projeto, o `product-manager` deve copiar esta estrutura para a pasta de um novo cliente.
MANIFESTO

echo "✅ Sucesso! Boilerplate '$2' criado e higienizado em '_knowledge/boilerplates/'."

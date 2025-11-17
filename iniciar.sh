#!/bin/bash

# Script de inicialização rápida do AionFlow
# Uso: ./iniciar.sh

clear

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║          🚀 AionFlow - Inicialização Rápida               ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar se .env existe
if [ ! -f ".env" ]; then
    echo -e "${RED}✗ Arquivo .env não encontrado!${NC}"
    echo ""
    echo "Primeira vez rodando o projeto?"
    echo ""
    echo -e "${YELLOW}Passo 1:${NC} Copie o arquivo de exemplo"
    echo "  $ cp .env.example .env"
    echo ""
    echo -e "${YELLOW}Passo 2:${NC} Configure suas credenciais do Supabase"
    echo "  $ nano .env"
    echo ""
    echo -e "${YELLOW}Passo 3:${NC} Execute este script novamente"
    echo "  $ ./iniciar.sh"
    echo ""
    echo -e "📖 Consulte ${BLUE}COMO_CONFIGURAR.md${NC} para instruções detalhadas"
    echo ""
    exit 1
fi

# Verificar se variáveis estão configuradas
if grep -q "seu-projeto.supabase.co" .env || grep -q "sua-chave-anonima-aqui" .env; then
    echo -e "${YELLOW}⚠ Atenção: .env contém valores de exemplo${NC}"
    echo ""
    echo "Você precisa configurar o arquivo .env com suas credenciais reais do Supabase"
    echo ""
    echo "Como fazer:"
    echo "1. Acesse: https://app.supabase.com"
    echo "2. Selecione seu projeto"
    echo "3. Vá em Settings > API"
    echo "4. Copie a URL e a chave anon/public"
    echo "5. Edite o arquivo .env com esses valores"
    echo ""
    echo -e "Deseja continuar mesmo assim? (não recomendado) ${YELLOW}[s/N]${NC}"
    read -r resposta
    if [[ ! "$resposta" =~ ^[Ss]$ ]]; then
        echo "Configuração cancelada."
        exit 1
    fi
fi

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠ Dependências não instaladas${NC}"
    echo ""
    echo "Instalando dependências... (pode levar alguns minutos)"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ Erro ao instalar dependências${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Dependências instaladas com sucesso${NC}"
    echo ""
fi

# Executar verificação
echo "Executando verificação de configuração..."
echo ""
./verificar-config.sh

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}Alguns problemas foram encontrados.${NC}"
    echo -e "Deseja iniciar o servidor mesmo assim? ${YELLOW}[s/N]${NC}"
    read -r resposta
    if [[ ! "$resposta" =~ ^[Ss]$ ]]; then
        echo "Inicialização cancelada."
        exit 1
    fi
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}Iniciando servidor de desenvolvimento...${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""
echo -e "📍 URL Local: ${BLUE}http://localhost:5173${NC}"
echo -e "🛑 Para parar: Pressione ${YELLOW}Ctrl+C${NC}"
echo ""
echo "════════════════════════════════════════════════════════════"
echo ""

# Aguardar 2 segundos antes de iniciar
sleep 2

# Iniciar servidor
npm run dev

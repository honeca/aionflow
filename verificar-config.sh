#!/bin/bash

# Script de verificação de configuração do AionFlow
# Uso: ./verificar-config.sh

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   🔍 Verificação de Configuração - AionFlow               ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contadores
PASSED=0
FAILED=0

# Função para verificar
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $1"
        ((FAILED++))
    fi
}

# Função para avisos
warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Função para info
info() {
    echo -e "ℹ $1"
}

echo "1. Verificando Node.js..."
node --version > /dev/null 2>&1
check "Node.js instalado"

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
    check "Node.js versão >= 18 (v$NODE_VERSION)"
else
    warn "Node.js versão antiga (v$NODE_VERSION). Recomendado: >= 18"
    ((FAILED++))
fi

echo ""
echo "2. Verificando npm..."
npm --version > /dev/null 2>&1
check "npm instalado"

echo ""
echo "3. Verificando dependências..."
if [ -d "node_modules" ]; then
    MODULE_COUNT=$(ls node_modules | wc -l)
    check "node_modules existe ($MODULE_COUNT módulos)"

    if [ "$MODULE_COUNT" -lt 300 ]; then
        warn "Poucos módulos instalados. Execute: npm install"
    fi
else
    echo -e "${RED}✗${NC} node_modules não encontrado"
    warn "Execute: npm install"
    ((FAILED++))
fi

echo ""
echo "4. Verificando arquivo .env..."
if [ -f ".env" ]; then
    check ".env existe"

    # Verificar se contém as variáveis
    if grep -q "VITE_SUPABASE_URL=" .env && grep -q "VITE_SUPABASE_ANON_KEY=" .env; then
        check "Variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY presentes"

        # Verificar se não são valores de exemplo
        if grep -q "seu-projeto.supabase.co" .env || grep -q "sua-chave-anonima-aqui" .env; then
            warn ".env contém valores de exemplo. Configure com suas credenciais reais!"
        else
            check "Valores configurados (não são exemplos)"
        fi
    else
        echo -e "${RED}✗${NC} Variáveis não encontradas no .env"
        warn "Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY"
        ((FAILED++))
    fi
else
    echo -e "${RED}✗${NC} .env não encontrado"
    warn "Execute: cp .env.example .env"
    warn "Depois edite .env com suas credenciais do Supabase"
    ((FAILED++))
fi

echo ""
echo "5. Verificando arquivos de configuração..."
[ -f "package.json" ] && check "package.json" || { echo -e "${RED}✗${NC} package.json"; ((FAILED++)); }
[ -f "vite.config.ts" ] && check "vite.config.ts" || { echo -e "${RED}✗${NC} vite.config.ts"; ((FAILED++)); }
[ -f "tsconfig.json" ] && check "tsconfig.json" || { echo -e "${RED}✗${NC} tsconfig.json"; ((FAILED++)); }

echo ""
echo "6. Verificando estrutura do projeto..."
[ -d "src" ] && check "Diretório src/" || { echo -e "${RED}✗${NC} src/"; ((FAILED++)); }
[ -d "src/components" ] && check "Diretório src/components/" || { echo -e "${RED}✗${NC} src/components/"; ((FAILED++)); }
[ -d "src/pages" ] && check "Diretório src/pages/" || { echo -e "${RED}✗${NC} src/pages/"; ((FAILED++)); }
[ -d "supabase/migrations" ] && check "Diretório supabase/migrations/" || { echo -e "${RED}✗${NC} supabase/migrations/"; ((FAILED++)); }

echo ""
echo "7. Verificando migrations..."
MIGRATION_COUNT=$(ls -1 supabase/migrations/*.sql 2>/dev/null | wc -l)
if [ "$MIGRATION_COUNT" -ge 2 ]; then
    check "Migrations SQL encontradas ($MIGRATION_COUNT arquivos)"
else
    warn "Migrations não encontradas em supabase/migrations/"
    ((FAILED++))
fi

echo ""
echo "8. Verificando arquivos principais..."
[ -f "src/main.tsx" ] && check "src/main.tsx" || { echo -e "${RED}✗${NC} src/main.tsx"; ((FAILED++)); }
[ -f "src/App.tsx" ] && check "src/App.tsx" || { echo -e "${RED}✗${NC} src/App.tsx"; ((FAILED++)); }
[ -f "src/lib/supabaseClient.ts" ] && check "src/lib/supabaseClient.ts" || { echo -e "${RED}✗${NC} src/lib/supabaseClient.ts"; ((FAILED++)); }

echo ""
echo "════════════════════════════════════════════════════════════"
echo "RESUMO:"
echo -e "${GREEN}Passou:${NC} $PASSED"
echo -e "${RED}Falhou:${NC} $FAILED"
echo "════════════════════════════════════════════════════════════"
echo ""

if [ "$FAILED" -eq 0 ]; then
    echo -e "${GREEN}✓ Tudo configurado corretamente!${NC}"
    echo ""
    echo "Próximos passos:"
    echo "1. Se ainda não aplicou as migrations, acesse o Supabase SQL Editor"
    echo "2. Execute: npm run dev"
    echo "3. Acesse: http://localhost:5173"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Alguns problemas foram encontrados.${NC}"
    echo ""
    echo "Ações recomendadas:"

    if [ ! -d "node_modules" ]; then
        echo "• Execute: npm install"
    fi

    if [ ! -f ".env" ]; then
        echo "• Execute: cp .env.example .env"
        echo "• Configure o arquivo .env com suas credenciais"
    fi

    echo ""
    echo "Consulte: COMO_CONFIGURAR.md para instruções detalhadas"
    echo ""
    exit 1
fi

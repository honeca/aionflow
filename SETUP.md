# Guia Rápido de Configuração - AionFlow

## Status Atual da Configuração

### ✅ Concluído

- [x] Estrutura do projeto configurada
- [x] Dependências instaladas (407 pacotes)
- [x] Arquivos de configuração prontos
- [x] TypeScript configurado
- [x] TailwindCSS configurado
- [x] Vite configurado
- [x] React Router configurado
- [x] Schema do banco de dados definido
- [x] Migrations SQL criadas

### ⚠️ Pendente - Ações Necessárias

#### 1. Configurar Supabase (OBRIGATÓRIO)

**Passo a passo:**

```bash
# 1. Copiar arquivo de exemplo
cp .env.example .env

# 2. Editar o arquivo .env
# Adicione suas credenciais do Supabase
```

**Onde obter as credenciais:**
- Acesse: https://app.supabase.com
- Selecione seu projeto (ou crie um novo)
- Vá em: **Settings** → **API**
- Copie:
  - **Project URL** → `VITE_SUPABASE_URL`
  - **anon public** → `VITE_SUPABASE_ANON_KEY`

#### 2. Aplicar Migrations no Banco de Dados (OBRIGATÓRIO)

**No Supabase Dashboard:**

1. Acesse seu projeto no Supabase
2. Vá em **SQL Editor** (menu lateral)
3. Clique em **New query**
4. Execute os arquivos na ordem:

**Primeiro:** `supabase/migrations/20251116170100_add_detailed_company_fields.sql`
```sql
-- Copie e cole o conteúdo deste arquivo
-- Clique em "Run" (Ctrl/Cmd + Enter)
```

**Segundo:** `supabase/migrations/20251116170101_fix_im_column.sql`
```sql
-- Copie e cole o conteúdo deste arquivo
-- Clique em "Run" (Ctrl/Cmd + Enter)
```

#### 3. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:5173

## Estrutura do Banco de Dados

O projeto criará as seguintes tabelas no Supabase:

### 1. empresas
Tabela principal com dados cadastrais das empresas:
- Informações básicas (CNPJ, razão social, nome fantasia)
- Endereço completo
- Dados fiscais (IE, IM, CNAE, regime tributário)
- Múltiplos contatos (emails, telefones, WhatsApp)
- Dados do responsável legal
- Site e redes sociais

### 2. socios
Sócios vinculados às empresas:
- Nome e CPF
- Participação percentual
- Valor integralizado
- Data de entrada
- Status (ativo/inativo)

### 3. certificados
Certificados digitais das empresas:
- Tipo (e-CNPJ, e-CPF, etc)
- Data de validade
- Arquivo e senha
- Status (ativo/vencido/revogado)

## Verificação da Instalação

Execute para verificar se está tudo OK:

```bash
# Verificar se node_modules existe
ls node_modules | wc -l
# Deve mostrar: 322

# Verificar versão do Node
node --version
# Deve ser: v18 ou superior

# Verificar se .env existe
test -f .env && echo "✓ .env configurado" || echo "✗ .env não encontrado"
```

## Resolução de Problemas

### Erro: "Supabase URL and Anon Key must be defined"
**Solução:** Configure o arquivo `.env` com suas credenciais

### Erro: "Could not find column 'email1'"
**Solução:** Execute as migrations no banco de dados

### Erro: npm install falha
**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Vulnerabilidades de segurança (npm audit)
**Status:** 2 vulnerabilidades moderadas conhecidas (esbuild/vite)
**Ação:** Não crítico para desenvolvimento. Aguardar updates dos mantenedores.

## Próximos Passos Após Configuração

1. **Teste a aplicação**: Acesse http://localhost:5173
2. **Cadastre uma empresa de teste**: Vá em "Empresas" → "Nova Empresa"
3. **Verifique o Supabase**: Confirme que os dados estão sendo salvos
4. **Explore as funcionalidades**: Dashboard, Relatórios, Usuários

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build            # Cria build de produção
npm run preview          # Preview da build

# Qualidade de código
npm run lint             # Executa ESLint
npm run tsc:dualite      # Verifica tipos TypeScript

# Supabase (se tiver CLI instalada)
supabase status          # Status do projeto
supabase db reset        # Reset do banco (cuidado!)
```

## Suporte

- Documentação React: https://react.dev
- Documentação Supabase: https://supabase.com/docs
- Documentação Vite: https://vitejs.dev
- Issues do projeto: https://github.com/honeca/aionflow/issues

---

**Última atualização:** 2025-11-17
**Status do projeto:** Configuração inicial completa, pronto para desenvolvimento

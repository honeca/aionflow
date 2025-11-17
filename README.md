# AionFlow - Sistema de Gestão de Empresas

Sistema completo de gestão empresarial com integração Supabase.

## 🚀 Tecnologias

- React 18 + TypeScript
- Vite
- Supabase (Backend & Database)
- TailwindCSS
- React Router DOM
- Lucide React (ícones)

## 📋 Pré-requisitos

- Node.js 18+
- Conta Supabase (https://supabase.com)
- npm ou yarn

## 🔧 Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas credenciais:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

**Como obter as credenciais:**
1. Acesse https://app.supabase.com
2. Selecione seu projeto
3. Vá em Settings > API
4. Copie a URL e a chave `anon/public`

### 3. Aplicar Migrations do Banco de Dados

Execute as migrations no Supabase SQL Editor:

1. Acesse seu projeto no Supabase
2. Vá em SQL Editor
3. Execute os arquivos na pasta `supabase/migrations/` na ordem:
   - `20251116170100_add_detailed_company_fields.sql`
   - `20251116170101_fix_im_column.sql`

## 🏃 Executar o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:5173

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
aionflow/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   ├── contexts/          # Contextos React (CompanyContext, ToastContext)
│   ├── lib/               # Configurações (Supabase client)
│   ├── pages/             # Páginas da aplicação
│   │   └── Empresas/      # Módulo de gestão de empresas
│   ├── types/             # Definições TypeScript
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Entry point
├── supabase/
│   └── migrations/        # Migrations SQL
└── public/                # Arquivos estáticos
```

## 🗃️ Banco de Dados

O projeto usa 3 tabelas principais:

- **empresas** - Dados cadastrais das empresas
- **socios** - Sócios vinculados às empresas
- **certificados** - Certificados digitais das empresas

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa linter (ESLint)

## 🚢 Deploy

O projeto está configurado para deploy no Netlify através do arquivo `netlify.toml`.

## ⚠️ Notas de Segurança

- Nunca compartilhe o arquivo `.env`
- O arquivo `.env` já está no `.gitignore`
- Use as chaves `anon/public` do Supabase (nunca as chaves `service_role`)

## 📚 Funcionalidades

- Dashboard com estatísticas
- Gestão completa de empresas
- Cadastro de sócios
- Gerenciamento de certificados digitais
- Sistema de múltiplas empresas
- Integração com Supabase em tempo real

---

Desenvolvido com React + TypeScript + Supabase
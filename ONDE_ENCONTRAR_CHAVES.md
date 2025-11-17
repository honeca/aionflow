# 🔑 ONDE ENCONTRAR E COLAR AS CHAVES DO SUPABASE

## PARTE 1: ONDE ENCONTRAR (No Supabase)

### Passo 1: Acesse o Supabase
```
https://app.supabase.com
```

### Passo 2: Selecione seu Projeto
- Se já tem um projeto: Clique nele
- Se não tem: Clique em "New Project" e crie um

### Passo 3: Vá até as Configurações de API

**Caminho visual:**
```
┌─────────────────────────────────────────┐
│  Supabase Dashboard                     │
│                                         │
│  [Menu Lateral Esquerdo]                │
│   📊 Database                           │
│   🔐 Authentication                     │
│   📁 Storage                            │
│   ⚙️  Settings  ← CLIQUE AQUI          │
│       └─ General                        │
│       └─ API  ← DEPOIS CLIQUE AQUI     │
│       └─ Database                       │
│       └─ Auth                           │
└─────────────────────────────────────────┘
```

### Passo 4: Copie as Informações

Na página **Settings > API**, você verá:

```
┌──────────────────────────────────────────────────────────┐
│  Project API keys                                        │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Project URL                                        │ │
│  │                                                    │ │
│  │ https://xyzabc123.supabase.co                     │ │
│  │                              [📋 Copy]  ← COPIE 1 │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ anon public                                        │ │
│  │                                                    │ │
│  │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...  │ │
│  │                              [📋 Copy]  ← COPIE 2 │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ⚠️ IMPORTANTE: Use APENAS a chave "anon public"        │
│     NUNCA use a "service_role" (perigosa!)              │
└──────────────────────────────────────────────────────────┘
```

**O que copiar:**
1. ✅ **Project URL** - Exemplo: `https://xyzabc123.supabase.co`
2. ✅ **anon public** - Uma string longa começando com `eyJ...`

---

## PARTE 2: ONDE COLAR (No seu projeto)

### Passo 1: Criar o arquivo .env

Abra o terminal no diretório do projeto:

```bash
cd /home/user/aionflow
```

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

### Passo 2: Abrir o arquivo para editar

Escolha um dos editores:

```bash
# Opção 1 - nano (mais simples)
nano .env

# Opção 2 - vim
vim .env

# Opção 3 - VSCode
code .env
```

### Passo 3: Colar as credenciais

Você verá algo assim:

```env
# Supabase Configuration
# Obtenha estas credenciais em: https://app.supabase.com/project/_/settings/api

# URL do projeto Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co

# Chave anônima (anon/public) do Supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

**Substitua pelos valores reais:**

```env
# ANTES (valores de exemplo):
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui

# DEPOIS (seus valores reais):
VITE_SUPABASE_URL=https://xyzabc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjk...
```

### Passo 4: Salvar o arquivo

**Se estiver usando nano:**
1. Pressione `Ctrl + O` (para salvar)
2. Pressione `Enter` (confirmar o nome)
3. Pressione `Ctrl + X` (para sair)

**Se estiver usando vim:**
1. Pressione `Esc`
2. Digite `:wq`
3. Pressione `Enter`

**Se estiver usando VSCode:**
1. Pressione `Ctrl + S` (ou Cmd + S no Mac)

---

## ✅ VERIFICAR SE DEU CERTO

Execute o script de verificação:

```bash
./verificar-config.sh
```

Se estiver tudo certo, você verá:

```
✓ .env existe
✓ Variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY presentes
✓ Valores configurados (não são exemplos)
```

---

## 📝 EXEMPLO COMPLETO

### ARQUIVO FINAL .env

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xyzabc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjk5MzY0ODAwLCJleHAiOjIwMTQ5NDA4MDB9.abcdefghijklmnopqrstuvwxyz1234567890
```

**Características:**
- ✅ Sem comentários
- ✅ Sem aspas
- ✅ URL completa com https://
- ✅ Chave completa (muito longa)
- ✅ Sem espaços antes ou depois do `=`

---

## ⚠️ IMPORTANTE

### ❌ NÃO FAÇA ISSO:
```env
# ERRADO - Com aspas
VITE_SUPABASE_URL="https://xyzabc123.supabase.co"

# ERRADO - Com espaços
VITE_SUPABASE_URL = https://xyzabc123.supabase.co

# ERRADO - URL incompleta
VITE_SUPABASE_URL=xyzabc123.supabase.co

# ERRADO - Chave cortada
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### ✅ FAÇA ASSIM:
```env
# CORRETO
VITE_SUPABASE_URL=https://xyzabc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjk5MzY0ODAwLCJleHAiOjIwMTQ5NDA4MDB9.abcdefghijklmnopqrstuvwxyz1234567890
```

---

## 🆘 PROBLEMAS COMUNS

### "Não encontro Settings no menu"
**Solução:** Role o menu lateral para baixo. Settings fica no final.

### "Não vejo a aba API"
**Solução:**
1. Certifique-se de estar em Settings
2. Procure pelas abas: General, API, Database, Auth
3. Clique em API

### "A chave anon está muito grande"
**Resposta:** Isso é normal! A chave tem centenas de caracteres. Copie TUDO.

### "Copiei mas dá erro 'must be defined'"
**Solução:**
1. Verifique se o arquivo se chama exatamente `.env` (com ponto no início)
2. Verifique se não tem aspas nas variáveis
3. Reinicie o servidor: `Ctrl+C` e depois `npm run dev`

---

## 🎯 RESUMO RÁPIDO

### No Supabase:
1. Settings → API
2. Copiar "Project URL"
3. Copiar "anon public"

### No Terminal:
```bash
cp .env.example .env
nano .env
# Colar os valores
# Ctrl+O → Enter → Ctrl+X
```

### Verificar:
```bash
./verificar-config.sh
```

---

**Pronto!** Agora é só executar as migrations e iniciar o projeto! 🚀

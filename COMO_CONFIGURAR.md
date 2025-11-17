# 🚀 Como Configurar o AionFlow - Passo a Passo

## Parte 1: Configurar Supabase (5-10 minutos)

### Passo 1.1: Criar/Acessar Projeto no Supabase

1. Acesse: **https://app.supabase.com**
2. Faça login ou crie uma conta gratuita
3. Clique em **"New Project"** (ou selecione um projeto existente)
4. Preencha os dados:
   - **Name**: AionFlow (ou o nome que preferir)
   - **Database Password**: Crie uma senha forte e anote
   - **Region**: Escolha o mais próximo (ex: South America - São Paulo)
5. Clique em **"Create new project"**
6. ⏱️ Aguarde 2-3 minutos enquanto o Supabase provisiona o banco

### Passo 1.2: Obter as Credenciais

Quando o projeto estiver pronto:

1. No menu lateral, clique em **⚙️ Settings** (Configurações)
2. Clique em **API**
3. Você verá duas informações importantes:

   ```
   📍 Project URL
   https://xxxxxxxxxxxx.supabase.co

   🔑 anon public
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
   ```

4. **Mantenha esta aba aberta**, vamos usar em breve

### Passo 1.3: Criar Arquivo .env

No terminal, execute:

```bash
cd /home/user/aionflow
cp .env.example .env
```

Agora edite o arquivo `.env`:

```bash
nano .env
# ou use seu editor preferido: code .env, vim .env, etc
```

Cole suas credenciais (substituindo pelos valores reais):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

Salve o arquivo:
- No nano: `Ctrl + O` → `Enter` → `Ctrl + X`
- No vim: `:wq`
- No VSCode: `Ctrl + S`

✅ **Pronto!** Arquivo `.env` configurado.

---

## Parte 2: Criar Tabelas no Banco de Dados (5 minutos)

### Passo 2.1: Acessar SQL Editor

1. Volte ao Supabase Dashboard
2. No menu lateral, clique em **🗄️ SQL Editor**
3. Clique em **"New query"** (botão verde)

### Passo 2.2: Executar Primeira Migration

1. Abra o arquivo: `supabase/migrations/20251116170100_add_detailed_company_fields.sql`

2. **Copie TODO o conteúdo** do arquivo

3. **Cole no SQL Editor** do Supabase

4. Clique em **"Run"** (ou pressione `Ctrl/Cmd + Enter`)

5. ✅ Você deve ver: **"Success. No rows returned"**

### Passo 2.3: Executar Segunda Migration

1. Clique em **"New query"** novamente

2. Abra o arquivo: `supabase/migrations/20251116170101_fix_im_column.sql`

3. **Copie TODO o conteúdo** do arquivo

4. **Cole no SQL Editor** do Supabase

5. Clique em **"Run"**

6. ✅ Você deve ver: **"Success. No rows returned"**

### Passo 2.4: Verificar Tabelas Criadas

1. No menu lateral do Supabase, clique em **📊 Table Editor**
2. Você deve ver 3 tabelas:
   - ✅ `empresas`
   - ✅ `socios`
   - ✅ `certificados`

3. Clique em cada uma para ver as colunas criadas

✅ **Banco de dados configurado com sucesso!**

---

## Parte 3: Iniciar o Projeto (1 minuto)

### Passo 3.1: Iniciar Servidor de Desenvolvimento

No terminal:

```bash
cd /home/user/aionflow
npm run dev
```

Você deve ver:

```
  VITE v5.2.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Passo 3.2: Acessar a Aplicação

1. Abra seu navegador
2. Acesse: **http://localhost:5173**
3. 🎉 **O AionFlow está rodando!**

---

## 🧪 Testando a Aplicação

### Teste 1: Cadastrar uma Empresa

1. No menu lateral, clique em **"Empresas"**
2. Clique em **"+ Nova Empresa"**
3. Preencha os dados:
   - **CNPJ**: 12.345.678/0001-90 (pode ser fictício para teste)
   - **Razão Social**: Empresa Teste LTDA
   - **Nome Fantasia**: Teste
   - **Regime Tributário**: Simples Nacional
   - **Status**: Ativa
4. Clique em **"Salvar"**

### Teste 2: Verificar no Supabase

1. Volte ao Supabase Dashboard
2. Clique em **Table Editor** → **empresas**
3. ✅ Você deve ver a empresa que acabou de cadastrar!

### Teste 3: Adicionar Sócio

1. Na lista de empresas, clique na empresa criada
2. Vá na aba **"Sócios"**
3. Clique em **"+ Adicionar Sócio"**
4. Preencha e salve

### Teste 4: Dashboard

1. Clique em **"Dashboard"** no menu
2. Você deve ver estatísticas atualizadas

---

## ✅ Checklist Final

Marque conforme for completando:

- [ ] Projeto Supabase criado
- [ ] Credenciais copiadas
- [ ] Arquivo `.env` criado e configurado
- [ ] Migration 1 executada (`add_detailed_company_fields`)
- [ ] Migration 2 executada (`fix_im_column`)
- [ ] Tabelas visíveis no Table Editor
- [ ] Servidor rodando (`npm run dev`)
- [ ] Aplicação acessível no navegador
- [ ] Empresa de teste cadastrada
- [ ] Dados aparecendo no Supabase

---

## 🆘 Solução de Problemas

### Erro: "Supabase URL and Anon Key must be defined"

**Causa:** Arquivo `.env` não existe ou está mal configurado

**Solução:**
```bash
# Verificar se .env existe
ls -la .env

# Se não existir, criar:
cp .env.example .env

# Editar e adicionar credenciais
nano .env
```

### Erro: "relation empresas does not exist"

**Causa:** Migrations não foram executadas

**Solução:**
- Volte ao Passo 2 e execute as migrations no SQL Editor

### Erro: Failed to fetch / Network error

**Causa:** URL do Supabase incorreta ou projeto não está rodando

**Solução:**
1. Verifique o arquivo `.env`
2. Confirme que a URL está correta
3. Verifique se o projeto Supabase está ativo (não pausado)

### Porta 5173 já em uso

**Solução:**
```bash
# Matar processo na porta 5173
lsof -ti:5173 | xargs kill -9

# Ou usar outra porta
npm run dev -- --port 3000
```

### Página em branco no navegador

**Solução:**
1. Abra o console do navegador (F12)
2. Verifique erros no console
3. Confirme que o `.env` está configurado
4. Reinicie o servidor: `Ctrl+C` → `npm run dev`

---

## 📞 Precisa de Ajuda?

Se encontrar problemas:

1. **Verifique o console do navegador** (F12 → Console)
2. **Verifique o terminal** onde o `npm run dev` está rodando
3. **Revise os passos** acima, especialmente arquivo `.env`
4. **Consulte os logs** do Supabase (Logs no menu lateral)

---

## 🎯 Próximos Passos

Após configurar com sucesso:

1. ✅ Explore todas as páginas do sistema
2. ✅ Cadastre empresas reais
3. ✅ Configure políticas de segurança no Supabase (RLS)
4. ✅ Personalize o sistema conforme necessário
5. ✅ Configure deploy no Netlify

---

**Tempo total estimado:** 15-20 minutos

**Dificuldade:** ⭐⭐☆☆☆ (Fácil)

Boa configuração! 🚀

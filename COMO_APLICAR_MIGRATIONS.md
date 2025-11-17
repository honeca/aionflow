# 🗄️ COMO APLICAR AS MIGRATIONS NO SUPABASE

## ⚡ Guia Rápido Visual

### PASSO 1: Acessar o SQL Editor

```
1. Abra: https://app.supabase.com

2. Selecione o projeto: hoipfxvidvuccreuvree

3. No menu lateral esquerdo, clique em:

   📊 SQL Editor  ← CLIQUE AQUI
```

### PASSO 2: Executar a Primeira Migration

```
1. No SQL Editor, clique em: [+ New query]

2. Copie TODO o conteúdo do arquivo:
   supabase/migrations/20251116170100_add_detailed_company_fields.sql

3. Cole no editor SQL

4. Clique em [Run] (ou pressione Ctrl/Cmd + Enter)

5. ✅ Você deve ver: "Success. No rows returned"
```

### PASSO 3: Executar a Segunda Migration

```
1. Clique em [+ New query] novamente

2. Copie TODO o conteúdo do arquivo:
   supabase/migrations/20251116170101_fix_im_column.sql

3. Cole no editor SQL

4. Clique em [Run]

5. ✅ Você deve ver: "Success. No rows returned"
```

### PASSO 4: Verificar Tabelas Criadas

```
1. No menu lateral, clique em: 📊 Table Editor

2. Você deve ver 3 tabelas:
   ✓ empresas
   ✓ socios
   ✓ certificados

3. Clique em cada uma para ver as colunas
```

---

## 📋 CONTEÚDO DAS MIGRATIONS

### Migration 1: add_detailed_company_fields.sql

Cole isto no SQL Editor:

```sql
/*
  # [Schema Upgrade] Adicionar campos detalhados à tabela de empresas

  ## Query Description:
  Esta operação adiciona várias colunas novas à tabela `public.empresas` para armazenar informações fiscais, múltiplos contatos e detalhes adicionais do responsável legal. A operação é segura e não afeta dados existentes, apenas adiciona novas colunas com valor `NULL` por padrão. O erro "Could not find column 'email1'" indica que o schema do banco de dados está dessincronizado com a aplicação. Esta migração corrige essa divergência.

  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Low"
  - Requires-Backup: false
  - Reversible: true (removendo as colunas)

  ## Structure Details:
  - Tabela afetada: `public.empresas`
  - Colunas adicionadas:
    - `ie` (TEXT)
    - `im` (TEXT)
    - `cnae` (TEXT)
    - `responsavel_funcao` (TEXT)

  ## Security Implications:
  - RLS Status: Não alterado.
  - Policy Changes: Não.
  - Auth Requirements: N/A.

  ## Performance Impact:
  - Indexes: Nenhum índice novo adicionado.
  - Triggers: Nenhum.
  - Estimated Impact: Baixo. A adição de colunas `NULL` é uma operação rápida.
*/

-- Adiciona colunas fiscais
ALTER TABLE public.empresas ADD COLUMN IF NOT EXISTS ie TEXT;
ALTER TABLE public.empresas ADD COLUMN IF NOT EXISTS im TEXT;
ALTER TABLE public.empresas ADD COLUMN IF NOT EXISTS cnae TEXT;

-- Adiciona campos ausentes do responsável legal
ALTER TABLE public.empresas ADD COLUMN IF NOT EXISTS responsavel_funcao TEXT;
```

### Migration 2: fix_im_column.sql

Cole isto no SQL Editor:

```sql
-- Garantir que a coluna 'im' existe na tabela empresas
ALTER TABLE public.empresas ADD COLUMN IF NOT EXISTS im TEXT;
```

---

## 🎯 DEPOIS DE APLICAR AS MIGRATIONS

Execute no terminal:

```bash
./iniciar.sh
```

Ou manualmente:

```bash
npm run dev
```

Acesse: **http://localhost:5173**

---

## ✅ CHECKLIST

- [ ] Acessei o Supabase Dashboard
- [ ] Fui em SQL Editor
- [ ] Executei a migration 1 (add_detailed_company_fields.sql)
- [ ] Vi "Success. No rows returned"
- [ ] Executei a migration 2 (fix_im_column.sql)
- [ ] Vi "Success. No rows returned"
- [ ] Verifiquei as 3 tabelas no Table Editor
- [ ] Executei `./iniciar.sh` ou `npm run dev`
- [ ] Acessei http://localhost:5173

---

## 🆘 PROBLEMAS COMUNS

### "permission denied for table empresas"

**Solução:**
- Você está logado no projeto correto?
- Verifique se está no projeto: hoipfxvidvuccreuvree

### "column already exists"

**Resposta:**
- Tudo bem! Isso significa que a coluna já foi criada antes
- A migration usa `IF NOT EXISTS` então não há problema

### "syntax error"

**Solução:**
- Certifique-se de copiar TODO o conteúdo do arquivo
- Não deixe nada de fora
- Cole exatamente como está

---

## 📊 O QUE AS MIGRATIONS FAZEM

### Migration 1
Adiciona campos importantes à tabela `empresas`:
- `ie` - Inscrição Estadual
- `im` - Inscrição Municipal
- `cnae` - Código CNAE
- `responsavel_funcao` - Função do responsável

### Migration 2
Garante que a coluna `im` existe (por segurança)

---

**Tempo estimado:** 3-5 minutos

Boa sorte! 🚀

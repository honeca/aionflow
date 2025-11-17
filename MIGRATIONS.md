# Database Migrations Guide

This document explains how to apply database migrations to your Supabase project.

## ⚠️ Common Error

If you encountered this error:
```
ERROR: 42601: syntax error at or near "cat"
LINE 1: cat supabase/migrations/20251116170100_add_detailed_company_fields.sql
```

This happens when trying to execute a shell command (`cat`) as SQL. This guide shows you the correct way to run migrations.

## Migration Files

Migration files are located in `supabase/migrations/` directory:
- `20251116170100_add_detailed_company_fields.sql` - Adds fiscal and contact fields to empresas table
- `20251116170101_fix_im_column.sql` - Ensures the 'im' column exists

## How to Apply Migrations

### Option 1: Using Supabase CLI (Recommended)

The Supabase CLI is the official and safest way to manage migrations:

1. **Install Supabase CLI**:
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Link your project**:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

   To find your project ref:
   - Go to your Supabase Dashboard
   - Your project URL is: `https://YOUR_PROJECT_REF.supabase.co`
   - Copy the PROJECT_REF part

4. **Push migrations**:
   ```bash
   supabase db push
   ```

### Option 2: Using Supabase Dashboard (Manual)

If you prefer not to use the CLI:

1. **Open Supabase Dashboard**:
   - Go to https://app.supabase.com
   - Select your project

2. **Navigate to SQL Editor**:
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy migration content**:
   - Open `supabase/migrations/20251116170100_add_detailed_company_fields.sql`
   - Copy all the SQL content (skip the comments if you prefer)

4. **Paste and execute**:
   - Paste the SQL into the SQL Editor
   - Click "Run" or press Ctrl+Enter (Cmd+Enter on Mac)
   - Wait for confirmation

5. **Repeat for other migrations**:
   - Do the same for `20251116170101_fix_im_column.sql`

### Option 3: Using psql (Advanced)

If you have direct PostgreSQL access:

1. **Get your database connection string**:
   - Go to Supabase Dashboard > Settings > Database
   - Copy the "Connection string" (use the "Connection pooling" one for better performance)

2. **Run migrations**:
   ```bash
   psql "YOUR_CONNECTION_STRING" < supabase/migrations/20251116170100_add_detailed_company_fields.sql
   psql "YOUR_CONNECTION_STRING" < supabase/migrations/20251116170101_fix_im_column.sql
   ```

## Verifying Migrations

After applying migrations, verify they worked:

### Using SQL Editor:
```sql
-- Check if new columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'empresas'
AND column_name IN ('ie', 'im', 'cnae', 'responsavel_funcao');
```

You should see all 4 columns listed.

### Using your application:
- Start your app: `npm run dev`
- Try to create or edit a company
- The error "Could not find column 'email1'" should be resolved

## What These Migrations Do

### Migration 1: add_detailed_company_fields
Adds these columns to the `empresas` table:
- `ie` (TEXT) - Inscrição Estadual (State Registration)
- `im` (TEXT) - Inscrição Municipal (Municipal Registration)
- `cnae` (TEXT) - CNAE code (Economic Activity Classification)
- `responsavel_funcao` (TEXT) - Legal representative's role/position

### Migration 2: fix_im_column
Ensures the `im` column exists (redundant with migration 1, but safe to run)

## Safety Notes

- ✅ These migrations use `ADD COLUMN IF NOT EXISTS`, making them safe to run multiple times
- ✅ They don't modify existing data, only add new columns
- ✅ Existing columns will have `NULL` values for new fields
- ✅ No indexes or triggers are modified
- ✅ Row Level Security (RLS) policies are not affected

## Troubleshooting

### "Permission denied" error
- Make sure you're using a service role key or have sufficient permissions
- In Supabase Dashboard, you automatically have the right permissions

### "Column already exists" error
- This is actually fine! The migrations use `IF NOT EXISTS`
- If you see this, the column was already added

### "Cannot connect to database"
- Check your `.env` file has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Verify your internet connection
- Check Supabase service status at https://status.supabase.com

## Need Help?

- [Supabase Migrations Documentation](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [Supabase CLI Documentation](https://supabase.com/docs/reference/cli/introduction)

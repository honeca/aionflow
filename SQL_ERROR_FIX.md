# SQL Syntax Error Fix

## The Problem

**Error encountered:**
```
ERROR: 42601: syntax error at or near "cat"
LINE 1: cat supabase/migrations/20251116170100_add_detailed_company_fields.sql
```

## Root Cause

The error occurred because someone tried to execute this command as SQL:
```bash
cat supabase/migrations/20251116170100_add_detailed_company_fields.sql
```

`cat` is a **shell command** (used to display file contents), not SQL. When this was passed to a SQL client, it tried to parse "cat" as SQL syntax, causing the error.

## The Solution

The migration files are **correct** - they just need to be executed properly.

### Quick Fix (Recommended)

1. **Using Supabase CLI:**
   ```bash
   npm install -g supabase
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db push
   ```

2. **Using Supabase Dashboard:**
   - Go to https://app.supabase.com
   - Open your project → SQL Editor
   - Copy the contents of `supabase/migrations/20251116170100_add_detailed_company_fields.sql`
   - Paste and run in SQL Editor
   - Repeat for `supabase/migrations/20251116170101_fix_im_column.sql`

### Using the Migration Script (Alternative)

```bash
npm run migrate
```

Note: This requires proper Supabase credentials in your `.env` file.

## What Was Fixed

Created the following files to prevent this error in the future:

1. **MIGRATIONS.md** - Comprehensive guide on running migrations correctly
2. **scripts/run-migrations.js** - Automated migration runner script
3. **README.md** - Updated with migration instructions and warnings
4. **package.json** - Added `npm run migrate` and `npm run migrate:help` commands

## Key Takeaways

❌ **DON'T DO THIS:**
```bash
# This will cause "syntax error at or near cat"
psql < "cat supabase/migrations/file.sql"
# or executing "cat ..." as SQL in any SQL client
```

✅ **DO THIS:**
```bash
# Correct way to run SQL files
psql < supabase/migrations/file.sql
# or
psql -f supabase/migrations/file.sql
# or use Supabase CLI
supabase db push
```

## Migration Files

The following migrations need to be applied:
- `20251116170100_add_detailed_company_fields.sql` - Adds ie, im, cnae, responsavel_funcao columns
- `20251116170101_fix_im_column.sql` - Ensures im column exists

Both are safe to run multiple times (use `IF NOT EXISTS`).

## Need More Help?

See [MIGRATIONS.md](./MIGRATIONS.md) for detailed instructions.

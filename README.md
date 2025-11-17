# AionFlow - Sistema de Gestão de Empresas

## Project Setup

To run this project, follow these steps:

1. Extract the zip file.
2. Run `npm install` to install dependencies.
3. Configure your environment variables (see below).
4. Apply database migrations (see below).
5. Run `npm run dev` to start the development server.

## Environment Configuration

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your [Supabase Dashboard](https://app.supabase.com) under Project Settings > API.

## Database Migrations

**Important:** Before running the application, you need to apply the database migrations.

⚠️ **Do not run migrations using `cat` command!** This will cause syntax errors.

See [MIGRATIONS.md](./MIGRATIONS.md) for detailed instructions on how to properly apply migrations.

**Quick start:**
- **Recommended:** Use Supabase CLI: `supabase db push`
- **Alternative:** Use Supabase Dashboard SQL Editor to manually run the migration files

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

- `src/` - Application source code
- `supabase/migrations/` - Database migration files
- `scripts/` - Utility scripts

This project was generated through Alpha. For more information, visit [dualite.dev](https://dualite.dev).
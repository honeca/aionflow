#!/usr/bin/env node

/**
 * Migration Runner for Supabase
 *
 * This script executes SQL migration files against your Supabase database.
 *
 * Usage:
 *   node scripts/run-migrations.js
 *
 * Requirements:
 *   - VITE_SUPABASE_URL environment variable
 *   - VITE_SUPABASE_ANON_KEY environment variable (or service role key for migrations)
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials');
  console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_KEY (or VITE_SUPABASE_ANON_KEY)');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Get migration files
const migrationsDir = join(__dirname, '..', 'supabase', 'migrations');
let migrationFiles;

try {
  migrationFiles = readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort(); // Sort to ensure migrations run in order
} catch (error) {
  console.error('❌ Error reading migrations directory:', error.message);
  process.exit(1);
}

if (migrationFiles.length === 0) {
  console.log('ℹ️  No migration files found');
  process.exit(0);
}

console.log(`📦 Found ${migrationFiles.length} migration file(s)\n`);

// Run migrations
async function runMigrations() {
  for (const file of migrationFiles) {
    const filePath = join(migrationsDir, file);
    console.log(`⏳ Running migration: ${file}`);

    try {
      // Read SQL file
      const sql = readFileSync(filePath, 'utf8');

      // Skip if file is empty or only contains comments
      const sqlContent = sql.replace(/\/\*[\s\S]*?\*\/|--.*$/gm, '').trim();
      if (!sqlContent) {
        console.log(`⏭️  Skipped (empty file): ${file}\n`);
        continue;
      }

      // Execute SQL using Supabase RPC
      const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

      if (error) {
        // If exec_sql RPC doesn't exist, provide instructions
        if (error.code === '42883') {
          console.error('\n❌ Error: The exec_sql function does not exist in your database.');
          console.error('\n📋 To run migrations, you have two options:\n');
          console.error('Option 1 - Use Supabase CLI (Recommended):');
          console.error('  1. Install Supabase CLI: npm install -g supabase');
          console.error('  2. Link your project: supabase link --project-ref YOUR_PROJECT_REF');
          console.error('  3. Push migrations: supabase db push\n');
          console.error('Option 2 - Manual execution via Supabase Dashboard:');
          console.error('  1. Go to your Supabase project dashboard');
          console.error('  2. Navigate to SQL Editor');
          console.error('  3. Copy and paste the contents of each migration file');
          console.error(`  4. Execute the SQL\n`);
          console.error(`📄 Migration file location: ${filePath}\n`);
          process.exit(1);
        }
        throw error;
      }

      console.log(`✅ Completed: ${file}\n`);
    } catch (error) {
      console.error(`❌ Failed to run migration ${file}:`, error.message);
      console.error('\nStack trace:', error);
      process.exit(1);
    }
  }

  console.log('🎉 All migrations completed successfully!');
}

// Run migrations
runMigrations().catch(error => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});

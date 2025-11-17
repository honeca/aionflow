-- ============================================================================
-- SCRIPT DE DIAGNÓSTICO E CORREÇÃO DO SCHEMA - SUPABASE
-- ============================================================================

-- PASSO 1: Verificar estrutura atual da tabela empresas
SELECT
    '=== COLUNAS DA TABELA EMPRESAS ===' as info;

SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'empresas'
  AND table_schema = 'public'
  AND column_name LIKE '%status%'
ORDER BY ordinal_position;

-- PASSO 2: Verificar se existe alguma view com problema
SELECT
    '=== VIEWS QUE USAM A TABELA EMPRESAS ===' as info;

SELECT
    table_name as view_name,
    view_definition
FROM information_schema.views
WHERE table_schema = 'public'
  AND view_definition LIKE '%empresas%'
  AND view_definition LIKE '%status%';

-- PASSO 3: Verificar políticas RLS
SELECT
    '=== POLÍTICAS RLS NA TABELA EMPRESAS ===' as info;

SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'empresas';

-- PASSO 4: Forçar reload do cache do PostgREST
SELECT
    '=== RECARREGANDO CACHE DO POSTGREST ===' as info;

NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';

-- PASSO 5: Verificar se há triggers problemáticos
SELECT
    '=== TRIGGERS NA TABELA EMPRESAS ===' as info;

SELECT
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'empresas'
  AND trigger_schema = 'public';

-- PASSO 6: Mensagem final
SELECT
    '✅ DIAGNÓSTICO COMPLETO! Verifique os resultados acima.' as resultado;

SELECT
    'Se a coluna aparece como "status_empresa", então o cache foi recarregado.' as proximos_passos;

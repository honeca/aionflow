-- ============================================================================
-- 🚨 SOLUÇÃO DEFINITIVA - EXECUTE ESTE SQL AGORA NO SUPABASE
-- ============================================================================

-- PASSO 1: Renomear a coluna de status_empresa para status
ALTER TABLE public.empresas
RENAME COLUMN status_empresa TO status;

-- PASSO 2: Recarregar o cache do PostgREST
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';

-- PASSO 3: Confirmar
SELECT '✅ COLUNA RENOMEADA COM SUCESSO! Agora o código vai funcionar.' as resultado;

-- ============================================================================
-- SOLUÇÃO DEFINITIVA: Renomear coluna status_empresa -> status
-- ============================================================================
--
-- O PROBLEMA: O código TypeScript espera "status_empresa" mas o cache do
-- PostgREST está procurando por "status". A solução mais rápida é renomear
-- a coluna no banco para "status" e atualizar o código.
--
-- ============================================================================

-- OPÇÃO 1: Verificar qual coluna realmente existe
SELECT
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'empresas'
  AND column_name IN ('status', 'status_empresa');

-- Se aparecer APENAS 'status_empresa', execute o comando abaixo:
-- (DESCOMENTE removendo os -- se necessário)

-- ALTER TABLE public.empresas
-- RENAME COLUMN status_empresa TO status;

-- ============================================================================
-- IMPORTANTE: Se você executar o ALTER acima, o código TypeScript precisa
-- ser atualizado para usar 'status' em vez de 'status_empresa'
-- ============================================================================

-- Depois de renomear, recarregue o cache:
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';

SELECT '✅ Execute a query acima, veja qual coluna existe, e depois decida se vai renomear!' as instrucoes;

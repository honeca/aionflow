-- Garantir que a coluna 'im' existe na tabela empresas
ALTER TABLE public.empresas ADD COLUMN IF NOT EXISTS im TEXT;
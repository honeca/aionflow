-- Execute este SQL no Supabase SQL Editor para recarregar o schema cache

NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';

-- Mensagem de confirmação
SELECT 'Schema cache recarregado com sucesso!' as message;

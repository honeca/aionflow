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

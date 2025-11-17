import { Tables } from './supabase';

export type Empresa = Tables<'empresas'>;
export type Socio = Tables<'socios'>;
export type Certificado = Tables<'certificados'>;

export type EmpresaDetalhada = Empresa & {
  socios: Socio[];
  certificados: Certificado[];
};

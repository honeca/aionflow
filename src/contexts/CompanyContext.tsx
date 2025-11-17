import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Empresa, Socio, Certificado, EmpresaDetalhada } from '../types/empresa';
import { supabase } from '../lib/supabaseClient';
import { TablesInsert, TablesUpdate } from '../types/supabase';

interface CompanyContextType {
  empresas: Empresa[];
  empresaDetalhada: EmpresaDetalhada | null;
  loading: boolean;
  error: string | null;
  fetchEmpresas: () => Promise<void>;
  fetchEmpresaDetalhada: (id: string) => Promise<void>;
  createEmpresa: (empresaData: TablesInsert<'empresas'>) => Promise<Empresa | null>;
  updateEmpresa: (id: string, empresaData: TablesUpdate<'empresas'>) => Promise<Empresa | null>;
  createSocio: (socioData: TablesInsert<'socios'>) => Promise<Socio | null>;
  updateSocio: (id: string, socioData: TablesUpdate<'socios'>) => Promise<Socio | null>;
  deleteSocio: (id: string) => Promise<void>;
  saveCertificado: (certificadoData: TablesInsert<'certificados'>) => Promise<Certificado | null>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [empresaDetalhada, setEmpresaDetalhada] = useState<EmpresaDetalhada | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmpresas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('empresas').select('*').order('nome_fantasia');
      if (error) throw error;
      setEmpresas(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error("Erro ao buscar empresas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEmpresaDetalhada = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data: empresaData, error: empresaError } = await supabase
        .from('empresas')
        .select('*')
        .eq('id', id)
        .single();
      if (empresaError) throw empresaError;
      if (!empresaData) throw new Error("Empresa não encontrada");

      const { data: sociosData, error: sociosError } = await supabase
        .from('socios')
        .select('*')
        .eq('empresa_id', id);
      if (sociosError) throw sociosError;

      const { data: certificadosData, error: certificadosError } = await supabase
        .from('certificados')
        .select('*')
        .eq('empresa_id', id);
      if (certificadosError) throw certificadosError;

      setEmpresaDetalhada({
        ...empresaData,
        socios: sociosData || [],
        certificados: certificadosData || [],
      });

    } catch (err: any) {
      setError(err.message);
      console.error("Erro ao buscar detalhes da empresa:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createEmpresa = async (empresaData: TablesInsert<'empresas'>): Promise<Empresa | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('empresas').insert(empresaData).select().single();
      if (error) throw error;
      await fetchEmpresas(); // Refresh list
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateEmpresa = async (id: string, empresaData: TablesUpdate<'empresas'>): Promise<Empresa | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('empresas').update(empresaData).eq('id', id).select().single();
      if (error) throw error;
      await fetchEmpresas(); // Refresh list
      if (empresaDetalhada?.id === id) {
        await fetchEmpresaDetalhada(id); // Refresh details if it's the current one
      }
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const createSocio = async (socioData: TablesInsert<'socios'>): Promise<Socio | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('socios').insert(socioData).select().single();
      if (error) throw error;
      await fetchEmpresaDetalhada(socioData.empresa_id);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateSocio = async (id: string, socioData: TablesUpdate<'socios'>): Promise<Socio | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('socios').update(socioData).eq('id', id).select().single();
      if (error) throw error;
      if (data) await fetchEmpresaDetalhada(data.empresa_id);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteSocio = async (id: string): Promise<void> => {
    setLoading(true);
    try {
        const { data: socio, error: fetchError } = await supabase.from('socios').select('empresa_id').eq('id', id).single();
        if (fetchError || !socio) throw fetchError || new Error("Sócio não encontrado");

        const { error } = await supabase.from('socios').delete().eq('id', id);
        if (error) throw error;
        
        await fetchEmpresaDetalhada(socio.empresa_id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveCertificado = async (certificadoData: TablesInsert<'certificados'>): Promise<Certificado | null> => {
    setLoading(true);
    try {
        const { data: existing, error: fetchError } = await supabase
            .from('certificados')
            .select('id')
            .eq('empresa_id', certificadoData.empresa_id)
            .eq('tipo_certificado', certificadoData.tipo_certificado)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError; // Ignore "0 rows" error

        let data, error;
        if (existing) {
            ({ data, error } = await supabase.from('certificados').update(certificadoData).eq('id', existing.id).select().single());
        } else {
            ({ data, error } = await supabase.from('certificados').insert(certificadoData).select().single());
        }

        if (error) throw error;
        await fetchEmpresaDetalhada(certificadoData.empresa_id);
        return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchEmpresas();
  }, [fetchEmpresas]);

  return (
    <CompanyContext.Provider value={{ 
        empresas, 
        empresaDetalhada, 
        loading, 
        error, 
        fetchEmpresas, 
        fetchEmpresaDetalhada,
        createEmpresa,
        updateEmpresa,
        createSocio,
        updateSocio,
        deleteSocio,
        saveCertificado
    }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanies = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanies must be used within a CompanyProvider');
  }
  return context;
};

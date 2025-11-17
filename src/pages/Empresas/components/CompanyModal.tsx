import React, { useState, useEffect, useContext, useCallback } from 'react';
import Modal from '../../../components/Modal';
import { Empresa } from '../../../types/empresa';
import { useCompanies } from '../../../contexts/CompanyContext';
import { ToastContext } from '../../../contexts/ToastContext';
import InputMask from './InputMask';
import { TablesInsert, TablesUpdate } from '../../../types/supabase';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyToEdit?: Empresa | null;
}

const inputClasses = "w-full bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm p-2 text-white focus:ring-blue-500 focus:border-blue-500";
const labelClasses = "block text-xs text-gray-400 mb-1";

type FormData = Partial<TablesInsert<'empresas'>>;

const getInitialFormData = (): FormData => ({
  razao_social: '',
  nome_fantasia: '',
  cnpj: '',
  regime_tributario: 'Simples Nacional',
  status: 'Ativa',
  data_abertura: '',
  ie: '', im: '', cnae: '',
  cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', uf: '',
  email1: '', email2: '', email3: '',
  telefone_principal: '',
  responsavel_nome: '', responsavel_cpf: '', responsavel_telefone: '', responsavel_email: '', responsavel_rg: '', responsavel_orgao_emissor: '', responsavel_data_emissao_rg: '', responsavel_funcao: '',
  capital_social: 0,
});

const CompanyModal: React.FC<CompanyModalProps> = ({ isOpen, onClose, companyToEdit }) => {
  const { createEmpresa, updateEmpresa } = useCompanies();
  const { showToast } = useContext(ToastContext);
  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  useEffect(() => {
    if (isOpen) {
      if (companyToEdit) {
        setFormData(companyToEdit);
      } else {
        setFormData(getInitialFormData());
      }
    }
  }, [companyToEdit, isOpen]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.razao_social || !formData.nome_fantasia || !formData.cnpj || !formData.regime_tributario) {
      showToast('Preencha os campos obrigatórios.', 'error');
      return;
    }

    if (companyToEdit) {
      const { id, created_at, updated_at, ...updateData } = formData;
      await updateEmpresa(companyToEdit.id, updateData as TablesUpdate<'empresas'>);
      showToast('Empresa atualizada com sucesso!', 'success');
    } else {
      await createEmpresa(formData as TablesInsert<'empresas'>);
      showToast('Empresa cadastrada com sucesso!', 'success');
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={companyToEdit ? 'Editar Empresa' : 'Cadastrar Nova Empresa'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <section>
          <h4 className="font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">Dados da Empresa</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2"><label className={labelClasses}>Razão Social*</label><input name="razao_social" value={formData.razao_social || ''} onChange={handleChange} className={inputClasses} required /></div>
            <div className="lg:col-span-1"><label className={labelClasses}>Nome Fantasia*</label><input name="nome_fantasia" value={formData.nome_fantasia || ''} onChange={handleChange} className={inputClasses} required /></div>
            <div><label className={labelClasses}>CNPJ*</label><InputMask mask="cnpj" name="cnpj" value={formData.cnpj || ''} onChange={handleChange} className={inputClasses} required /></div>
            <div><label className={labelClasses}>Regime Tributário*</label><select name="regime_tributario" value={formData.regime_tributario || 'Simples Nacional'} onChange={handleChange} className={inputClasses}><option>Simples Nacional</option><option>Lucro Presumido</option><option>Lucro Real</option></select></div>
            <div><label className={labelClasses}>Data de Abertura</label><input type="date" name="data_abertura" value={formData.data_abertura || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>Status*</label><select name="status" value={formData.status || 'Ativa'} onChange={handleChange} className={inputClasses}><option>Ativa</option><option>Inativa</option><option>Suspensa</option></select></div>
            <div><label className={labelClasses}>Inscrição Estadual</label><input name="ie" value={formData.ie || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>Inscrição Municipal</label><input name="im" value={formData.im || ''} onChange={handleChange} className={inputClasses} /></div>
            <div className="lg:col-span-1"><label className={labelClasses}>CNAE Principal</label><input name="cnae" value={formData.cnae || ''} onChange={handleChange} className={inputClasses} /></div>
          </div>
        </section>
        
        <section>
          <h4 className="font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">Endereço e Contato</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1"><label className={labelClasses}>CEP</label><InputMask mask="cep" name="cep" value={formData.cep || ''} onChange={handleChange} className={inputClasses} /></div>
            <div className="md:col-span-3"><label className={labelClasses}>Logradouro</label><input name="logradouro" value={formData.logradouro || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>Número</label><input name="numero" value={formData.numero || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>Complemento</label><input name="complemento" value={formData.complemento || ''} onChange={handleChange} className={inputClasses} /></div>
            <div className="md:col-span-2"><label className={labelClasses}>Bairro</label><input name="bairro" value={formData.bairro || ''} onChange={handleChange} className={inputClasses} /></div>
            <div className="md:col-span-3"><label className={labelClasses}>Cidade</label><input name="cidade" value={formData.cidade || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>UF</label><input name="uf" value={formData.uf || ''} onChange={handleChange} className={inputClasses} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div><label className={labelClasses}>E-mail 1*</label><input type="email" name="email1" value={formData.email1 || ''} onChange={handleChange} className={inputClasses} required/></div>
            <div><label className={labelClasses}>E-mail 2</label><input type="email" name="email2" value={formData.email2 || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>E-mail 3</label><input type="email" name="email3" value={formData.email3 || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>Telefone Principal*</label><InputMask mask="phone" name="telefone_principal" value={formData.telefone_principal || ''} onChange={handleChange} className={inputClasses} required/></div>
            <div><label className={labelClasses}>WhatsApp 1</label><InputMask mask="phone" name="whatsapp1" value={formData.whatsapp1 || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>WhatsApp 2</label><InputMask mask="phone" name="whatsapp2" value={formData.whatsapp2 || ''} onChange={handleChange} className={inputClasses} /></div>
          </div>
        </section>

        <section>
          <h4 className="font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">Responsável Legal</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label className={labelClasses}>Nome*</label><input name="responsavel_nome" value={formData.responsavel_nome || ''} onChange={handleChange} className={inputClasses} required/></div>
            <div><label className={labelClasses}>CPF*</label><InputMask mask="cpf" name="responsavel_cpf" value={formData.responsavel_cpf || ''} onChange={handleChange} className={inputClasses} required/></div>
            <div><label className={labelClasses}>Função</label><input name="responsavel_funcao" value={formData.responsavel_funcao || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>Telefone</label><InputMask mask="phone" name="responsavel_telefone" value={formData.responsavel_telefone || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>E-mail</label><input type="email" name="responsavel_email" value={formData.responsavel_email || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>RG</label><input name="responsavel_rg" value={formData.responsavel_rg || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>Órgão Emissor</label><input name="responsavel_orgao_emissor" value={formData.responsavel_orgao_emissor || ''} onChange={handleChange} className={inputClasses} /></div>
            <div><label className={labelClasses}>Data de Emissão RG</label><input type="date" name="responsavel_data_emissao_rg" value={formData.responsavel_data_emissao_rg || ''} onChange={handleChange} className={inputClasses} /></div>
          </div>
        </section>

        <section>
            <h4 className="font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">Capital Social</h4>
            <div>
                <label className={labelClasses}>Capital Social (R$)</label>
                <input type="number" step="0.01" name="capital_social" value={formData.capital_social || 0} onChange={handleChange} className={inputClasses} />
                <p className="text-xs text-gray-500 mt-1">O detalhamento por sócio será feito na aba "Sócios".</p>
            </div>
        </section>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-800/50">
          <button type="button" onClick={onClose} className="bg-gray-800/50 hover:bg-gray-700/50 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            Cancelar
          </button>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            Salvar Empresa
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CompanyModal;

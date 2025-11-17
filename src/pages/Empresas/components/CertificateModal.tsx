import React, { useState, useContext, useEffect } from 'react';
import Modal from '../../../components/Modal';
import { useCompanies } from '../../../contexts/CompanyContext';
import { ToastContext } from '../../../contexts/ToastContext';
import { Certificado } from '../../../types/empresa';
import { Eye, EyeOff } from 'lucide-react';
import { TablesInsert } from '../../../types/supabase';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
  certificateType: 'ECNPJ' | 'ECPF';
  currentCert?: Certificado;
}

const inputClasses = "w-full bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm p-2 text-white focus:ring-blue-500 focus:border-blue-500";
const labelClasses = "block text-xs text-gray-400 mb-1";

const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, companyId, certificateType, currentCert }) => {
  const { saveCertificado } = useCompanies();
  const { showToast } = useContext(ToastContext);
  
  const [formData, setFormData] = useState<Partial<TablesInsert<'certificados'>>>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(currentCert || { tipo: certificateType, status: 'Válido', empresa_id: companyId });
    }
  }, [isOpen, currentCert, certificateType, companyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, arquivo_nome: e.target.files![0].name }));
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.apelido || !formData.data_validade) {
      showToast('Apelido e Data de Validade são obrigatórios.', 'error');
      return;
    }
    
    if (!formData.senha) {
      showToast('A senha do certificado é obrigatória.', 'error');
      return;
    }
    
    await saveCertificado(formData as TablesInsert<'certificados'>);
    showToast(`Certificado ${certificateType} salvo com sucesso!`, 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Gerenciar Certificado ${certificateType}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={labelClasses}>Tipo de Certificado</label>
          <input value={certificateType} className={`${inputClasses} cursor-not-allowed bg-gray-900/50`} readOnly disabled />
        </div>
        <div>
          <label className={labelClasses}>Apelido do Certificado*</label>
          <input name="apelido" value={formData.apelido || ''} onChange={handleChange} className={inputClasses} required />
        </div>
        <div>
          <label className={labelClasses}>Emitido por</label>
          <input name="emitido_por" value={formData.emitido_por || ''} onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Data de Validade*</label>
          <input type="date" name="data_validade" value={formData.data_validade || ''} onChange={handleChange} className={inputClasses} required />
        </div>
        <div>
          <label className={labelClasses}>Arquivo do Certificado (.pfx, .p12)</label>
          <input type="file" accept=".pfx,.p12" onChange={handleFileChange} className={`${inputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700`} />
        </div>
        <div className="relative">
          <label className={labelClasses}>Senha do Certificado*</label>
          <input 
            type={showPassword ? 'text' : 'password'}
            name="senha"
            value={formData.senha || ''}
            onChange={handleChange}
            className={inputClasses} 
            required 
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-gray-400 hover:text-white">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div>
            <label className={labelClasses}>Status</label>
            <select name="status" value={formData.status || 'Válido'} onChange={handleChange} className={inputClasses}>
                <option>Válido</option>
                <option>Expirado</option>
                <option>Pendente</option>
                <option>Revogado</option>
            </select>
        </div>
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-800/50">
          <button type="button" onClick={onClose} className="bg-gray-800/50 hover:bg-gray-700/50 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            Cancelar
          </button>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CertificateModal;

import React, { useState, useEffect, useContext } from 'react';
import Modal from '../../../components/Modal';
import { Socio } from '../../../types/empresa';
import { useCompanies } from '../../../contexts/CompanyContext';
import { ToastContext } from '../../../contexts/ToastContext';
import InputMask from './InputMask';
import { TablesInsert, TablesUpdate } from '../../../types/supabase';

interface SocioModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
  capitalSocial: number;
  socioToEdit?: Socio;
}

const inputClasses = "w-full bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm p-2 text-white focus:ring-blue-500 focus:border-blue-500";
const labelClasses = "block text-xs text-gray-400 mb-1";

type FormData = Partial<TablesInsert<'socios'>>;

const getInitialFormData = (companyId: string): FormData => ({
    nome: '',
    cpf: '',
    data_entrada: '',
    status: 'Ativo',
    valor_integralizado: 0,
    participacao_percentual: 0,
    empresa_id: companyId
});

const SocioModal: React.FC<SocioModalProps> = ({ isOpen, onClose, companyId, capitalSocial, socioToEdit }) => {
  const { createSocio, updateSocio } = useCompanies();
  const { showToast } = useContext(ToastContext);
  const [formData, setFormData] = useState<FormData>(getInitialFormData(companyId));

  useEffect(() => {
    if (isOpen) {
      if (socioToEdit) {
        setFormData(socioToEdit);
      } else {
        setFormData(getInitialFormData(companyId));
      }
    }
  }, [socioToEdit, isOpen, companyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    if (name === 'valor_integralizado') {
        const valor = parseFloat(value) || 0;
        const participacao_percentual = capitalSocial > 0 ? (valor / capitalSocial) * 100 : 0;
        setFormData(prev => ({ ...prev, valor_integralizado: valor, participacao_percentual }));
        return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.cpf || !formData.data_entrada) {
      showToast('Preencha os campos obrigatórios (Nome, CPF, Data de Entrada).', 'error');
      return;
    }

    if (socioToEdit) {
      const { id, created_at, updated_at, ...updateData } = formData;
      await updateSocio(socioToEdit.id, updateData as TablesUpdate<'socios'>);
      showToast('Sócio atualizado com sucesso!', 'success');
    } else {
      await createSocio(formData as TablesInsert<'socios'>);
      showToast('Sócio adicionado com sucesso!', 'success');
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={socioToEdit ? 'Editar Sócio' : 'Adicionar Sócio'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClasses}>Nome*</label><input name="nome" value={formData.nome || ''} onChange={handleChange} className={inputClasses} required /></div>
            <div><label className={labelClasses}>CPF*</label><InputMask mask="cpf" name="cpf" value={formData.cpf || ''} onChange={handleChange} className={inputClasses} required /></div>
            <div><label className={labelClasses}>Data de Entrada*</label><input type="date" name="data_entrada" value={formData.data_entrada || ''} onChange={handleChange} className={inputClasses} required /></div>
            <div><label className={labelClasses}>Status*</label><select name="status" value={formData.status || 'Ativo'} onChange={handleChange} className={inputClasses}><option>Ativo</option><option>Inativo</option></select></div>
            <div>
                <label className={labelClasses}>Valor Integralizado (R$)*</label>
                <input
                    type="number"
                    step="0.01"
                    name="valor_integralizado"
                    value={formData.valor_integralizado || 0}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                />
            </div>
            <div>
                <label className={labelClasses}>Participação (%)</label>
                <input
                    type="text"
                    value={`${(formData.participacao_percentual || 0).toFixed(2)}%`}
                    className={`${inputClasses} bg-gray-900/50 cursor-not-allowed`}
                    readOnly
                />
            </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-800/50">
          <button type="button" onClick={onClose} className="bg-gray-800/50 hover:bg-gray-700/50 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            Cancelar
          </button>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            Salvar Sócio
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SocioModal;

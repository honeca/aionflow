import React from 'react';
import PageHeader from '../components/PageHeader';
import { Plus } from 'lucide-react';

const Rules: React.FC = () => {
  const rules = [
    { name: 'Classificar "UBER" como Transporte', condition: 'Descrição contém "UBER"' },
    { name: 'Classificar "IFOOD" como Alimentação', condition: 'Descrição contém "IFOOD"' },
    { name: 'Marcar "ALUGUEL" como Custo Fixo', condition: 'Descrição contém "ALUGUEL"' },
    { name: 'Identificar Salários', condition: 'Histórico corresponde a "PAGTO SALARIO"' },
  ];

  return (
    <div>
      <PageHeader title="Regras do Sistema" />
      <div className="bg-[#0d1b2a] rounded-2xl p-6 border border-gray-800/50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Regras de Classificação</h3>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            <Plus size={18} />
            Adicionar Regra
          </button>
        </div>
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div key={index} className="bg-gray-800/30 p-4 rounded-lg flex justify-between items-center border border-gray-800/50">
              <div>
                <p className="font-semibold text-white">{rule.name}</p>
                <p className="text-sm text-gray-400">{rule.condition}</p>
              </div>
              <button className="text-xs text-gray-400 hover:text-white">Editar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rules;

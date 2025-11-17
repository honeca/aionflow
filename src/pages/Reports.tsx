import React from 'react';
import PageHeader from '../components/PageHeader';
import { FileText, RefreshCw, BarChart2 } from 'lucide-react';

const Reports: React.FC = () => {
  const reports = [
    { title: 'Relatório Financeiro', icon: <BarChart2 className="w-8 h-8 text-blue-400" />, description: 'Análise de fluxo de caixa e DRE.' },
    { title: 'Relatório de Conciliações', icon: <RefreshCw className="w-8 h-8 text-orange-400" />, description: 'Status e pendências da conciliação.' },
    { title: 'Relatório de Documentos', icon: <FileText className="w-8 h-8 text-cyan-400" />, description: 'Documentos fiscais e comprovantes.' },
  ];

  return (
    <div>
      <PageHeader title="Relatórios" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <div key={index} className="bg-[#0d1b2a] rounded-2xl p-6 border border-gray-800/50 flex flex-col justify-between hover:border-gray-700/50 transition-all">
            <div>
              <div className="mb-4">{report.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{report.title}</h3>
              <p className="text-sm text-gray-400 mb-6">{report.description}</p>
            </div>
            <button className="w-full bg-gray-800/50 hover:bg-gray-700/50 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;

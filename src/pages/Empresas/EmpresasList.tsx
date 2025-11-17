import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, X, Loader } from 'lucide-react';
import { useCompanies } from '../../contexts/CompanyContext';
import Badge from './components/Badge';
import CompanyModal from './components/CompanyModal';
import { Empresa } from '../../types/empresa';

const EmpresasList: React.FC = () => {
  const { empresas, loading, error, fetchEmpresas } = useCompanies();
  const [searchTerm, setSearchTerm] = useState('');
  const [regime, setRegime] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const filteredCompanies = useMemo(() => {
    return empresas.filter(company => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        company.nome_fantasia?.toLowerCase().includes(searchTermLower) || 
        company.cnpj?.replace(/[^\d]/g, '').includes(searchTerm.replace(/[^\d]/g, ''));
      
      const matchesRegime = regime === 'Todos' || company.regime_tributario === regime;
      const matchesStatus = status === 'Todos' || company.status_empresa === status;

      return matchesSearch && matchesRegime && matchesStatus;
    });
  }, [searchTerm, regime, status, empresas]);

  const clearFilters = () => {
    setSearchTerm('');
    setRegime('Todos');
    setStatus('Todos');
  };

  const renderTable = () => {
    if (loading) {
      return <div className="text-center py-16"><Loader className="animate-spin mx-auto text-blue-400" /></div>;
    }
    if (error) {
      return <div className="text-center py-16 text-red-400">Erro ao carregar empresas: {error}</div>;
    }
    if (filteredCompanies.length === 0) {
      return (
        <div className="text-center py-16">
          <h3 className="text-lg font-semibold text-white">Nenhuma empresa encontrada</h3>
          <p className="text-gray-400 mt-2 mb-4">Tente ajustar seus filtros ou criar uma nova empresa.</p>
          <button 
            onClick={clearFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-800">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-400">Nome Fantasia</th>
              <th className="p-4 text-sm font-semibold text-gray-400">CNPJ</th>
              <th className="p-4 text-sm font-semibold text-gray-400">Regime Tributário</th>
              <th className="p-4 text-sm font-semibold text-gray-400">Responsável Legal</th>
              <th className="p-4 text-sm font-semibold text-gray-400">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-400">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <tr key={company.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                <td className="p-4 text-white font-medium">
                  <Link to={`/empresas/${company.id}`} className="hover:text-blue-400">{company.nome_fantasia}</Link>
                </td>
                <td className="p-4 text-gray-300">{company.cnpj}</td>
                <td className="p-4 text-gray-300">{company.regime_tributario}</td>
                <td className="p-4 text-gray-300">{company.responsavel_nome}</td>
                <td className="p-4">
                  <Badge variant={company.status_empresa === 'Ativa' ? 'success' : 'neutral'}>{company.status_empresa}</Badge>
                </td>
                <td className="p-4">
                  <Link to={`/empresas/${company.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    Ver Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const selectClasses = "bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm p-2 text-white focus:ring-blue-500 focus:border-blue-500";

  return (
    <>
      <CompanyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Empresas</h1>
            <p className="text-gray-400 mt-1">Empresas conectadas ao AionFlow.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Plus size={18} />
            Nova Empresa
          </button>
        </div>

        <div className="bg-[#0d1b2a] rounded-2xl p-4 md:p-6 border border-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Buscar por nome fantasia ou CNPJ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm p-2 pl-10 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select value={regime} onChange={(e) => setRegime(e.target.value)} className={selectClasses}>
              <option value="Todos">Todos os Regimes</option>
              <option value="Simples Nacional">Simples Nacional</option>
              <option value="Lucro Presumido">Lucro Presumido</option>
              <option value="Lucro Real">Lucro Real</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClasses}>
              <option value="Todos">Todos os Status</option>
              <option value="Ativa">Ativa</option>
              <option value="Inativa">Inativa</option>
              <option value="Suspensa">Suspensa</option>
            </select>
            <button onClick={clearFilters} className="flex items-center justify-center gap-2 text-gray-400 hover:text-white text-sm bg-gray-800/50 border border-gray-700/50 rounded-lg">
                <X size={14}/> Limpar filtros
            </button>
          </div>
        </div>
        
        <div className="bg-[#0d1b2a] rounded-2xl border border-gray-800/50">
          {renderTable()}
        </div>
      </div>
    </>
  );
};

export default EmpresasList;

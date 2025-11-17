import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCompanies } from '../../contexts/CompanyContext';
import { ArrowLeft, AlertTriangle, Edit, Trash2, Plus, Loader } from 'lucide-react';
import Badge from './components/Badge';
import TabNav from './components/TabNav';
import DetailCard from './components/DetailCard';
import CompanyModal from './components/CompanyModal';
import CertificateModal from './components/CertificateModal';
import SocioModal from './components/SocioModal';
import { Certificado, Socio } from '../../types/empresa';

const DetailItem = ({ label, value }: { label: string; value?: string | number | React.ReactNode }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-sm font-medium text-white break-words">{value || '–'}</p>
  </div>
);

const EmpresaDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { empresaDetalhada, fetchEmpresaDetalhada, loading, error, deleteSocio } = useCompanies();
  const company = empresaDetalhada;

  const [activeTab, setActiveTab] = useState('Dados Gerais');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [certModalState, setCertModalState] = useState<{isOpen: boolean, tipo: 'ECNPJ' | 'ECPF' | null}>({isOpen: false, tipo: null});
  const [socioModalState, setSocioModalState] = useState<{isOpen: boolean, socio?: Socio}>({isOpen: false});
  const [socioToDelete, setSocioToDelete] = useState<Socio | null>(null);

  useEffect(() => {
    if (id) {
      fetchEmpresaDetalhada(id);
    }
  }, [id, fetchEmpresaDetalhada]);

  const getDaysRemaining = (validade?: string | null) => {
    if (!validade) return undefined;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiryDate = new Date(validade);
    expiryDate.setHours(0,0,0,0);
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const getCertificateStatus = (cert?: Certificado): { variant: 'success' | 'warning' | 'danger' | 'neutral', text: string, color: string } => {
    if (!cert || cert.status === 'Pendente' || cert.status === 'Revogado') {
        return { variant: 'neutral', text: cert?.status || 'Não Cadastrado', color: 'text-gray-400' };
    }
    
    const daysRemaining = getDaysRemaining(cert.data_validade);

    if (daysRemaining === undefined) return { variant: 'neutral', text: 'Data Inválida', color: 'text-gray-400' };
    if (daysRemaining < 0) return { variant: 'danger', text: 'Expirado', color: 'text-red-400' };
    if (daysRemaining <= 60) return { variant: 'warning', text: 'Próximo de vencer', color: 'text-yellow-400' };
    return { variant: 'success', text: 'Válido', color: 'text-green-400' };
  };

  if (loading && !company) {
    return <div className="text-center py-20"><Loader className="animate-spin mx-auto text-blue-400" size={48} /></div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-400">Erro ao carregar dados da empresa: {error}</div>;
  }

  if (!company) {
    return (
      <div className="text-center py-20">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
        <h3 className="mt-4 text-lg font-semibold text-white">Empresa não encontrada</h3>
        <p className="mt-2 text-gray-400">A empresa que você está procurando não existe ou foi movida.</p>
        <Link to="/empresas" className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
          <ArrowLeft size={16} /> Voltar para Empresas
        </Link>
      </div>
    );
  }

  const tabs = ['Dados Gerais', 'Sócios', 'Certificados', 'Configurações'];

  const handleOpenCertModal = (tipo: 'ECNPJ' | 'ECPF') => {
    setCertModalState({ isOpen: true, tipo });
  };
  
  const handleCloseCertModal = () => {
    setCertModalState({ isOpen: false, tipo: null });
  };

  const handleOpenSocioModal = (socio?: Socio) => {
    setSocioModalState({ isOpen: true, socio });
  };

  const handleCloseSocioModal = () => {
    setSocioModalState({ isOpen: false });
  };

  const handleDeleteSocio = (socio: Socio) => {
    if (socioToDelete && socioToDelete.id === socio.id) {
      deleteSocio(socio.id);
      setSocioToDelete(null);
    } else {
      setSocioToDelete(socio);
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dados Gerais':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DetailCard title="Dados da Empresa" className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <DetailItem label="Razão Social" value={company.razao_social} />
                <DetailItem label="Nome Fantasia" value={company.nome_fantasia} />
                <DetailItem label="CNPJ" value={company.cnpj} />
                <DetailItem label="Data de Abertura" value={company.data_abertura ? new Date(company.data_abertura).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : '–'} />
                <DetailItem label="Regime Tributário" value={company.regime_tributario} />
                <DetailItem label="Status" value={<Badge variant={company.status === 'Ativa' ? 'success' : 'neutral'}>{company.status}</Badge>} />
                <DetailItem label="Capital Social" value={company.capital_social?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <DetailItem label="Inscrição Estadual" value={company.ie} />
                <DetailItem label="Inscrição Municipal" value={company.im} />
                <DetailItem label="CNAE Principal" value={company.cnae} />
              </div>
            </DetailCard>
            <div className="space-y-6">
              <DetailCard title="Endereço e Contato">
                <div className="space-y-4">
                  <DetailItem label="Endereço" value={`${company.logradouro}, ${company.numero} - ${company.bairro}, ${company.cidade} - ${company.uf}`} />
                  <DetailItem label="CEP" value={company.cep} />
                  <DetailItem label="E-mail 1" value={company.email1} />
                  <DetailItem label="E-mail 2" value={company.email2} />
                  <DetailItem label="E-mail 3" value={company.email3} />
                  <DetailItem label="Telefone 1" value={company.telefone1} />
                  <DetailItem label="Telefone 2" value={company.telefone2} />
                  <DetailItem label="Telefone 3" value={company.telefone3} />
                </div>
              </DetailCard>
              <DetailCard title="Responsável Legal">
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Nome" value={company.responsavel_nome} />
                  <DetailItem label="CPF" value={company.responsavel_cpf} />
                  <DetailItem label="Função" value={company.responsavel_funcao} />
                  <DetailItem label="RG" value={company.responsavel_rg} />
                  <DetailItem label="Órgão Emissor" value={company.responsavel_orgao_emissor} />
                  <DetailItem label="Data de Emissão" value={company.responsavel_data_emissao_rg ? new Date(company.responsavel_data_emissao_rg).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : '–'} />
                  <DetailItem label="Telefone" value={company.responsavel_telefone} />
                  <DetailItem label="E-mail" value={company.responsavel_email} />
                </div>
              </DetailCard>
            </div>
          </div>
        );
      case 'Sócios':
        const totalParticipacao = company.socios.reduce((acc, socio) => acc + (socio.participacao || 0), 0);
        return (
          <DetailCard title="Quadro Societário">
            <div className="flex flex-wrap justify-between items-baseline mb-4 gap-4">
                <div>
                    <DetailItem label="Capital Social Total" value={company.capital_social?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/>
                    <p className={`text-sm font-bold mt-2 ${totalParticipacao === 100 ? 'text-green-400' : 'text-yellow-400'}`}>
                        Participações somadas: {totalParticipacao.toFixed(2)}%
                        {totalParticipacao !== 100 && <span className="text-xs font-normal"> (Ajustar quadro societário)</span>}
                    </p>
                </div>
                <button onClick={() => handleOpenSocioModal()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors">
                    <Plus size={16} /> Adicionar Sócio
                </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="p-3 text-xs font-semibold text-gray-400">Nome</th>
                    <th className="p-3 text-xs font-semibold text-gray-400">CPF</th>
                    <th className="p-3 text-xs font-semibold text-gray-400">Data de Entrada</th>
                    <th className="p-3 text-xs font-semibold text-gray-400">Participação (%)</th>
                    <th className="p-3 text-xs font-semibold text-gray-400">Valor Integralizado</th>
                    <th className="p-3 text-xs font-semibold text-gray-400">Status</th>
                    <th className="p-3 text-xs font-semibold text-gray-400 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {company.socios.map(socio => (
                    <tr key={socio.id} className="border-b border-gray-800/50">
                      <td className="p-3 text-sm text-white">{socio.nome}</td>
                      <td className="p-3 text-sm text-gray-300">{socio.cpf}</td>
                      <td className="p-3 text-sm text-gray-300">{socio.data_entrada ? new Date(socio.data_entrada).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : '–'}</td>
                      <td className="p-3 text-sm text-gray-300">{socio.participacao?.toFixed(2)}%</td>
                      <td className="p-3 text-sm text-gray-300">{socio.valor_integralizado?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                      <td className="p-3"><Badge variant={socio.status === 'Ativo' ? 'success' : 'neutral'}>{socio.status}</Badge></td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button onClick={() => handleOpenSocioModal(socio)} className="p-1 text-gray-400 hover:text-blue-400"><Edit size={16} /></button>
                           <button onBlur={() => setSocioToDelete(null)} onClick={() => handleDeleteSocio(socio)} className={`p-1 text-gray-400 hover:text-red-400 ${socioToDelete?.id === socio.id ? 'text-red-400' : ''}`}>
                                {socioToDelete?.id === socio.id ? 'Confirmar?' : <Trash2 size={16} />}
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DetailCard>
        );
      case 'Certificados':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(['ECNPJ', 'ECPF'] as const).map(tipo => {
              const certificado = company.certificados.find(c => c.tipo === tipo);
              const statusInfo = getCertificateStatus(certificado);
              const daysRemaining = getDaysRemaining(certificado?.data_validade);

              return (
                <DetailCard key={tipo} title={`Certificado ${tipo}`}>
                  {certificado ? (
                    <div className="space-y-4">
                      <DetailItem label="Apelido" value={certificado.apelido} />
                      <DetailItem label="Emitido Por" value={certificado.emitido_por} />
                      <DetailItem label="Validade" value={certificado.data_validade ? new Date(certificado.data_validade).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : '–'} />
                      <DetailItem 
                        label="Dias Restantes" 
                        value={<span className={statusInfo.color}>{daysRemaining !== undefined ? `${daysRemaining} dias` : '–'}</span>} 
                      />
                      <DetailItem label="Nome do Arquivo" value={certificado.arquivo_nome} />
                      <DetailItem label="Senha" value="********" />
                      <div>
                        <p className="text-xs text-gray-400">Status</p>
                        <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
                      </div>
                      <button 
                        onClick={() => handleOpenCertModal(tipo)}
                        className="w-full mt-4 bg-gray-800/50 hover:bg-gray-700/50 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Gerenciar Certificado
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-400 text-sm mb-4">Nenhum certificado {tipo} cadastrado.</p>
                        <button 
                            onClick={() => handleOpenCertModal(tipo)}
                            className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            Adicionar Certificado
                        </button>
                    </div>
                  )}
                </DetailCard>
              );
            })}
          </div>
        );
      case 'Configurações':
        return <DetailCard title="Configurações da Empresa"><p className="text-gray-400">Seção de configurações em desenvolvimento.</p></DetailCard>;
      default:
        return null;
    }
  };

  return (
    <>
      <CompanyModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} companyToEdit={company} />
      {certModalState.isOpen && certModalState.tipo && (
          <CertificateModal 
            isOpen={certModalState.isOpen}
            onClose={handleCloseCertModal}
            companyId={company.id}
            certificateType={certModalState.tipo}
            currentCert={company.certificados.find(c => c.tipo === certModalState.tipo)}
          />
      )}
      {socioModalState.isOpen && (
          <SocioModal
            isOpen={socioModalState.isOpen}
            onClose={handleCloseSocioModal}
            companyId={company.id}
            capitalSocial={company.capital_social || 0}
            socioToEdit={socioModalState.socio}
          />
      )}
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{company.nome_fantasia}</h1>
            <p className="text-gray-400 mt-1">{company.cnpj}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={company.status === 'Ativa' ? 'success' : 'neutral'}>{company.status}</Badge>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="bg-gray-800/50 hover:bg-gray-700/50 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Editar Dados
            </button>
            <Link
              to="/empresas"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <ArrowLeft size={16} />
              Voltar
            </Link>
          </div>
        </div>

        <TabNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div>{renderTabContent()}</div>
      </div>
    </>
  );
};

export default EmpresaDetalhes;

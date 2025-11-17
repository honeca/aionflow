export type ContatosEmpresa = {
  telefone?: string;
  email1?: string;
  email2?: string;
  email3?: string;
  whatsapp1?: string;
  whatsapp2?: string;
  whatsapp3?: string;
};

export type ResponsavelLegal = {
  nome?: string;
  cpf?: string;
  telefone?: string;
  email?: string;
  rg?: string;
  orgaoEmissor?: string;
  dataEmissaoRg?: string;
  funcao?: string;
};

export type SocioEmpresa = {
  id: string;
  nome: string;
  cpf: string;
  dataEntrada?: string;
  valorIntegralizado?: number;
  participacao?: number;
  status: "Ativo" | "Inativo";
};

export type CertificadoDigital = {
  tipo: 'eCNPJ' | 'eCPF';
  apelido: string;
  validade: string;
  senha?: string;
  arquivo?: string;
  emitidoPor?: string;
  status: 'Válido' | 'Expirado' | 'Pendente' | 'Revogado';
};

export type Empresa = {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  dataAbertura?: string;
  regimeTributario: "Simples Nacional" | "Lucro Presumido" | "Lucro Real";
  status: "Ativa" | "Inativa" | "Suspensa";
  ie?: string;
  im?: string;
  cnae?: string;

  endereco: {
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
  };

  contatos: ContatosEmpresa;
  responsavelLegal: ResponsavelLegal;
  capitalSocial?: number;

  socios: SocioEmpresa[];
  certificados: {
    eCnpj?: CertificadoDigital;
    eCpf?: CertificadoDigital;
  };
  configuracoes: {
    conciliacao: 'Manual' | 'Semi-automática' | 'Automática';
    permitirClienteConciliar: boolean;
    permitirEscritorioConciliar: boolean;
    notificacoes: {
      vencimentoCertificado: boolean;
      pendenciasConciliacao: boolean;
      resumoFinanceiro: boolean;
    };
  };
};

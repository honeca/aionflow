import React from 'react';

const StatCards: React.FC = () => {
  const stats = [
    {
      label: 'Empresas ativas',
      value: '24',
      chart: (
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
          <path d="M0 25 L15 20 L30 22 L45 15 L60 10" stroke="#3b82f6" strokeWidth="2" fill="none"/>
          <path d="M0 25 L15 20 L30 22 L45 15 L60 10 L60 30 L0 30 Z" fill="url(#blue-gradient)" opacity="0.3"/>
          <defs>
            <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      bg: 'from-blue-900/20 to-blue-800/10'
    },
    {
      label: 'Lançamentos do mês',
      value: '6.789',
      chart: (
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
          <path d="M0 20 L15 22 L30 18 L45 20 L60 15" stroke="#eab308" strokeWidth="2" fill="none"/>
          <path d="M0 20 L15 22 L30 18 L45 20 L60 15 L60 30 L0 30 Z" fill="url(#yellow-gradient)" opacity="0.3"/>
          <defs>
            <linearGradient id="yellow-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eab308"/>
              <stop offset="100%" stopColor="#eab308" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      bg: 'from-yellow-900/20 to-yellow-800/10'
    },
    {
      label: 'Conciliações concluídas',
      value: '845',
      chart: (
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
          <path d="M0 18 L15 20 L30 15 L45 22 L60 20" stroke="#f97316" strokeWidth="2" fill="none"/>
          <path d="M0 18 L15 20 L30 15 L45 22 L60 20 L60 30 L0 30 Z" fill="url(#orange-gradient)" opacity="0.3"/>
          <defs>
            <linearGradient id="orange-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316"/>
              <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      bg: 'from-orange-900/20 to-orange-800/10'
    },
    {
      label: 'Saúde financeira média',
      value: '4,5',
      chart: (
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
          <path d="M0 22 L15 18 L30 20 L45 16 L60 18" stroke="#06b6d4" strokeWidth="2" fill="none"/>
          <path d="M0 22 L15 18 L30 20 L45 16 L60 18 L60 30 L0 30 Z" fill="url(#cyan-gradient)" opacity="0.3"/>
          <defs>
            <linearGradient id="cyan-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4"/>
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      bg: 'from-cyan-900/20 to-cyan-800/10'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${stat.bg} backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all`}
        >
          <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <div className="mb-1">{stat.chart}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;

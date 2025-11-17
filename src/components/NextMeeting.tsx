import React from 'react';

const NextMeeting: React.FC = () => {
  const vencimentos = [
    {
      dueDate: '10/08/2025',
      description: 'Aluguel Escritório',
      value: 'R$ 4.500,00'
    },
    {
      dueDate: '20/08/2025',
      description: 'DAS Simples Nacional',
      value: 'R$ 1.280,00'
    }
  ];

  return (
    <div className="bg-[#0d1b2a] rounded-2xl p-6 border border-gray-800/50">
      <h3 className="text-lg font-semibold mb-6">Próximos Vencimentos</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vencimentos.map((item, index) => (
          <div key={index} className="bg-gray-800/30 rounded-xl p-4 border border-gray-800/50">
            <p className="text-xs text-gray-400 mb-1">Vence em</p>
            <p className="text-sm font-semibold mb-3">{item.dueDate}</p>
            
            <div>
              <p className="text-sm text-gray-300">{item.description}</p>
              <p className="text-sm font-bold text-white">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextMeeting;

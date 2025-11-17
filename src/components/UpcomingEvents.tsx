import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

const UpcomingEvents: React.FC = () => {
  const events = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-orange-300" />,
      title: 'Prazo final para entrega da ECF se aproxima.',
      date: '31 de Julho, 2025',
      color: 'bg-orange-900/50'
    },
    {
      icon: <Info className="w-6 h-6 text-blue-300" />,
      title: 'Nova regra de ICMS para produtos da cesta básica.',
      date: '01 de Agosto, 2025',
      color: 'bg-blue-900/50'
    }
  ];

  return (
    <div className="bg-[#0d1b2a] rounded-2xl p-6 border border-gray-800/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Avisos Importantes</h3>
        <button className="text-xs text-yellow-500 hover:text-yellow-400">
          Filtrar por Data: Todos
        </button>
      </div>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex gap-4 items-center">
            <div className={`w-12 h-12 rounded-full ${event.color} flex items-center justify-center flex-shrink-0`}>
              {event.icon}
            </div>
            
            <div className="flex-1">
              <p className="text-sm text-gray-300 mb-1">{event.title}</p>
              <p className="text-xs text-gray-500">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;

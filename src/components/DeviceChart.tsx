import React from 'react';

const DeviceChart: React.FC = () => {
  const devices = [
    { name: '35% PIX', color: '#f97316', percentage: 35 },
    { name: '23% Cartão', color: '#3b82f6', percentage: 23 },
    { name: '22% Boletos', color: '#fb923c', percentage: 22 },
    { name: '20% Tarifas', color: '#1e40af', percentage: 20 },
  ];

  return (
    <div className="bg-[#0d1b2a] rounded-2xl p-6 border border-gray-800/50">
      <h3 className="text-lg font-semibold mb-6">Composição dos Lançamentos</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3">
          {devices.map((device, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: device.color }}
              />
              <span className="text-sm text-gray-400">{device.name}</span>
            </div>
          ))}
        </div>
        
        <div className="relative w-48 h-48">
          <svg width="192" height="192" viewBox="0 0 192 192">
            <circle
              cx="96"
              cy="96"
              r="70"
              fill="none"
              stroke="#f97316"
              strokeWidth="28"
              strokeDasharray="154 440"
              transform="rotate(-90 96 96)"
            />
            <circle
              cx="96"
              cy="96"
              r="70"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="28"
              strokeDasharray="101 440"
              strokeDashoffset="-154"
              transform="rotate(-90 96 96)"
            />
            <circle
              cx="96"
              cy="96"
              r="70"
              fill="none"
              stroke="#fb923c"
              strokeWidth="28"
              strokeDasharray="97 440"
              strokeDashoffset="-255"
              transform="rotate(-90 96 96)"
            />
            <circle
              cx="96"
              cy="96"
              r="70"
              fill="none"
              stroke="#1e40af"
              strokeWidth="28"
              strokeDasharray="88 440"
              strokeDashoffset="-352"
              transform="rotate(-90 96 96)"
            />
            
            <circle cx="96" cy="96" r="50" fill="#0d1b2a"/>
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">35%</div>
              <div className="text-xs text-gray-400 mt-1">PIX</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceChart;

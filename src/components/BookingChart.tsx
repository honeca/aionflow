import React from 'react';

const BookingChart: React.FC = () => {
  return (
    <div className="bg-[#0d1b2a] rounded-2xl p-6 border border-gray-800/50">
      <h3 className="text-lg font-semibold mb-6">Fluxo de Caixa vs Receitas</h3>
      
      <div className="relative h-64">
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
          <span>4k</span>
          <span>3k</span>
          <span>2k</span>
          <span>1k</span>
          <span>0</span>
        </div>
        
        <div className="ml-8 h-full relative">
          <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
              </linearGradient>
            </defs>
            
            <path
              d="M0,150 L50,145 L100,140 L150,120 L200,110 L250,90 L300,70 L350,50 L400,40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
            />
            
            <path
              d="M0,150 L50,145 L100,140 L150,120 L200,110 L250,90 L300,70 L350,50 L400,40 L400,200 L0,200 Z"
              fill="url(#area-gradient)"
            />
            
            <circle cx="150" cy="120" r="4" fill="#fff"/>
            <circle cx="250" cy="90" r="4" fill="#fff"/>
            <circle cx="350" cy="50" r="4" fill="#fff"/>
          </svg>
          
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan</span>
            <span>Fev</span>
            <span>Mar</span>
            <span>Abr</span>
            <span>Mai</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingChart;

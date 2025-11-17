import React from 'react';

interface DetailCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-[#0d1b2a] rounded-2xl p-6 border border-gray-800/50 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      {children}
    </div>
  );
};

export default DetailCard;

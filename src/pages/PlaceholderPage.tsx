import React from 'react';
import PageHeader from '../components/PageHeader';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div>
      <PageHeader title={title} />
      <div className="bg-[#0d1b2a] rounded-2xl p-10 border border-gray-800/50 text-center">
        <h3 className="text-lg font-semibold text-white">Página em Construção</h3>
        <p className="text-gray-400 mt-2">O conteúdo para "{title}" estará disponível em breve.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;

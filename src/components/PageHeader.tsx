import React from 'react';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>
  );
};

export default PageHeader;

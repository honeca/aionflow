import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CompanySelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('Soluções Tech Ltda.');
  const companies = ['Soluções Tech Ltda.', 'Agro Forte Exportação', 'Consultoria Futuro'];
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (company: string) => {
    setSelectedCompany(company);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
      >
        <span className="truncate max-w-32 md:max-w-48">{selectedCompany}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#0d1b2a] border border-gray-800/50 rounded-lg shadow-lg z-50">
          <div className="p-2">
            {companies.map((company) => (
              <button
                key={company}
                onClick={() => handleSelect(company)}
                className="w-full text-left flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-gray-800/50 rounded-md"
              >
                <span>{company}</span>
                {selectedCompany === company && <Check size={16} className="text-blue-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanySelector;

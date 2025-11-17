import React, { useState, useRef, useEffect } from 'react';
import { User, ChevronsUpDown, LogOut } from 'lucide-react';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const menuItems = [
    { label: 'Minha conta', icon: <User size={16} /> },
    { label: 'Trocar empresa', icon: <ChevronsUpDown size={16} /> },
    { label: 'Sair', icon: <LogOut size={16} /> },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
        <img
          src="https://i.pravatar.cc/150?img=32"
          alt="Júlia Santos"
          className="w-8 h-8 rounded-full border-2 border-gray-700"
        />
        <span className="hidden sm:inline text-sm font-medium text-gray-300">Júlia Santos</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#0d1b2a] border border-gray-800/50 rounded-lg shadow-lg z-50">
          <div className="p-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800/50 rounded-md"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

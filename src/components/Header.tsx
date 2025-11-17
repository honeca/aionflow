import React from 'react';
import { Menu } from 'lucide-react';
import CompanySelector from './CompanySelector';
import UserMenu from './UserMenu';

interface HeaderProps {
  setSidebarOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0a1628]/80 backdrop-blur-lg border-b border-gray-800/50 px-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-gray-400 hover:text-white"
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>

        {/* Spacer to push right content */}
        <div className="hidden md:block flex-1"></div>

        {/* Right side content */}
        <div className="flex items-center gap-4 md:gap-6">
          <CompanySelector />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;

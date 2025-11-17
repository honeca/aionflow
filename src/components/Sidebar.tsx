import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Building2, FileText, RefreshCw, File, Settings, Users, PieChart, Video, X } from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Building2, label: 'Empresas', path: '/empresas' },
    { icon: FileText, label: 'Extrato Inteligente', path: '/extrato-inteligente' },
    { icon: RefreshCw, label: 'Conciliação', path: '/conciliacao' },
    { icon: File, label: 'Documentos', path: '/documentos' },
    { icon: Settings, label: 'Regras', path: '/regras' },
    { icon: Users, label: 'Usuários', path: '/usuarios' },
    { icon: PieChart, label: 'Relatórios', path: '/relatorios' },
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? 'bg-gray-800/50 text-white'
        : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
    }`;

  const sidebarClasses = `
    fixed left-0 top-0 h-full w-64 bg-[#0d1b2a] border-r border-gray-800 p-6 flex flex-col z-50
    transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0
  `;

  return (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <aside className={sidebarClasses}>
        <div>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">AionFlow</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === '/'}
                className={navLinkClasses}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

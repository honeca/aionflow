import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { CompanyProvider } from './contexts/CompanyContext';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ToastProvider>
      <CompanyProvider>
        <div className="min-h-screen bg-[#0a1628] text-white flex">
          <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          <div className="flex-1 flex flex-col md:ml-64">
            <Header setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </CompanyProvider>
    </ToastProvider>
  );
}

export default App;

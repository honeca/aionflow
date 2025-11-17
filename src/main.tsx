import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Dashboard from './pages/Dashboard.tsx';
import Rules from './pages/Rules.tsx';
import Users from './pages/Users.tsx';
import Reports from './pages/Reports.tsx';
import PlaceholderPage from './pages/PlaceholderPage.tsx';
import EmpresasList from './pages/Empresas/EmpresasList.tsx';
import EmpresaDetalhes from './pages/Empresas/EmpresaDetalhes.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'empresas', element: <EmpresasList /> },
      { path: 'empresas/:id', element: <EmpresaDetalhes /> },
      { path: 'extrato-inteligente', element: <PlaceholderPage title="Extrato Inteligente" /> },
      { path: 'conciliacao', element: <PlaceholderPage title="Conciliação" /> },
      { path: 'documentos', element: <PlaceholderPage title="Documentos" /> },
      { path: 'regras', element: <Rules /> },
      { path: 'usuarios', element: <Users /> },
      { path: 'relatorios', element: <Reports /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

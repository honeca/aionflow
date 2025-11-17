import React from 'react';
import PageHeader from '../components/PageHeader';

const Users: React.FC = () => {
  const users = [
    { name: 'Júlia Santos', email: 'julia.santos@email.com', type: 'Administrador', status: 'Ativo' },
    { name: 'Carlos Andrade', email: 'carlos.andrade@cliente.com', type: 'Usuário', status: 'Ativo' },
    { name: 'Fernanda Lima', email: 'fernanda.lima@cliente.com', type: 'Usuário', status: 'Inativo' },
    { name: 'Ricardo Neves', email: 'ricardo.neves@email.com', type: 'Administrador', status: 'Ativo' },
  ];

  return (
    <div>
      <PageHeader title="Usuários do Sistema" />
      <div className="bg-[#0d1b2a] rounded-2xl p-6 border border-gray-800/50 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-800">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-400">Nome</th>
              <th className="p-4 text-sm font-semibold text-gray-400">E-mail</th>
              <th className="p-4 text-sm font-semibold text-gray-400">Tipo</th>
              <th className="p-4 text-sm font-semibold text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                <td className="p-4 text-white font-medium">{user.name}</td>
                <td className="p-4 text-gray-300">{user.email}</td>
                <td className="p-4 text-gray-300">{user.type}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'Ativo' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

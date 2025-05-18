import React from 'react';
import LeftBar from '@/components/custom-componets/left_bar';
import { useUsersStore } from '@/store/userStore';

const SecretaryDashboard: React.FC = () => {
  const { users } = useUsersStore();
  const role = users[0]?.role || 'admin'; // fallback para admin

  return (
      <div className="flex">
      <LeftBar role={role} />
      <div className="flex-1 p-4">
        {/* Exibindo o título de acordo com o papel do usuário */}
        <h1>Bem-vindo ao painel do {role === 'barbeiro' ? 'Barbeiro' : role.charAt(0).toUpperCase() + role.slice(1)}</h1>
      </div>
    </div> 
  );
};

export default SecretaryDashboard;

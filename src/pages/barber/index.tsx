import React, { useEffect } from 'react';
import LeftBar from '@/components/custom-componets/left_bar';
import { useUsersStore } from '@/store/userStore';

const BarberDashboard: React.FC = () => {
  const { users } = useUsersStore();

  const role = users.length > 0 ? (users[0]?.role as 'admin' | 'barbeiro' | 'secretario') : 'admin';

  // Adicionando logs para monitorar o estado
  useEffect(() => {
    console.log("Users:", users);
    console.log("Role:", role); 

  }, [users, role]);

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

export default BarberDashboard;

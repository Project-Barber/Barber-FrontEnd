import React, { useState } from 'react';
import LeftBar from '@/components/custom-componets/left_bar';
import { useUsersStore } from '@/store/userStore';
import Funcionarios from './funcionarios.tsx';
import Client from './client.tsx';
const AdminDashboard: React.FC = () => {
  const { users } = useUsersStore();
  const [selectedButton, setSelectedButton] = useState<string>('');

  const handleSelect = (selected: string) => {
    setSelectedButton(selected.toLowerCase());
  };

  const role = (users[0]?.role || 'admin') as 'admin' | 'barbeiro' | 'secretario';

  const renderContent = () => {
    switch (selectedButton) {
      case 'funcionários':
        return <Funcionarios />;
      case 'agendamentos':
        return <div>📅 Componente de Agendamentos</div>;
      case 'finanças':
        return <div>💰 Componente de Finanças</div>;
      case 'clientes':
        return <Client />;
      default:
        return <div className="text-gray-500 text-xl p-4">Selecione uma opção no menu ao lado</div>;
    }
  };

  return (
    <div className="flex  ">
      <div className="w-[150px] sm:w-[250px] h-full shadow-md fixed left-0 top-20 bg-zinc-900 z-10">
        <LeftBar role={role} onSelect={handleSelect} />
      </div>

      <div className="ml-[150px] sm:ml-[250px] flex-1 p-6 overflow-y-hidden bg-[#ffff]">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;

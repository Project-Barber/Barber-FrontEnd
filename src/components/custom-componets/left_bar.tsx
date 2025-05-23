import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TbUsers } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";

interface LeftBarProps {
  role?: 'admin' | 'barber' | 'secretary' | 'user'; 
  onSelect?: (selected: string) => void; // função para repassar o botão clicado
}

const LeftBar: React.FC<LeftBarProps> = ({ role, onSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setSelected(label);
    onSelect?.(label); // chama o callback se estiver definido
  };

  if (!role) {
    console.warn("⚠️ Role não definido no LeftBar, ocultando menu.");
    return null;
  }

  const buttonClass = "w-full justify-start hover:text-[#ffff] text-[#ffff] bg-[#393535]  cursor-pointer";

  return (
    <div className="flex flex-col w-[250px] h-screen bg-[#393535] shadow-md p-4 space-y-3">
      {(role === 'admin' || role === 'secretary') && (
        <>
          <Button className={buttonClass} onClick={() => handleClick("Agendamentos")}>
            <CiCalendar /> Agendamentos
          </Button>

          {role === 'admin' && (
            <>
              <Button className={buttonClass} onClick={() => handleClick("Funcionários")}>
                <TbUsers /> Funcionários
              </Button>
              <Button className={buttonClass} onClick={() => handleClick("Finanças")}>
                <BiMoneyWithdraw /> Finanças
              </Button>
              <Button className={buttonClass} onClick={() => handleClick("Clientes")}>
                <TbUsers /> Clientes
              </Button>
            </>
          )}
        </>
      )}

      {role === 'barber' && (
        <Button className={buttonClass} onClick={() => handleClick("VerAgendamentos")}>
          <CiCalendar /> Ver Agendamentos
        </Button>
      )}

      {role === 'user' && (
        <Button className={buttonClass} onClick={() => handleClick("MeusAgendamentos")}>
          <CiCalendar /> Meus Agendamentos
        </Button>
      )}
    </div>
  );
};

export default LeftBar;

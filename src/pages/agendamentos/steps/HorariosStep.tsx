// HorariosStep.tsx
import React, { useEffect, useState } from 'react';
import api from '@/apis/apiClient';

interface HorariosStepProps {
  idBarbeiro: string;
  data: string;
  onSelectHorario: (horario: string) => void;
}

const HorariosStep: React.FC<HorariosStepProps> = ({ idBarbeiro, data, onSelectHorario }) => {
  const [horarios, setHorarios] = useState<string[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [selecionado, setSelecionado] = useState<string | null>(null);

  function formatarDataISOparaBR(dataISO: string): string {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  useEffect(() => {
    const buscarHorarios = async () => {
      if (!idBarbeiro || !data) return;

      const dataFormatada = formatarDataISOparaBR(data);
      console.log("Buscando horários com:", { idBarbeiro, data: dataFormatada });

      try {
        const response = await api.get('/agendamentos/horarios-disponiveis', {
          params: { id_barbeiro: idBarbeiro, data: dataFormatada },
        });
        setHorarios(response.data.horarios_disponiveis);
        setErro(null);
      } catch (err: any) {
        console.error("Erro ao buscar horários:", err.response?.data || err.message);
        setErro("Erro ao buscar horários disponíveis.");
      }
    };

    buscarHorarios();
  }, [idBarbeiro, data]);

  const handleSelect = (hora: string) => {
    setSelecionado(hora);
    onSelectHorario(hora);
  };

  return (
    <div className="min-h-[400px] bg-white  flex flex-col items-center ml-11 space-y-4">
      <h2 className="text-xl font-bold mb-4">Selecione um horário</h2>
      {erro && <p className="text-red-500 mb-2">{erro}</p>}
      <div className="grid grid-cols-3 gap-3.5 w-[390px]  border-2 border-gray-200  rounded-lg p-4 shadow-2xs h-[195px] justify-center items-center">
        {horarios.map((hora) => (
          <button
            key={hora}
            onClick={() => handleSelect(hora)}
            className={`border p-2  transition-colors duration-200 rounded-md w-24 h-12 cursor-pointer
            ${selecionado === hora ? 'bg-[#C8B101] text-white' : 'text-black'}
              ${selecionado === hora ? 'bg-[#dfcc38]' : 'bg-white hover:bg-gray-100'}`}
          >
            {hora}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HorariosStep;

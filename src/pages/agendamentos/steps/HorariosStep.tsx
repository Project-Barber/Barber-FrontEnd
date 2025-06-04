// HorariosStep.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    <div>
      <h2>Selecione um horário</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {horarios.map((hora) => (
          <button
            key={hora}
            onClick={() => handleSelect(hora)}
            style={{
              backgroundColor: selecionado === hora ? 'lightblue' : 'white',
              border: '1px solid #ccc',
              padding: '8px',
              cursor: 'pointer',
            }}
          >
            {hora}
          </button>
        ))}
      </div>
    </div>
  );
};


export default HorariosStep;

import React, { useEffect, useState } from 'react';
import api from '@/apis/apiClient';

interface Servico {
  id: string;
  nome: string;
}

interface Props {
  value: string[];
  onChange: (val: string[]) => void;
}

const ServicoStep: React.FC<Props> = ({ value, onChange }) => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get('/agendamentos/services', {
          withCredentials: true,
        });
        setServicos(response.data.services);
      } catch (err) {
        setError('Erro ao carregar serviços');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServicos();
  }, []);

  const handleCheckboxChange = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(item => item !== id));
    } else {
      onChange([...value, id]);
    }
  };

  if (loading) return <p>Carregando serviços...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-xl mx-auto mt-[-50px] p-4 bg-white rounded-lg shadow-md ml-6">
      <h2 className="font-semibold text-lg mb-3">Selecione os serviços:</h2>
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2 w-12"></th>
              <th className="px-2 py-2">Serviço</th>
              <th className="px-2 py-2 w-8">...</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map(servico => (
              <tr key={servico.id} className="border-t">
                <td className="px-2 py-2 text-center ">
                  <input
                    type="checkbox"
                    checked={value.includes(servico.id)}
                    onChange={() => handleCheckboxChange(servico.id)}
                    className="form-checkbox  cursor-pointer h-4 w-4 text-[#C8B101] focus:ring-[#C8B101] focus:ring-opacity-50"
                  />
                </td>
                <td className="px-2 py-2">{servico.nome}</td>
                <td className="px-2 py-2 text-center">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-2 ">
        <p className="text-sm">
          Serviços selecionados: <strong>{value.length}</strong>
        </p>
      </div>

     
    </div>
  );
};

export default ServicoStep;

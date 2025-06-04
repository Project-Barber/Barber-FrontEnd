import React from 'react';

interface FormData {
  barbeiro: string;
  servicos: string[];
  data: string;
  horario: string;
  tempoEstimado: string;
}

interface ResumoStepProps {
  data: FormData;
}

const ResumoStep: React.FC<ResumoStepProps> = ({ data }) => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-lg font-semibold mb-4">Resumo do agendamento:</h2>
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm text-left border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium">Barbeiro</td>
              <td className="px-4 py-2">{data.barbeiro}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium">Quantidade de serviços</td>
              <td className="px-4 py-2">{data.servicos.length}</td>
            </tr>
            {data.servicos.map((servico, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 font-medium">{servico}</td>
                <td className="px-4 py-2">1x</td>
              </tr>
            ))}
            <tr className="border-b">
              <td className="px-4 py-2 font-medium">Data</td>
              <td className="px-4 py-2">{data.data}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium">Horário</td>
              <td className="px-4 py-2">{data.horario}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Tempo estimado</td>
              <td className="px-4 py-2">{data.tempoEstimado}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <button
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded"
          onClick={() => alert('Agendado com sucesso!')}
        >
          Agendar
        </button>
      </div>
    </div>
  );
};

export default ResumoStep;

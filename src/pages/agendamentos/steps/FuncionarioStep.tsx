import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from "@/apis/apiClient";


interface FuncionarioStepProps {
  value: string; // ID selecionado
  onChange: (value: string) => void; // função para atualizar o estado no componente pai
}

export default function FuncionarioStep({ value, onChange }: FuncionarioStepProps) {
  const [barbeiros, setBarbeiros] = useState<Usuario[]>([]);

useEffect(() => {
  const fetchBarbeiros = async () => {
    try {
      const token = localStorage.getItem('token'); // ou de onde você guarda
        console.log('[LOG] Token:', token);
      const response = await api.get('/usuarios/exibir/todos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const todosUsuarios: Usuario[] = response.data.usuarios;
      const apenasBarbeiros = todosUsuarios.filter(user => user.tipo_usuario === 'barber');
      setBarbeiros(apenasBarbeiros);

    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  fetchBarbeiros();
}, []);


  const handleSelecionar = (id: number) => {
    onChange(id.toString());
    const barbeiroSelecionado = barbeiros.find(barbeiro => barbeiro.id === id);
    console.log('[LOG] Selecionado:', barbeiroSelecionado?.email);
  };

  return (
    <div className="min-h-[400px] bg-white p-0 items-center flex flex-col justify-center space-y-4">
      <h2 className="text-2xl font-bold mb-4">Selecione um Barbeiro</h2>

      <ul className="space-y-4 overflow-y-auto max-h-[350px]">
        {barbeiros.map((barbeiro) => (
          <li key={barbeiro.id}>
            <button
              onClick={() => handleSelecionar(barbeiro.id)}
              className={`w-full flex items-center rounded-lg p-4 text-left transition cursor-pointer 
                ${value === barbeiro.id.toString() ? 'border-2 border-[#C8B101]' : 'bg-white border-2 border-black hover:bg-gray-200'}`}
            >
              {barbeiro.imagem ? (
                <img
                  src={barbeiro.imagem}
                  alt={`Imagem de ${barbeiro.nome}`}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 mr-4 text-xs">
                  Sem imagem
                </div>
              )}
              <div>
                <p className="text-lg font-medium">{barbeiro.nome}</p>
                <p className="text-sm text-gray-500">{barbeiro.descricao || 'Sem descrição'}</p>
                {barbeiro.avaliacao && (
                  <p className="text-sm text-yellow-600">
                    Avaliação: {barbeiro.avaliacao.toFixed(1)}{' '}
                    {barbeiro.avaliacao >= 4 ? '⭐⭐⭐⭐⭐' : barbeiro.avaliacao >= 3 ? '⭐⭐⭐⭐' : barbeiro.avaliacao >= 2 ? '⭐⭐⭐' : barbeiro.avaliacao >= 1 ? '⭐⭐' : '⭐'}
                  </p>
                )}
                <p className="text-sm text-gray-600">ID: {barbeiro.id}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      
    </div>
  );
}

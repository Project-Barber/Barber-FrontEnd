import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'react-hot-toast';
import api from '@/apis/apiClient';
import FuncionarioStep from './steps/FuncionarioStep';
import ServicoStep from './steps/ServicoStep';
import DataStep from './steps/DataStep';
import HorariosStep from './steps/HorariosStep';
import AgendamentoConfirmado from './AgendamentoConfirmado';

type AgendamentoSchema = {
  funcionario: string;
  servico: string[];  // array para múltipla seleção
  data: string;
  hora: string;
};

const Agendamentos: React.FC = () => {
  const [step, setStep] = useState(0);
  const [agendamentoFinalizado, setAgendamentoFinalizado] = useState(false);
  const [formData, setFormData] = useState<AgendamentoSchema>({
    funcionario: '',
    servico: [],
    data: '',
    hora: '',
  });

  const updateForm = (field: keyof AgendamentoSchema, value: string) => {
    console.log(`[LOG] Atualizando campo '${field}' para:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    console.log('[LOG] Dados atuais do formulário:', formData);
  }, [formData]);

  const validarStepAtual = (): boolean => {
    if (step === 0 && !formData.funcionario) {
      toast.error('Por favor, selecione um barbeiro antes de continuar.');
      return false;
    }
    if (step === 1 && !formData.data) {
      toast.error('Por favor, selecione uma data.');
      return false;
    }
    if (step === 3 && (!formData.servico || formData.servico.length === 0)) {
      toast.error('Por favor, selecione um serviço.');
      return false;
    }
    return true;
  };

  const next = () => {
    console.log('[LOG] Tentando avançar para o próximo passo');
    if (validarStepAtual()) {
      setStep(prev => prev + 1);
    }
  };

  const back = () => {
    console.log('[LOG] Voltando para o passo anterior');
    setStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!formData.funcionario || !formData.data || !formData.hora || !formData.servico.length) {
        toast.error('Preencha todos os campos antes de confirmar.');
        return;
      }

      const [ano, mes, dia] = formData.data.split('-');
      const dataFormatada = `${dia}/${mes}/${ano}`;

      const payload = {
        id_barbeiro: formData.funcionario,
        data: dataFormatada,
        hora_inicio: formData.hora,
        ids_servicos: formData.servico.map(Number)
      };

      console.log('[LOG] Payload enviado:', payload);

      const response = await api.post('/agendamentos/', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success('Agendamento confirmado com sucesso!');
      setAgendamentoFinalizado(true);
      console.log('[LOG] Sucesso:', response.data);
    } catch (error: any) {
      console.error('[ERRO]', error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Erro ao realizar agendamento');
    }
  };

  const resetAgendamento = () => {
    setFormData({
      funcionario: '',
      servico: [],
      data: '',
      hora: '',
    });
    setStep(0);
    setAgendamentoFinalizado(false);
  };

  const renderStep = () => {
    console.log('[LOG] Renderizando etapa:', step);
    switch (step) {
      case 0:
        return <FuncionarioStep value={formData.funcionario} onChange={val => updateForm('funcionario', val)} />;
      case 1:
        return <DataStep value={formData.data} onChange={val => updateForm('data', val)} />;
      case 2:
        return <HorariosStep idBarbeiro={formData.funcionario} data={formData.data} onSelectHorario={val => updateForm('hora', val)} />;
      case 3:
        return <ServicoStep value={formData.servico} onChange={val => updateForm('servico', val)} />;
      default:
        return null;
    }
  };

  if (agendamentoFinalizado) {
    return (
      <div className="flex justify-center items-center h-full py-6 bg-white">
        <Toaster position="top-right" />
        <Card className="shadow-md rounded-md p-8 max-w-md w-full text-center">
          <AgendamentoConfirmado />
          <Button className="mt-6 cursor-pointer" onClick={resetAgendamento}>Agendar novo</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full py-6 bg-white">
      <Toaster position="top-right" />
      <Card className="flex flex-row h-full shadow-md rounded-l-md max-w-4xl w-full">
        <div className="w-[400px] h-full relative hidden sm:flex">
          <img src="src/assets/pexels-cottonbro-3992862 1.png" alt="Imagem" className="w-full h-full object-cover rounded-l-md" />
          <img src="src/assets/paulista-logo-branco-removebg-preview 2.png" alt="Logo" className="top-20 left-25 w-70 h-70 object-cover absolute" />
        </div>

        <div className="flex flex-col px-6 py-6 w-[400px] max-w-[550px] h-full">
          <CardContent className="flex flex-col py-8 items-center gap-4">
            {renderStep()}

            <div className="flex gap-2 mt-6 justify-center items-center w-full ml-12">
              {step > 0 && <Button onClick={back} className='cursor-pointer'>Voltar</Button>}
              {step < 3 ? (
                <Button className="cursor-pointer text-white" onClick={next}>Próximo</Button>
              ) : (
                <Button onClick={handleSubmit} className='cursor-pointer'>Confirmar</Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Agendamentos;

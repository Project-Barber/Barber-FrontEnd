import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'react-hot-toast';

import FuncionarioStep from './steps/FuncionarioStep';
import ServicoStep from './steps/ServicoStep';
import DataStep from './steps/DataStep';
import ResumoStep from './steps/ResumoStep';

type AgendamentoSchema = {
  funcionario: string;
  cliente: string;
  servico: string;
  data: string;
  hora: string;
};

const Agendamentos: React.FC = () => {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<AgendamentoSchema>({
    funcionario: '',
    cliente: '',
    servico: '',
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
    // Exemplo simples de validação: no step 0, o barbeiro deve estar selecionado
    if (step === 0 && !formData.funcionario) {
      toast.error('Por favor, selecione um barbeiro antes de continuar.');
      return false;
    }
    // Você pode adicionar outras validações para os passos seguintes aqui
    if (step === 1 && !formData.servico) {
      toast.error('Por favor, selecione um serviço.');
      return false;
    }
    if (step === 2) {
      if (!formData.data) {
        toast.error('Por favor, selecione uma data.');
        return false;
      }
      if (!formData.hora) {
        toast.error('Por favor, selecione uma hora.');
        return false;
      }
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

  const handleSubmit = () => {
    console.log('[LOG] Submetendo dados:', formData);
    toast.success('Agendamento confirmado com sucesso!');
    // Aqui você pode adicionar o envio real para a API, Firebase, etc.
  };

  const renderStep = () => {
    console.log('[LOG] Renderizando etapa:', step);
    switch (step) {
      case 0:
        return <FuncionarioStep value={formData.funcionario} onChange={val => updateForm('funcionario', val)} />;
      case 1:
        return <ServicoStep value={formData.servico} onChange={val => updateForm('servico', val)} />;
      case 2:
        return (
          <DataStep
            data={formData.data}
            hora={formData.hora}
            onChangeData={val => updateForm('data', val)}
            onChangeHora={val => updateForm('hora', val)}
          />
        );
      case 3:
        return <ResumoStep data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-full py-6 bg-white">
      <Toaster position="top-right" />
      <Card className="flex flex-row h-full shadow-md rounded-l-md">
        <div className="w-[400px] h-full relative hidden sm:flex">
          <img src="src/assets/pexels-cottonbro-3992862 1.png" alt="Imagem" className="w-full h-full object-cover rounded-l-md" />
          <img src="src/assets/paulista-logo-branco-removebg-preview 2.png" alt="Logo" className="top-20 left-25 w-70 h-70 object-cover absolute" />
        </div>

        <div className="flex flex-col px-6 py-6 w-[400px] max-w-[550px] h-full">
          <CardContent className="flex flex-col py-8 items-center gap-4">
            {renderStep()}

            <div className="flex gap-2 mt-6">
              {step > 0 && <Button onClick={back}>Voltar</Button>}
              {step < 3 ? (
                <Button className="cursor-pointer text-white" onClick={next}>Próximo</Button>
              ) : (
                <Button onClick={handleSubmit}>Confirmar</Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Agendamentos;

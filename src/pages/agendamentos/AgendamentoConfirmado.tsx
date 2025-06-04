import React from 'react';
import { CheckCircle } from 'lucide-react'; // ou outro ícone

const AgendamentoConfirmado = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <CheckCircle color="#4BB543" size={48} />
      <h2>Agendamento realizado com sucesso!</h2>
      <p>Você receberá uma confirmação por e-mail em breve.</p>
    </div>
  );
};

export default AgendamentoConfirmado;

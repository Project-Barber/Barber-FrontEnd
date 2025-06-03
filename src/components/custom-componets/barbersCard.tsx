import React from 'react';
import { CalendarDays, Image as ImageIcon } from 'lucide-react';

type BarbersCardProps = {
  name: string;
};

const BarbersCard = ({ name }: BarbersCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden w-full max-w-sm">
      <div className="bg-gray-200 h-60 flex items-center justify-center">
        <ImageIcon className="w-10 h-10 text-gray-500" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">Especialista em barba</p>
        <p className="text-sm text-gray-700 mb-4">
          Informações do profissional como perfil, histórico, currículo, etc..
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 border border-gray-300 rounded-full text-sm">
            Cabelo
          </span>
          <span className="px-3 py-1 border border-gray-300 rounded-full text-sm">
            Barba
          </span>
          <span className="px-3 py-1 border border-gray-300 rounded-full text-sm">
            Skinkare
          </span>
        </div>

        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition">
          <CalendarDays className="w-4 h-4" />
          Ver horários
        </button>
      </div>
    </div>
  );
};

export default BarbersCard;


import React from 'react';
import { Facebook, Instagram, Twitter, Copyright } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Paulista Barber Shop</h4>
          <p>
            Estilo e precisão em cada corte. <br />
            A melhor experiência em barbearia
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contato</h4>
          <p>contato@paulistabarbershop.com</p>
          <p>(83) 99999-9999</p>
          <p>Rua dos patos, 500 - Patos</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Horário de funcionamento</h4>
          <p>Segunda à sexta: 8h às 18h</p>
          <p>Sábado: 8h às 12h</p>
          <p>Domingo: Fechado</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Redes sociais</h4>
          <div className="flex gap-4 mt-2">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-gray-400" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-gray-400" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-gray-400" />
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-700 mt-10 pt-6 text-center text-xs text-gray-400 flex justify-center items-center gap-2">
        <Copyright className="w-4 h-4" />
        <span>2025 Paulista Barber Shop. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
};

export default Footer;
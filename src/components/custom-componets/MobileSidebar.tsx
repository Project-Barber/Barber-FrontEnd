import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, logout } = useAuth();
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
        onClick={onClose}
      ></div>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-[#393535] z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:hidden`}
      >
        <div className="flex flex-col p-6 gap-6 h-full">
          <div className="flex justify-end">
            <button onClick={onClose} className="text-white text-2xl">
              ×
            </button>
          </div>

          {!isAuthenticated ? (
            <div className="flex flex-col gap-6 items-center">
              <Link to="/scheduling" onClick={onClose}>
                <button className="text-base font-semibold text-white hover:text-gray-300 select-none">
                  Agendar
                </button>
              </Link>
              <Link to="/register" onClick={onClose}>
                <button className="text-base font-semibold text-white hover:text-gray-300 select-none">
                  Cadastre-se
                </button>
              </Link>
              <Link to="/login" onClick={onClose}>
                <Button className="w-full text-white bg-[#7B1216] hover:bg-[#7b1215dc] select-none">
                  Entrar
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6 items-center">
              
              <Button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full text-white bg-[#7B1216] hover:bg-[#7b1215dc] select-none"
              >
                Sair
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;

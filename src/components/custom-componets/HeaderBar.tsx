import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import MobileSidebar from "./MobileSidebar";

export function HeaderBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-20 items-center bg-[#393535] justify-between px-6 sm:px-64 shadow-md">
      <Link to={"/"}>
        <img
          src="src/assets/paulista-logo-branco-removebg-preview 2.png"
          alt="logo-rcc-pb"
          className="h-32 w-auto sm:h-24 mt-14 md:h-[200px] md:mt-24 select-none"
          draggable="false" 
        />
      </Link>

      {/* Botão de abrir sidebar no mobile */}
      <div className="flex items-center gap-5 sm:hidden">
        <Button onClick={toggleSidebar} className="bg-transparent text-white hover:text-gray-300">
          ☰
        </Button>
      </div>

      {/* Botões normais em telas grandes */}
      <div className="hidden sm:flex items-center gap-5">
        <button className="font-semibold hover:cursor-pointer text-white hover:text-gray-300 select-none">
          Sobre
        </button>
        <Link to={"/register"}>
          <button className="font-semibold hover:cursor-pointer text-white hover:text-gray-300 select-none">
            Cadastre-se
          </button>
        </Link>
        <Button className="w-28 text-white bg-[#7B1216] hover:bg-[#7b1215dc] hover:cursor-pointer hover:text-gray-300 select-none">
          Login
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import MobileSidebar from "./MobileSidebar";
import { useAuth} from '@/hooks/useAuth'; 
import { LogIn } from "lucide-react";


export function HeaderBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const { isAuthenticated } = useAuth(); 
   const { logout } = useAuth();


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-20 items-center bg-[#393535] justify-between px-6 sm:px-64 shadow-md">
      <Link to={"/"}>
        <img
          src="src\assets\paulista-logo-branco-removebg-preview 3.png"
          alt="logo-barber-pb"
          className="max-w-[150px] h-auto mt-0 select-none"
          draggable="false"
        />
      </Link>

      <div className="flex items-center gap-5 sm:hidden">
        <Button onClick={toggleSidebar} className="bg-transparent text-white hover:text-gray-300" >
          ☰
        </Button>
      </div>

    {!isAuthenticated &&   
      <div className={`hidden sm:flex items-center gap-5 `}>
        <button className="font-semibold hover:cursor-pointer text-white hover:text-gray-300 select-none">
          Sobre
        </button>
        <Link to={"/register"}>
          <button className="font-semibold hover:cursor-pointer text-white hover:text-gray-300 select-none">
            Cadastre-se
          </button>
        </Link>
        <Link to={"/login"}>
          <Button className="w-28 text-white bg-[#7B1216] hover:bg-[#7b1215dc] hover:cursor-pointer hover:text-gray-300 select-none">
            Entrar
            <LogIn/>
          </Button>
        </Link>
      </div>
      }
      {isAuthenticated && 
            <div className={`hidden sm:flex items-center gap-5 `}>
       
        
       
          <Button onClick={logout} className="w-28 text-white bg-[#7B1216] hover:bg-[#7b1215dc] hover:cursor-pointer hover:text-gray-300 select-none">
            Sair
          </Button>
        
      </div>
}

      <MobileSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
}

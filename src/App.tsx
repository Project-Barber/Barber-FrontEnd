import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/landing';
import Cadastro from './pages/cadastro';
import { HeaderBar } from '@/components/custom-componets/HeaderBar';
import { Toaster } from 'react-hot-toast';
import Login from './pages/login';
import AdminDashboard from './pages/admin';
import SecretaryDashboard from './pages/secretary';
import BarberDashboard from './pages/barber';
import { useAuth } from '@/hooks/useAuth'; 
import Agendamentos from "@/pages/agendamentos";


function App() {
  const { isAuthenticated } = useAuth(); 

  return (
    <>
      <div>
        <Toaster position="top-right" />
        <div className="fixed top-0 left-0 w-full z-50 dow">
          <HeaderBar />
        </div>
        <div className="pt-20 h-screen">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/scheduling" element={<Agendamentos/>} />

            
            <Route
              path="/secretary/*"
              element={isAuthenticated ? <SecretaryDashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/admin/*"
              element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/barber/*"
              element={isAuthenticated ? <BarberDashboard /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

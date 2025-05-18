import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/landing';
import Cadastro from './pages/cadastro';
import { HeaderBar } from '@/components/custom-componets/HeaderBar';
import { Toaster } from 'react-hot-toast';
import Login from './pages/login';
import AdminDashboard from './pages/admin';
import SecretaryDashboard from './pages/secretary';
import BarberDashboard from './pages/barber';
import { useAuth } from '@/hooks/useAuth'; // Importando o hook de autenticação

function App() {
  const { isAuthenticated } = useAuth(); // Verifica se o usuário está autenticado

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

            {/* Verifica se o usuário está autenticado antes de acessar as rotas protegidas */}
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

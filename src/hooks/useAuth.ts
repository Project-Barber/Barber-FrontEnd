// src/hooks/useAuth.tsx
import { useEffect, useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import api from "../apis/apiClient";
import { UserAuth } from "@/types/users-type";
import { useUsersStore } from '@/store/userStore';


// Tipagem do estado de autenticação
interface AuthState {
  user: UserAuth | null;
  setUser: (user: UserAuth) => void;
  clearUser: () => void;
}

// Store Zustand para gerenciamento de estado global
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: UserAuth) => set({ user }),
  clearUser: () => set({ user: null }),
}));

// Hook principal de autenticação
export const useAuth = () => {
  const { user, setUser, clearUser } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Recupera dados do localStorage ao montar o componente
  useEffect(() => {
    const autoLogin = async () => {
      const storedData = localStorage.getItem("authData");
      if (storedData) {
        try {
          const parsedData: UserAuth = JSON.parse(storedData);

          // Verifica validade do token
          if (parsedData.expiresAt && Date.now() > parsedData.expiresAt) {
            logout();
            return;
          }

          // Valida o token com o backend
          await api.get("/validate-token", {
            headers: { Authorization: `Bearer ${parsedData.token}` },
          });

          setUser(parsedData);
        } catch (err) {
          console.error("Falha no auto-login:", err);
          logout();
        }
      }
    };

    autoLogin();
  }, [setUser]);

  // Função de login
  const login = useCallback(
    async (email: string, senha: string) => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await api.post("/usuarios/login", { email, senha });
        const { token, tipo_usuario, expiresIn } = response.data;
  
        const authData: UserAuth = {
          email,
          token,
          role: tipo_usuario, // Armazenando o role
          expiresAt: Date.now() + (expiresIn || 3600) * 1000, // Default 1 hora
        };
  
        // Armazena dados no localStorage
        localStorage.setItem("authData", JSON.stringify(authData));
        useUsersStore.getState().setUsers([{ email, role: tipo_usuario }]); // Atualiza com o novo usuário logado
        setUser(authData);
        // Atualiza estado global
        setUser(authData);
  
        // Aqui está o console.log com role, token e email
        console.log("Login bem-sucedido!");
        console.log("Email:", email);
        console.log("Role:", tipo_usuario);
        console.log("Token:", token);
  
        // Verificando o valor de 'role' no localStorage
        const storedData = localStorage.getItem("authData");
        if (storedData) {
          const parsedData: UserAuth = JSON.parse(storedData);
          console.log("Role salvo no localStorage:", parsedData.role);  // Verifique se o 'role' foi salvo corretamente no localStorage
        }
  
        // Redireciona
        if (tipo_usuario === "admin") {
          navigate("/admin", { replace: true });
        } else if (tipo_usuario === "user") {
          navigate("/user", { replace: true });
        } else if (tipo_usuario === "barber") {
          navigate("/barber", { replace: true });
        } else {
          navigate("/secretary", { replace: true });
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || err.message || "Erro ao realizar login";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUser]
  );
  

  // Função de logout
  const logout = useCallback(() => {
    // Limpa localStorage
    localStorage.removeItem("authData");

    // Limpa estado global
    clearUser();

    // Remove token dos headers do axios
    delete api.defaults.headers.common["Authorization"];

    // Redireciona para login
    navigate("/login", { replace: true });
  }, [clearUser, navigate]);

  // Verifica autenticação
  const isAuthenticated = useMemo(() => {
    if (!user || !user.token) return false;

    // Verifica expiração
    if (user.expiresAt && Date.now() > user.expiresAt) {
      logout();
      return false;
    }

    return true;
  }, [user, logout]);

  // Retorno do hook
  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };
};

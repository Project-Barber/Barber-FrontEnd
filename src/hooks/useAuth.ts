  // src/hooks/useAuth.tsx
  import { useEffect, useCallback, useState, useMemo } from "react";
  import { useNavigate } from "react-router-dom";
  import { create } from "zustand";
  import api from "../apis/apiClient";
  import { UserAuth } from "@/types/users-type";
  import { useUsersStore } from '@/store/userStore';


  interface AuthState {
    user: UserAuth | null;
    setUser: (user: UserAuth) => void;
    clearUser: () => void;
  }

  export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user: UserAuth) => set({ user }),
    clearUser: () => set({ user: null }),
  }));

  export const useAuth = () => {
    const { user, setUser, clearUser } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const autoLogin = async () => {
        const storedData = localStorage.getItem("authData");
        if (storedData) {
          try {
            const parsedData: UserAuth = JSON.parse(storedData);

            if (parsedData.expiresAt && Date.now() > parsedData.expiresAt) {
              logout();
              return;
            }

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
            role: tipo_usuario, 
            expiresAt: Date.now() + (expiresIn || 3600) * 1000, 
          };
    
          localStorage.setItem("authData", JSON.stringify(authData));
          useUsersStore.getState().setUsers([{ email, role: tipo_usuario }]);
          setUser(authData);
          setUser(authData);
    
          console.log("Login bem-sucedido!");
        
    
          const storedData = localStorage.getItem("authData");
          if (storedData) {
            const parsedData: UserAuth = JSON.parse(storedData);
            console.log("Role salvo no localStorage:", parsedData.role);
          }
    
          
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
      localStorage.removeItem("authData");

      clearUser();

      delete api.defaults.headers.common["Authorization"];

      navigate("/login", { replace: true });
    }, [clearUser, navigate]);

    const isAuthenticated = useMemo(() => {
      if (!user || !user.token) return false;

      if (user.expiresAt && Date.now() > user.expiresAt) {
        logout();
        return false;
      }

      return true;
    }, [user, logout]);

    return {
      user,
      isAuthenticated,
      loading,
      error,
      login,
      logout,
    };
  };

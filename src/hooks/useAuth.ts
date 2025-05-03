import { useState } from "react";
import api from "../apis/apiClient"; // Ajuste para o seu cliente API
import { useUsersStore } from "../store/userStore"; // Se estiver usando Zustand ou Redux
import { UserType } from "../types/users-type";
import toast from "react-hot-toast";

export const useLogin = () => {
  const { setUsers } = useUsersStore(); // Para atualizar o estado global, se necessário
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para login
  const loginUser = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<{ token: string; user: UserType }>("/usuarios/login", {
        email,
        password,
      });

      // Salva o token e os dados do usuário no estado global ou localStorage
      localStorage.setItem("authToken", response.data.token); // Pode ser JWT
      setUsers([response.data.user]); // Atualiza o estado global com os dados do usuário logado

      toast.success("Login realizado com sucesso!");
    } catch (err) {
      console.error(err);
      setError("E-mail ou senha inválidos");
      toast.error("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    return Boolean(localStorage.getItem("authToken"));
  };

  // Função para logout
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    setUsers([]); // Limpa o estado do usuário
    toast.success("Você saiu da sua conta!");
  };

  return {
    loginUser,
    isAuthenticated,
    logoutUser,
    loading,
    error,
  };
};

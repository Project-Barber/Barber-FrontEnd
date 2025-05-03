import api from "../apis/apiClient";
import { useUsersStore } from "../store/userStore";
import { UserType } from "../types/users-type";
import { useState } from "react";

export const useUsers = () => {
  const {
    users,
    setUsers,
    create,
    getUserById,
  } = useUsersStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criação de usuário com base no tipo UserType
  const createUser = async (user: UserType): Promise<UserType | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<UserType>("/usuarios/cadastrar", user);
      create(response.data);
      return response.data;
    } catch (err) {
      setError("Erro ao criar usuário");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Busca de usuários
  const getUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<UserType[]>("/users");
      setUsers(response.data);
    } catch (err) {
      setError("Erro ao buscar usuários");
    } finally {
      setLoading(false);
    }
  };
  

  return {
    users,
    createUser,
    getUsers,
    getUserById,
    loading,
    error,
  };
};

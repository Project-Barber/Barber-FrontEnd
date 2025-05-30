import api from "../apis/apiClient";
import { useUsersStore } from "../store/userStore";
import { UserType,UserRegisterFuncionarioType  } from "../types/users-type";
import { useState } from "react";
  import { useNavigate } from "react-router-dom";

export const useUsers = () => {
  const {
    users,
    setUsers,
    create,
    getUserById,
  } = useUsersStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   const navigate = useNavigate();

  // Criação de usuário com base no tipo UserType
  const createUser = async (user: UserType): Promise<UserType | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<UserType>("/usuarios/cadastrar", user);
      create(response.data);
      return { ...response.data, role: "barbeiro" };
    } catch (err) {
      setError("Erro ao criar usuário");
      return null;
    } finally {
      setLoading(false);
      navigate("/login", { replace: true });

    }
  };
  const createUserBarbeiro = async (user: UserRegisterFuncionarioType): Promise<UserType | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<UserRegisterFuncionarioType>("/usuarios/cadastrar/barbeiro", user);
      create(response.data);
      return { ...response.data, role: "barbeiro" };
    } catch (err) {
      setError("Erro ao criar usuário");
      return null;
    } finally {
      setLoading(false);
    }
  };
   const createUserSecretario = async (user: UserRegisterFuncionarioType): Promise<UserType | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<UserRegisterFuncionarioType>("/usuarios/cadastrar/secretario", user);
      create(response.data);
      return { ...response.data, role: "secretario" };
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
      const response = await api.get<UserType[]>("/usuarios/exibir");
      setUsers(response.data);
    } catch (err) {
      setError("Erro ao buscar usuários");
    } finally {
      setLoading(false);
    }
  };
  

  return {
    users,
    createUserBarbeiro,
    createUserSecretario,
    createUser,
    getUsers,
    getUserById,
    loading,
    error,
  };
};

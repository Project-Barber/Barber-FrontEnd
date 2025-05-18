// src/types/users-type.ts
export interface UserType {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  data_nascimento: string; // formato ISO (YYYY-MM-DD)
  telefone: string;
  endereco: string;
  role: string;  
  }
  export interface UserRoleType {
    role: string;
  }
  export interface UserLoginType {
    email: string;
    senha: string;
  }  
  export interface UserAuth {
    email: string;
    token: string;
    role: string;
    expiresAt?: number;
  }
  export interface UserRegisterFuncionarioType {
    nome: string;
    email: string;
    telefone: string;
    data_nascimento: string;
    senha: string;
    endereco: string;
    tipo_usuario: string;
    avaliacao: number;
    descricao?: string | null;  // <- Verifique se está aqui
    imagem?: string | null;     // <- Verifique se está aqui
  }
  
// src/types/users-type.ts
export interface UserType {
    id?: string; // opcional para não dar erro no POST
    nome: string;
    email: string;
    senha: string;
    data_nascimento: string; // formato ISO (YYYY-MM-DD)
    telefone: string;
    endereco: string;
  }
  
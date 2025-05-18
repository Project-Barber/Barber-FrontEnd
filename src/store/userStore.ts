import { create } from 'zustand';
import { UserType } from '@/types/users-type'; 

interface userStoreProps {
  users: Partial<UserType>[];
  create: (user: Partial<UserType>) => void;
  setUsers: (users: Partial<UserType>[]) => void;
  getUserById: (id: string) => Partial<UserType> | null;
  clearUsers: () => void;
}

export const useUsersStore = create<userStoreProps>((set, get) => ({
  users: [],

  create: (user) => set((state) => ({ users: [...state.users, user] })),

  setUsers: (users) => set(() => ({ users })),

  getUserById: (id: string) => {
    const state = get();
    const user = state.users.find((user) => user?.id === id);
    return user ?? null;
  },

  clearUsers: () => set(() => ({ users: [] })),
}));

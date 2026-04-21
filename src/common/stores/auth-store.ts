import { create } from 'zustand';
import type { UserProfile, Permission, ResponseLogin } from '../types';


const key_local = 'user-vera';
interface AuthState {
  user: UserProfile | null;
  permissions: Permission[] | null;
  loginUser: (res: ResponseLogin) => void;
  logoutUser: () => void;
  loadLocal: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  permissions: null,

  loginUser: (res) => {
    const saved = {
      user: res.user,
      permissions: res.user.permissions,
    };

    set(saved);
    localStorage.setItem(key_local, JSON.stringify(saved));
  },

  logoutUser: () => {
    set({ user: null, permissions: null });
    localStorage.removeItem(key_local);
  },

  loadLocal: () => {
    const raw = localStorage.getItem(key_local);
    if (!raw) return;
    const parsed = JSON.parse(raw) as {
      user: UserProfile;
      permissions: Permission[];
    };
    set(parsed);
  },
}));

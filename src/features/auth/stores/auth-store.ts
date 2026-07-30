import { create } from 'zustand';
import type { UserProfile, Permission, ResponseLogin } from '../types';
import { configureApiAuthHandlers } from '@/common/services/api.service';
import { ERRORS } from '../const/errors';


const key_local = 'user-vera';
interface AuthState {
  user: UserProfile | null;
  permissions: Permission[] | null;
  mfaPending: boolean;
  setMfaPending: (value: boolean) => void;
  loginUser: (res: ResponseLogin) => void;
  logoutUser: () => void;
  loadLocal: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  permissions: null,
  mfaPending: false,

  setMfaPending: (value) => set({ mfaPending: value }),

  loginUser: (res) => {
    const saved = {
      user: res.user,
      permissions: res.user.permissions,
    };

    set({ ...saved, mfaPending: false });
    localStorage.setItem(key_local, JSON.stringify(saved));
  },

  logoutUser: () => {
    set({ user: null, permissions: null, mfaPending: false });
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

configureApiAuthHandlers({
  isMfaPendingCode: (code) => Number(code) === ERRORS.MFA_PENDING,
  onMfaPending: () => useAuthStore.getState().setMfaPending(true),
  onUnauthorized: () => {
    useAuthStore.getState().logoutUser();
    if (globalThis.location.pathname !== '/auth/login') {
      globalThis.location.href = '/auth/login';
    }
  },
  onForbidden: () => {
    if (globalThis.location.pathname !== '/unauthorized') {
      globalThis.location.href = '/unauthorized';
    }
  },
});

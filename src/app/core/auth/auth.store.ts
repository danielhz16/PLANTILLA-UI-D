import { Injectable, signal, computed } from '@angular/core';
import { ResponseLogin, UserProfile, Permission } from '@features/auth/types';

const STORAGE_KEY = 'user-alelab';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly userSignal = signal<UserProfile | null>(null);
  private readonly permissionsSignal = signal<Permission[] | null>(null);
  private readonly mfaPendingSignal = signal<boolean>(false);

  readonly user = this.userSignal.asReadonly();
  readonly permissions = this.permissionsSignal.asReadonly();
  readonly mfaPending = this.mfaPendingSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.userSignal());

  setMfaPending(value: boolean): void {
    this.mfaPendingSignal.set(value);
  }

  loginUser(res: ResponseLogin): void {
    const user = res.user;
    this.userSignal.set(user);
    this.permissionsSignal.set(user.permissions ?? null);
    this.mfaPendingSignal.set(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, permissions: user.permissions }));
  }

  logoutUser(): void {
    this.userSignal.set(null);
    this.permissionsSignal.set(null);
    this.mfaPendingSignal.set(false);
    localStorage.removeItem(STORAGE_KEY);
  }

  loadLocal(): void {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { user: UserProfile; permissions: Permission[] };
      this.userSignal.set(parsed.user);
      this.permissionsSignal.set(parsed.permissions);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  validatePermission(name: string, level: number): boolean {
    const permissions = this.permissionsSignal() ?? [];
    const match = permissions.filter((p) => p.name === name);
    if (match.length === 0) return false;
    const maxType = Math.max(...match.map((p) => p.type));
    return maxType >= level;
  }
}
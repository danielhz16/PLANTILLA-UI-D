import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthStore } from '@core/auth/auth.store';
import { RequestService } from '@services/request.service';
import { UserAvatarComponent } from '@components/avatar/user-avatar.component';
import { LucideLogOut, LucideSettings, LucideUser, LucideChevronDown } from '@lucide/angular';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatMenuModule, MatDividerModule, UserAvatarComponent, LucideLogOut, LucideSettings, LucideUser, LucideChevronDown],
  template: `
    @if (auth.user(); as user) {
      @if (user) {
        <div class="profile-trigger" [matMenuTriggerFor]="profileMenu" (menuOpened)="menuOpen.set(true)" (menuClosed)="menuOpen.set(false)">
          <span class="profile-avatar-border">
            <app-user-avatar [name]="user.fullName" [size]="40" fontSize="0.9rem"></app-user-avatar>
          </span>
          <div class="profile-info">
            <span class="profile-name">{{ user.fullName }}</span>
            <span class="profile-email">{{ user.email }}</span>
          </div>
          <svg class="chevron" [class.open]="menuOpen()" lucideChevronDown size="18"></svg>
        </div>

        <mat-menu #profileMenu="matMenu" class="profile-menu" [xPosition]="'before'" [yPosition]="'below'" [hasBackdrop]="true" [backdropClass]="''">
          <ng-template matMenuContent>
            <div class="menu-header">
              <app-user-avatar [name]="user.fullName" [size]="48" fontSize="1.1rem"></app-user-avatar>
              <div class="menu-text">
                <div class="menu-title">{{ user.fullName }}</div>
                <div class="menu-subtitle">{{ user.email }}</div>
              </div>
            </div>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="goProfile()">
              <svg lucideUser size="18"></svg>
              <span>Perfil</span>
            </button>
            <button mat-menu-item (click)="goSettings()">
              <svg lucideSettings size="18"></svg>
              <span>Configuración</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item class="logout-item" (click)="handleLogout()">
              <svg lucideLogOut size="18"></svg>
              <span>Cerrar sesión</span>
            </button>
          </ng-template>
        </mat-menu>
      }
    }
  `,
  styles: [`
    .profile-trigger {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 8px;
      border-radius: 12px;
      transition: all 0.2s ease;
    }
    .profile-trigger:hover { background-color: var(--color-hover); }
    .profile-avatar-border { display: flex; flex-shrink: 0; }
    .profile-info { display: flex; flex-direction: column; align-items: flex-start; min-width: 0; }
    .profile-name { font-weight: 600; color: var(--color-text); line-height: 1.2; font-size: 0.875rem; white-space: nowrap; }
    .profile-email { color: var(--color-text); opacity: 0.7; font-size: 0.75rem; white-space: nowrap; }
    .chevron { color: var(--color-text); opacity: 0.7; transition: transform 0.2s ease; flex-shrink: 0; }
    .chevron.open { transform: rotate(180deg); }
    .menu-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 16px 12px 16px;
    }
    .menu-text { display: flex; flex-direction: column; min-width: 0; }
    .menu-title { font-weight: 600; color: var(--color-text); font-size: 0.875rem; white-space: nowrap; }
    .menu-subtitle { color: var(--color-text); opacity: 0.7; font-size: 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .logout-item { color: var(--color-error) !important; }
  `],
})
export class UserProfileComponent {
  readonly menuOpen = signal(false);

  constructor(
    public auth: AuthStore,
    private router: Router,
    private request: RequestService,
  ) {}

  goProfile(): void {
    void this.router.navigate(['/profile']);
  }

  goSettings(): void {
    void this.router.navigate(['/settings']);
  }

  handleLogout(): void {
    const request = this.request.create({ url: 'auth/logout', method: 'POST' });
    void request.execute(null).finally(() => {
      this.auth.logoutUser();
      void this.router.navigate(['/auth/login']);
    });
  }
}
import { Component, computed, signal, OnInit } from '@angular/core';
import { MainCardComponent } from '@components/cards/main-card.component';
import { InfoCardComponent } from '@components/cards/info-card.component';
import { UserAvatarComponent } from '@components/avatar/user-avatar.component';
import { MainButtonComponent } from '@components/buttons/main-button.component';
import { IconComponent } from '@components/icon/icon.component';
import { ModalService } from '@components/modal/modal.service';
import { GetQueryService } from '@services/get-query.service';
import { AuthStore } from '@core/auth/auth.store';
import { CONFIG_MFA } from '@features/profile';
import { TypeMfa, MFA_BACKEND_KEYS } from '@features/profile/enums/mfa';
import { MfaConfigModalComponent } from '@pages/profile/mfa-config-modal.component';
import { MfaSuccessModalComponent } from '@pages/profile/mfa-success-modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MainCardComponent, InfoCardComponent, UserAvatarComponent, MainButtonComponent, IconComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 2.5rem;">
      @if (auth.user(); as user) {
        @if (user) {
          <app-main-card>
            <div style="display: flex; align-items: center; gap: 1.5rem;">
              <app-user-avatar [name]="user.fullName" [size]="64" fontSize="1.5rem"></app-user-avatar>
              <div>
                <div style="font-weight: 800; color: var(--color-text); font-size: 1.4rem;">{{ user.fullName }}</div>
                <div style="color: var(--color-text); opacity: 0.6;">{{ user.email }}</div>
              </div>
            </div>
          </app-main-card>

          <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
            <div style="flex: 1 1 220px; min-width: 220px;">
              <app-info-card label="Correo electrónico" [value]="user.email">
                <span icon><app-icon name="Mail"></app-icon></span>
              </app-info-card>
            </div>
            <div style="flex: 1 1 220px; min-width: 220px;">
              <app-info-card label="Teléfono" [value]="user.phone || '—'">
                <span icon><app-icon name="Phone"></app-icon></span>
              </app-info-card>
            </div>
          </div>
        }
      }

      <app-main-card>
        <div style="font-weight: 700; color: var(--color-text); margin-bottom: 1.25rem;">Verificación en dos pasos</div>
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
          @for (config of configs; track config.id) {
            <div class="mfa-option">
              <div style="font-weight: 600; color: var(--color-text);">{{ config.label }}</div>
              <div class="mfa-desc">{{ config.description }}</div>
              <div class="mfa-status" [class.active]="isActive(config.id)">
                {{ isActive(config.id) ? 'Activado' : 'Desactivado' }}
              </div>
              <div style="margin-top: 1rem;">
                <app-main-button
                  [variant]="isActive(config.id) ? 'outlined' : 'contained'"
                  [color]="isActive(config.id) ? 'error' : 'primary'"
                  (click)="toggleMfa(config.id)"
                  [disabled]="isLoading()"
                >
                  {{ isActive(config.id) ? 'Desactivar' : 'Activar' }}
                </app-main-button>
              </div>
            </div>
          }
        </div>
      </app-main-card>
    </div>
  `,
  styles: [`
    .mfa-option {
      flex: 1 1 240px;
      min-width: 240px;
      padding: 1.25rem;
      border: 1px solid var(--color-border);
      border-radius: 14px;
      background: var(--color-background);
    }
    .mfa-desc { color: var(--color-text); opacity: 0.6; font-size: 0.85rem; margin-top: 0.5rem; line-height: 1.5; }
    .mfa-status { margin-top: 1rem; font-size: 0.8rem; font-weight: 700; color: var(--color-text); opacity: 0.5; }
    .mfa-status.active { color: var(--color-success); opacity: 1; }
  `],
})
export class ProfileComponent implements OnInit {
  readonly configs = CONFIG_MFA;
  readonly optionsActive = signal<Record<string, boolean>>({});
  readonly isLoading = signal(true);

  constructor(
    public auth: AuthStore,
    private getQuery: GetQueryService,
    private modal: ModalService,
  ) {}

  ngOnInit(): void {
    const query = this.getQuery.get<Record<string, boolean>>('/users/mfa');
    void query.refetch().then(() => {
      this.optionsActive.set(query.data() ?? {});
      this.isLoading.set(false);
    });
  }

  isActive(type: number): boolean {
    const key = MFA_BACKEND_KEYS[type];
    if (this.optionsActive()[key] !== undefined) return this.optionsActive()[key];
    switch (type) {
      case TypeMfa.AuthenticatorApp:
        return this.auth.user()?.mfaAuthenticator ?? false;
      case TypeMfa.Email:
        return this.auth.user()?.mfaEmail ?? false;
      case TypeMfa.WhatsApp:
        return this.auth.user()?.mfaWp ?? false;
      default:
        return false;
    }
  }

  toggleMfa(type: number): void {
    const config = this.configs.find((item) => item.id === type);
    if (!config) return;
    const nextState = !this.isActive(type);
    const key = MFA_BACKEND_KEYS[type];

    const dialog = this.modal.open(MfaConfigModalComponent, {
      maxWidth: '480px',
      data: {
        type,
        isDeactivate: !nextState,
        description: nextState ? config.descriptionModal : config.descriptionModalDeactivate,
      },
    });

    dialog.afterClosed().subscribe((result?: { changed?: boolean; activated?: boolean; active?: boolean; show?: string }) => {
      if (!result?.changed) return;
      this.optionsActive.update((prev) => ({ ...prev, [key]: result.active ?? nextState }));
      if (result.activated) {
        this.optionsActive.update((prev) => ({ ...prev, [MFA_BACKEND_KEYS[TypeMfa.AuthenticatorApp]]: true }));
        this.modal.open(MfaSuccessModalComponent, {
          maxWidth: '480px',
          data: { message: result.show ?? 'Autenticación en dos pasos activada exitosamente.' },
        });
      }
    });
  }
}
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLayoutComponent } from '@pages/public/auth/auth-layout.component';
import { MainFormComponent } from '@components/form/main-form.component';
import { MainButtonComponent } from '@components/buttons/main-button.component';
import { MfaModalComponent } from '@pages/public/auth/mfa-modal.component';
import { RequestService } from '@services/request.service';
import { ModalService } from '@components/modal/modal.service';
import { AuthStore } from '@core/auth/auth.store';
import { ERRORS, ResponseLogin } from '@features/auth';
import { Input, f } from '@shared/types/form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthLayoutComponent, MainFormComponent, MainButtonComponent],
  template: `
    <app-auth-layout subtitle="Ingresa tus credenciales para acceder">
      <div class="login-heading">
        <div class="login-title">Iniciar sesión</div>
        <div class="login-subtitle">Accede con tu usuario y contraseña</div>
      </div>

      <app-main-form
        #form
        [inputs]="inputs"
        (onSubmit)="handleSubmit($event)"
        [columns]="1"
      ></app-main-form>

      <app-main-button variant="contained" [gradient]="true" [loading]="isPending()" (click)="form.save()" [fullWidth]="true" class="login-button">
        Acceder
      </app-main-button>

      <div class="login-forgot" (click)="toForgot()">¿Olvidaste tu contraseña?</div>
    </app-auth-layout>
  `,
  styles: [`
    .login-heading { margin-bottom: 4rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .login-title { font-weight: 800; color: var(--color-text); letter-spacing: -0.3px; font-size: 1.5rem; }
    .login-subtitle { color: var(--color-text); opacity: 0.55; font-size: 0.875rem; }
    .login-button { margin-top: 3rem; }
    .login-forgot {
      margin-top: 2.5rem;
      text-align: center;
      color: var(--color-primary);
      cursor: pointer;
      font-weight: 500;
      font-size: 0.875rem;
    }
    .login-forgot:hover { opacity: 0.75; }
  `],
})
export class LoginComponent {
  readonly inputs: Input[] = [
    f.text('username').label('Usuario').value('').required().build(),
    f.password('password').label('Contraseña').value('').required().build(),
  ];

  readonly openMfa = signal(false);
  readonly pendingLogin = signal<ResponseLogin | null>(null);
  readonly isPending = signal(false);

  constructor(
    private request: RequestService,
    private modal: ModalService,
    private auth: AuthStore,
    private router: Router,
  ) {}

  handleSubmit(data: Record<string, unknown>): void {
    const request = this.request.create<ResponseLogin>({ url: 'auth/login', method: 'POST' });
    this.isPending.set(true);
    void request.execute(data).then((res) => {
      if (!res.mfaOk) {
        const dialog = this.modal.open<MfaModalComponent>(MfaModalComponent, {
          data: res,
          maxWidth: '520px',
        });
        dialog.afterClosed().subscribe(() => {
          this.pendingLogin.set(null);
          this.openMfa.set(false);
        });
        this.pendingLogin.set(res);
        this.openMfa.set(true);
        return;
      }
      this.auth.loginUser(res);
      this.pendingLogin.set(null);
      this.openMfa.set(false);
      void this.router.navigate(['/']);
    }).catch((error: unknown) => {
      const code = (error as { code?: number } | null)?.code;
      if (Number(code) === ERRORS.MFA_PENDING) return;
      throw error;
    }).finally(() => this.isPending.set(false));
  }

  toForgot(): void {
    void this.router.navigate(['/auth/forgot']);
  }
}
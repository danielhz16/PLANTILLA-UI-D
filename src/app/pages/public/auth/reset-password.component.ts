import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLayoutComponent } from '@pages/public/auth/auth-layout.component';
import { MainFormComponent } from '@components/form/main-form.component';
import { MainButtonComponent } from '@components/buttons/main-button.component';
import { RequestService } from '@services/request.service';
import { Input, f } from '@shared/types/form';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [AuthLayoutComponent, MainFormComponent, MainButtonComponent],
  template: `
    <app-auth-layout subtitle="Crea una nueva contraseña segura para tu cuenta">
      <div class="auth-heading">
        <div class="auth-title">Restablecer contraseña</div>
        <div class="auth-subtitle">Ingresa tu nueva contraseña</div>
      </div>

      <app-main-form
        #form
        [inputs]="inputs"
        (onSubmit)="handleSubmit($event)"
        [columns]="1"
      ></app-main-form>

      <app-main-button variant="contained" [gradient]="true" [loading]="isPending()" (click)="form.save()" [fullWidth]="true" class="auth-button">
        Restablecer contraseña
      </app-main-button>

      <div class="auth-link" (click)="toLogin()">Volver al inicio de sesión</div>
    </app-auth-layout>
  `,
  styles: [`
    .auth-heading { margin-bottom: 4rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .auth-title { font-weight: 800; color: var(--color-text); letter-spacing: -0.3px; font-size: 1.5rem; }
    .auth-subtitle { color: var(--color-text); opacity: 0.55; font-size: 0.875rem; }
    .auth-button { margin-top: 3rem; }
    .auth-link {
      margin-top: 2.5rem;
      text-align: center;
      color: var(--color-primary);
      cursor: pointer;
      font-weight: 500;
      font-size: 0.875rem;
    }
    .auth-link:hover { opacity: 0.75; }
  `],
})
export class ResetPasswordComponent {
  readonly inputs: Input[] = [
    f.password('newPassword').label('Nueva contraseña').required().minLength(6).build(),
  ];

  readonly isPending = signal(false);

  constructor(
    private request: RequestService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  toLogin(): void {
    void this.router.navigate(['/auth/login']);
  }

  handleSubmit(data: Record<string, unknown>): void {
    const token = this.route.snapshot.paramMap.get('token') ?? '';
    const request = this.request.create({ url: 'auth/reset-password', method: 'PATCH' });
    this.isPending.set(true);
    void request.execute({ ...data, token }).finally(() => {
      this.isPending.set(false);
      this.toLogin();
    });
  }
}
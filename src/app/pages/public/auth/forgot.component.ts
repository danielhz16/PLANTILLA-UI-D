import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLayoutComponent } from '@pages/public/auth/auth-layout.component';
import { MainFormComponent } from '@components/form/main-form.component';
import { MainButtonComponent } from '@components/buttons/main-button.component';
import { LoaderComponent } from '@components/loading/loader.component';
import { RequestService } from '@services/request.service';
import { Input, f } from '@shared/types/form';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [AuthLayoutComponent, MainFormComponent, MainButtonComponent, LoaderComponent],
  template: `
    <app-auth-layout subtitle="Te enviaremos instrucciones a tu correo electrónico">
      <app-loader [isPending]="isPending()"></app-loader>

      <div class="auth-heading">
        <div class="auth-title">Recuperar contraseña</div>
        <div class="auth-subtitle">Ingresa tu usuario y te enviaremos el enlace</div>
      </div>

      <app-main-form
        #form
        [inputs]="inputs"
        (onSubmit)="handleSubmit($event)"
        [columns]="1"
      ></app-main-form>

      <app-main-button variant="contained" [gradient]="true" [loading]="isPending()" (click)="form.save()" [fullWidth]="true" class="auth-button">
        Enviar instrucciones
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
export class ForgotComponent {
  readonly inputs: Input[] = [
    f.text('username').label('Usuario').required().build(),
  ];

  readonly isPending = signal(false);

  constructor(
    private request: RequestService,
    private router: Router,
  ) {}

  toLogin(): void {
    void this.router.navigate(['/auth/login']);
  }

  handleSubmit(data: Record<string, unknown>): void {
    const request = this.request.create({ url: 'auth/forgot-password', method: 'POST' });
    this.isPending.set(true);
    void request.execute(data).finally(() => {
      this.isPending.set(false);
      this.toLogin();
    });
  }
}
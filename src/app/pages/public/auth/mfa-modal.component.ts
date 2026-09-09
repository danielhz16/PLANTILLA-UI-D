import { Component, Inject, signal, QueryList, ViewChildren, ElementRef, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { FormControl } from '@angular/forms';
import { ModalShellComponent } from '@components/modal/modal-shell.component';
import { MainButtonComponent } from '@components/buttons/main-button.component';
import { RequestService } from '@services/request.service';
import { AuthStore } from '@core/auth/auth.store';
import { ResponseLogin, MfaOptions, TypeMfa } from '@features/auth';

const OTP_LENGTH = 6;

const DEFAULT_OPTIONS: MfaOptions = { mfaAuthenticator: false, mfaEmail: true, mfaWp: true };

@Component({
  selector: 'app-mfa-modal',
  standalone: true,
  imports: [ModalShellComponent, MainButtonComponent, MatButtonModule, ReactiveFormsModule],
  template: `
    <app-modal-shell title="Verificación en dos pasos" [description]="description()">
      <div class="mfa-content">
        <div class="mfa-message">{{ primaryMessage() }}</div>

        <form [formGroup]="otpForm" class="otp-row" (paste)="handlePaste($event)">
          @for (i of indices; track i) {
            <input
              #digitRef
              class="otp-input"
              [formControlName]="'digit' + i"
              inputmode="numeric"
              maxlength="1"
              autocomplete="one-time-code"
              (input)="handleDigitInput(i, $event)"
              (keydown)="handleKeydown(i, $event)"
            />
          }
        </form>

        @if (error()) {
          <div class="mfa-error">{{ error() }}</div>
        }

        <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 1.5rem;">
          <app-main-button variant="contained" [loading]="isPending()" (click)="submitCode()" [fullWidth]="true">
            Verificar código
          </app-main-button>

          @for (method of sendMethods(); track method) {
            <app-main-button
              variant="outlined"
              [disabled]="timeLeft() > 0 || isResending()"
              (click)="requestCode(method)"
              [fullWidth]="true"
            >
              {{ sendLabel(method) }}{{ formatTimeLabel(method) }}
            </app-main-button>
          }
        </div>

        <div class="mfa-back" (click)="backToLogin()">Volver a iniciar sesión</div>
      </div>
    </app-modal-shell>
  `,
  styles: [`
    .mfa-content { display: flex; flex-direction: column; gap: 1rem; }
    .mfa-message { color: var(--color-primary); font-weight: 700; text-align: center; margin-bottom: 2rem; font-size: 0.875rem; }
    .otp-row { display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 2rem; }
    .otp-input {
      width: 52px;
      height: 58px;
      text-align: center;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-text);
      background: var(--color-bgInput);
      border: 1px solid var(--color-border);
      border-radius: 14px;
      transition: all 0.2s ease;
      outline: none;
    }
    .otp-input:focus {
      border-color: var(--color-primary);
      border-width: 2px;
      box-shadow: 0 0 0 4px var(--color-primarySoft);
    }
    .otp-input:hover { border-color: var(--color-primary); background: var(--color-hover); }
    .mfa-error { color: var(--color-error); margin-bottom: 1rem; text-align: center; font-size: 0.875rem; }
    .mfa-back {
      margin-top: 1rem;
      text-align: center;
      color: var(--color-primary);
      cursor: pointer;
      font-weight: 500;
      font-size: 0.875rem;
    }
    .mfa-back:hover { opacity: 0.8; }
  `],
})
export class MfaModalComponent implements AfterViewInit {
  private readonly fb = inject(FormBuilder);

  readonly indices = Array.from({ length: OTP_LENGTH }, (_, i) => i);
  readonly otpForm = this.fb.group({
    digit0: ['', Validators.required],
    digit1: ['', Validators.required],
    digit2: ['', Validators.required],
    digit3: ['', Validators.required],
    digit4: ['', Validators.required],
    digit5: ['', Validators.required],
  });

  @ViewChildren('digitRef') digitInputs!: QueryList<ElementRef<HTMLInputElement>>;

  readonly error = signal('');
  readonly timeLeft = signal(0);
  readonly isResending = signal(false);
  readonly isPending = signal(false);
  readonly activeType = signal<number>(TypeMfa.Email);
  readonly timerId = signal<number | undefined>(undefined);

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: ResponseLogin | null | undefined,
    private dialogRef: MatDialogRef<MfaModalComponent>,
    private request: RequestService,
    private auth: AuthStore,
    private router: Router,
  ) {
    const timer = window.setInterval(() => {
      this.timeLeft.update((prev) => Math.max(prev - 1, 0));
    }, 1000);
    this.timerId.set(timer);
  }

  ngOnInit(): void {
    this.activeType.set(this.defaultMethod());
    window.setTimeout(() => this.digitInputs?.first?.nativeElement.focus(), 50);
  }

  private defaultMethod(): number {
    const options = this.options();
    if (options.mfaAuthenticator) return TypeMfa.AuthenticatorApp;
    if (options.mfaEmail) return TypeMfa.Email;
    if (options.mfaWp) return TypeMfa.WhatsApp;
    return TypeMfa.Email;
  }

  ngAfterViewInit(): void {
    this.digitInputs?.first?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.timerId() !== undefined) {
      window.clearInterval(this.timerId());
    }
  }

  options(): MfaOptions {
    const user = this.dialogData?.user;
    return user
      ? {
          mfaAuthenticator: user.mfaAuthenticator ?? false,
          mfaEmail: user.mfaEmail ?? false,
          mfaWp: user.mfaWp ?? false,
        }
      : DEFAULT_OPTIONS;
  }

  description(): string {
    return this.activeType() === TypeMfa.AuthenticatorApp
      ? 'Usa tu aplicación de autenticación para generar el código.'
      : 'Completa la verificación en dos pasos para continuar.';
  }

  primaryMessage(): string {
    switch (this.activeType()) {
      case TypeMfa.AuthenticatorApp:
        return 'Ingresa el código de autenticación';
      case TypeMfa.Email:
        return 'Ingresa el código de 6 dígitos enviado a tu correo electrónico';
      case TypeMfa.WhatsApp:
        return 'Ingresa el código de 6 dígitos enviado a tu WhatsApp';
      default:
        return 'Ingresa el código de 6 dígitos';
    }
  }

  sendMethods(): number[] {
    const options = this.options();
    return [
      ...(options.mfaEmail ? [TypeMfa.Email] : []),
      ...(options.mfaWp ? [TypeMfa.WhatsApp] : []),
    ];
  }

  sendLabel(method: number): string {
    switch (method) {
      case TypeMfa.Email:
        return 'Enviar por correo electrónico';
      case TypeMfa.WhatsApp:
        return 'Enviar por WhatsApp';
      default:
        return 'Reenviar código';
    }
  }

  formatTimeLabel(method: number): string {
    if (this.activeType() !== method || this.timeLeft() <= 0) return '';
    return ` (${this.formatTime(this.timeLeft())})`;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  }

  handleDigitInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    let newValue = input.value.replace(/\D/g, '');
    if (newValue.length > 1) newValue = newValue.slice(0, 1);
    input.value = newValue;
    if (newValue && index < OTP_LENGTH - 1) {
      this.focusDigit(index + 1);
    }
  }

  handleKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.otpForm.get(`digit${index}`)?.value && index > 0) {
      this.focusDigit(index - 1);
    }
  }

  handlePaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = (event.clipboardData?.getData('text') ?? '')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    pasted.split('').forEach((char, i) => {
      (this.otpForm.get(`digit${i}`) as FormControl<string> | null)?.setValue(char);
    });
    this.focusDigit(Math.min(pasted.length, OTP_LENGTH - 1));
  }

  private focusDigit(index: number): void {
    this.digitInputs?.get(index)?.nativeElement.focus();
  }

  submitCode(): void {
    const code = this.indices.map((i) => this.otpForm.get(`digit${i}`)?.value ?? '').join('');
    if (code.length !== OTP_LENGTH) {
      this.error.set('Ingresa los 6 dígitos del código');
      return;
    }

    this.error.set('');
    this.isPending.set(true);
    const request = this.request.create<ResponseLogin>({ url: 'auth/mfa', method: 'POST' });
    void request.execute({
      code,
      type: this.activeType(),
      epoch: Math.floor(Date.now() / 1000),
    }).then((res) => {
      const pending = this.dialogData;
      if (pending) {
        this.auth.loginUser(pending);
      } else if (res.user) {
        this.auth.loginUser(res);
      }
      this.dialogRef.close();
      void this.router.navigate(['/']);
    }).catch((error: unknown) => {
      const err = (error ?? {}) as { apiError?: { message?: string }; message?: string };
      this.error.set(err.apiError?.message || err.message || 'Código incorrecto');
    }).finally(() => this.isPending.set(false));
  }

  requestCode(method: number): void {
    if (this.timeLeft() > 0 || this.isResending()) return;
    this.isResending.set(true);
    this.error.set('');
    this.activeType.set(method);
    const request = this.request.create<{ retryAfter?: number }>({ url: 'auth/mfa/resend', method: 'POST' });
    void request.execute({ type: method }).then((res) => {
      this.timeLeft.set(res?.retryAfter ?? 60);
    }).catch((error: unknown) => {
      const err = (error ?? {}) as { message?: string; retryAfter?: number };
      this.error.set(err.message || 'Error al enviar el código');
      if (err.retryAfter) this.timeLeft.set(err.retryAfter);
    }).finally(() => this.isResending.set(false));
  }

  backToLogin(): void {
    this.dialogRef.close();
    void this.router.navigate(['/auth/login']);
  }
}
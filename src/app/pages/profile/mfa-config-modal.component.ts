import { Component, Inject, signal, viewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideMail, LucideMessageCircle, LucideKeyRound, LucideShieldCheck } from '@lucide/angular';
import QRCode from 'qrcode';
import { ModalShellComponent } from '@components/modal/modal-shell.component';
import { MainButtonComponent } from '@components/buttons/main-button.component';
import { DotLottieComponent } from '@components/animation/dot-lottie.component';
import { RequestService } from '@services/request.service';
import { TypeMfa } from '@features/profile/enums/mfa';

export interface MfaConfigData {
  type: number;
  isDeactivate: boolean;
  description: string;
}

interface MfaConfigResult {
  changed?: boolean;
  activated?: boolean;
  active?: boolean;
  show?: string;
}

interface MfaUpdateResponse {
  urlKey?: string | null;
  show?: string;
}

@Component({
  selector: 'app-mfa-config-modal',
  standalone: true,
  imports: [ModalShellComponent, MainButtonComponent, DotLottieComponent, LucideMail, LucideMessageCircle, LucideKeyRound, LucideShieldCheck],
  template: `
    <app-modal-shell [footerVisible]="true" [title]="titleText()" [description]="descText()">
      <div class="mfa-config-body">
        @if (qrUrl()) {
          <div class="mfa-qr-box">
            <img class="mfa-qr-img" [src]="qrImage()" [style.opacity]="qrImage() ? 1 : 0" alt="Código QR" />
          </div>

          <div class="mfa-otp-group">
            <label class="mfa-otp-label" for="mfa-otp">Código de verificación</label>
            <input
              #otpInput
              id="mfa-otp"
              class="mfa-otp-input"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="6"
              autocomplete="one-time-code"
              placeholder="••••••"
              [value]="otp()"
              (input)="onOtp($event)"
            />
            @if (verifyError()) {
              <div class="mfa-verify-error">{{ verifyError() }}</div>
            }
          </div>
        } @else {
          @if (isAuthenticator()) {
            <app-dot-lottie src="assets/animation/qr.json" [width]="160" [height]="160"></app-dot-lottie>
          } @else {
            <div class="mfa-method-icon" [style.backgroundColor]="iconBg()" [style.color]="iconColor()">
              @if (data.type === typeMfa.AuthenticatorApp) {
                <svg lucideKeyRound size="28"></svg>
              } @else if (data.type === typeMfa.Email) {
                <svg lucideMail size="28"></svg>
              } @else if (data.type === typeMfa.WhatsApp) {
                <svg lucideMessageCircle size="28"></svg>
              } @else {
                <svg lucideShieldCheck size="28"></svg>
              }
            </div>
          }
        }
      </div>

      <ng-container slotActions>
        <app-main-button variant="outlined" (click)="cancel()" [disabled]="loading()">Cancelar</app-main-button>
        <app-main-button [loading]="loading()" [disabled]="!canConfirm()" (click)="confirm()">{{ successText() }}</app-main-button>
      </ng-container>
    </app-modal-shell>
  `,
  styles: `
    .mfa-config-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      min-height: 240px;
      padding: 0.5rem 0;
    }
    .mfa-method-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .mfa-qr-box {
      padding: 1.25rem;
      background: #ffffff;
      border: 1px solid var(--color-border);
      border-radius: 18px;
      box-shadow: var(--color-shadowElevated);
      line-height: 0;
    }
    .mfa-qr-img { width: 180px; height: 180px; transition: opacity 0.2s ease; }
    .mfa-otp-group { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
    .mfa-otp-label { color: var(--color-text); opacity: 0.75; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; }
    .mfa-otp-input {
      width: 240px;
      padding: 10px 16px;
      font-size: 1.25rem;
      font-weight: 600;
      letter-spacing: 14px;
      text-indent: 14px;
      text-align: left;
      color: var(--color-text);
      background: var(--color-bgInput);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      outline: none;
      font-family: inherit;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .mfa-otp-input:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-primarySoft);
    }
    .mfa-verify-error { color: var(--color-error); text-align: center; font-size: 0.85rem; }
  `,
})
export class MfaConfigModalComponent {
  readonly typeMfa = TypeMfa;
  readonly qrUrl = signal('');
  readonly qrImage = signal('');
  readonly otp = signal('');
  readonly verifyError = signal('');
  readonly isPending = signal(false);
  readonly isVerifying = signal(false);

  private readonly otpInputRef = viewChild<ElementRef<HTMLInputElement>>('otpInput');

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: MfaConfigData,
    private dialogRef: MatDialogRef<MfaConfigModalComponent>,
    private request: RequestService,
  ) {}

  isAuthenticator(): boolean {
    return this.data.type === TypeMfa.AuthenticatorApp && !this.data.isDeactivate;
  }

  titleText(): string {
    if (this.qrUrl()) return 'Conecta tu app';
    return this.data.isDeactivate ? 'Desactivar verificación' : 'Activar verificación';
  }

  descText(): string {
    if (this.qrUrl()) {
      return 'Escanea el código QR con tu app de autenticación y escribe el código de 6 dígitos para confirmar.';
    }
    return this.data.description;
  }

  loading(): boolean {
    return this.isPending() || this.isVerifying();
  }

  canConfirm(): boolean {
    if (this.qrUrl()) return this.otp().length === 6;
    return true;
  }

  successText(): string {
    if (this.qrUrl()) return 'Verificar y activar';
    return this.data.isDeactivate ? 'Desactivar' : 'Configurar';
  }

  iconBg(): string {
    if (this.data.isDeactivate) return 'var(--color-warningSoft)';
    switch (this.data.type) {
      case TypeMfa.AuthenticatorApp: return 'var(--color-primarySoft)';
      case TypeMfa.WhatsApp: return 'var(--color-successSoft)';
      default: return 'var(--color-infoSoft)';
    }
  }

  iconColor(): string {
    if (this.data.isDeactivate) return 'var(--color-warning)';
    switch (this.data.type) {
      case TypeMfa.AuthenticatorApp: return 'var(--color-primary)';
      case TypeMfa.WhatsApp: return 'var(--color-success)';
      default: return 'var(--color-primary)';
    }
  }

  onOtp(event: Event): void {
    const value = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 6);
    this.otp.set(value);
    this.verifyError.set('');
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    if (this.qrUrl()) {
      void this.verify();
      return;
    }
    this.isPending.set(true);
    const request = this.request.create<MfaUpdateResponse>({ url: '/users/mfa', method: 'PATCH' });
    void request.execute({ type: this.data.type, value: !this.data.isDeactivate }).then((res) => {
      if (res?.urlKey && this.isAuthenticator()) {
        this.qrUrl.set(res.urlKey);
        void QRCode.toDataURL(res.urlKey, { width: 200, margin: 2 }).then((dataUrl) => this.qrImage.set(dataUrl));
        setTimeout(() => this.otpInputRef()?.nativeElement.focus(), 0);
        return;
      }
      (this.dialogRef as MatDialogRef<MfaConfigModalComponent, MfaConfigResult>).close({ changed: true, active: !this.data.isDeactivate });
    }).finally(() => this.isPending.set(false));
  }

  verify(): void {
    this.isVerifying.set(true);
    this.verifyError.set('');
    const request = this.request.create<MfaUpdateResponse>({ url: '/users/mfa/verify', method: 'POST' });
    void request.execute({ code: this.otp() }).then((res) => {
      (this.dialogRef as MatDialogRef<MfaConfigModalComponent, MfaConfigResult>).close({
        activated: true,
        active: true,
        show: res?.show ?? 'Autenticación en dos pasos activada exitosamente.',
      });
    }).catch((error: unknown) => {
      const err = (error ?? {}) as { apiError?: { message?: string }; message?: string };
      this.verifyError.set(err.apiError?.message || err.message || 'Código inválido');
    }).finally(() => this.isVerifying.set(false));
  }
}
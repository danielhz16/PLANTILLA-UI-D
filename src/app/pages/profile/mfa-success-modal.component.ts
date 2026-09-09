import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalShellComponent } from '@components/modal/modal-shell.component';
import { MainButtonComponent } from '@components/buttons/main-button.component';
import { DotLottieComponent } from '@components/animation/dot-lottie.component';

export interface MfaSuccessData {
  message: string;
}

@Component({
  selector: 'app-mfa-success-modal',
  standalone: true,
  imports: [ModalShellComponent, MainButtonComponent, DotLottieComponent],
  template: `
    <app-modal-shell [footerVisible]="true" title="¡Verificación en dos pasos activada!" description="Tu cuenta ahora está protegida con un segundo factor de seguridad.">
      <div class="mfa-success-body">
        <app-dot-lottie src="assets/animation/secureOk.json" [loop]="false" [width]="170" [height]="170"></app-dot-lottie>
        <div class="mfa-success-message">{{ data.message }}</div>
      </div>

      <ng-container slotActions>
        <app-main-button (click)="close()">Listo</app-main-button>
      </ng-container>
    </app-modal-shell>
  `,
  styles: `
    .mfa-success-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.25rem;
      min-height: 220px;
      padding: 0.5rem 0;
      text-align: center;
    }
    .mfa-success-message { color: var(--color-text); opacity: 0.75; line-height: 1.6; max-width: 360px; font-size: 0.9rem; }
  `,
})
export class MfaSuccessModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: MfaSuccessData,
    private dialogRef: MatDialogRef<MfaSuccessModalComponent>,
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
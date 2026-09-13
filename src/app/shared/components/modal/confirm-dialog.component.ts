import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LucideAlertTriangle, LucideXCircle, LucideInfo, LucideCheckCircle } from '@lucide/angular';
import { MainButtonComponent } from '@components/buttons/main-button.component';

export type ConfirmDialogType = 'warning' | 'error' | 'info' | 'success';

export interface ConfirmDialogData {
  title: string;
  message: string;
  type?: ConfirmDialogType;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'error' | 'warning' | 'success';
  isLoading?: boolean;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatButtonModule, MainButtonComponent, LucideAlertTriangle, LucideXCircle, LucideInfo, LucideCheckCircle],
  template: `
    <div class="ale-confirm">
      <div class="ale-confirm-header">
        <div class="ale-confirm-title">{{ title() }}</div>
        <button class="ale-confirm-close" (click)="close(false)" aria-label="Cerrar">&times;</button>
      </div>

      <div class="ale-confirm-body">
        <div class="ale-confirm-icon" [style.backgroundColor]="iconBg()" [style.color]="iconColor()">
          @switch (type()) {
            @case ('warning') { <svg lucideAlertTriangle size="32"></svg> }
            @case ('error') { <svg lucideXCircle size="32"></svg> }
            @case ('info') { <svg lucideInfo size="32"></svg> }
            @case ('success') { <svg lucideCheckCircle size="32"></svg> }
          }
        </div>
        <div class="ale-confirm-message">{{ message() }}</div>
      </div>

      <div class="ale-confirm-footer">
        <app-main-button variant="outlined" (click)="close(false)" [disabled]="isLoading()">
          {{ cancelText() }}
        </app-main-button>
        <app-main-button (click)="confirm()" [disabled]="isLoading()">
          @if (isLoading()) {
            Procesando...
          } @else {
            {{ confirmText() }}
          }
        </app-main-button>
      </div>
    </div>
  `,
  styles: [`
    .ale-confirm { position: relative; }
    .ale-confirm-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 22px 22px 4px;
    }
    .ale-confirm-title { font-weight: 700; color: var(--color-text); letter-spacing: -0.02em; font-size: 1.3rem; }
    .ale-confirm-close {
      width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--color-border);
      background: var(--color-bgCard); color: var(--color-text); cursor: pointer; font-size: 22px; line-height: 1;
    }
    .ale-confirm-close:hover { color: var(--color-error); border-color: var(--color-error); background: var(--color-errorBg); }
    .ale-confirm-body { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 24px; }
    .ale-confirm-icon { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .ale-confirm-message { color: var(--color-text); text-align: center; opacity: 0.9; line-height: 1.6; }
    .ale-confirm-footer { display: flex; gap: 12px; padding: 20px 22px; }
    .ale-confirm-footer app-main-button { flex: 1; display: block; }
  `],
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) readonly dialogData: ConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {}

  title(): string {
    return this.dialogData?.title ?? '';
  }

  message(): string {
    return this.dialogData?.message ?? '';
  }

  type(): ConfirmDialogType {
    return this.dialogData?.type ?? 'warning';
  }

  confirmText(): string {
    return this.dialogData?.confirmText ?? 'Confirmar';
  }

  cancelText(): string {
    return this.dialogData?.cancelText ?? 'Cancelar';
  }

  confirmColor(): 'primary' | 'error' | 'warning' | 'success' {
    return this.dialogData?.confirmColor ?? 'primary';
  }

  isLoading(): boolean {
    return this.dialogData?.isLoading ?? false;
  }

  iconBg(): string {
    switch (this.type()) {
      case 'error': return 'var(--color-errorSoft)';
      case 'info': return 'var(--color-infoSoft)';
      case 'success': return 'var(--color-successSoft)';
      default: return 'var(--color-warningSoft)';
    }
  }

  iconColor(): string {
    switch (this.type()) {
      case 'error': return 'var(--color-error)';
      case 'info': return 'var(--color-primary)';
      case 'success': return 'var(--color-success)';
      default: return 'var(--color-warning)';
    }
  }

  close(result: boolean): void {
    this.dialogRef.close(result);
  }

  confirm(): void {
    this.close(true);
  }
}
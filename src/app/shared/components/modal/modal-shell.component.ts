import { Component, Inject, input, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LucideX } from '@lucide/angular';
import { MainButtonComponent } from '@components/buttons/main-button.component';

export interface ModalShellData {
  title?: string;
  description?: string;
  maxWidth?: string;
  showButtonSuccess?: boolean;
  showButtonCancel?: boolean;
  successText?: string;
  cancelText?: string;
  disableBackdropClick?: boolean;
  data?: unknown;
}

@Component({
  selector: 'app-modal-shell',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, LucideX, MainButtonComponent],
  template: `
    <div class="ale-modal">
      <div class="ale-modal-header">
        @if (title()) {
          <div class="ale-modal-text">
            <div class="ale-modal-title">{{ title() }}</div>
            @if (description()) {
              <div class="ale-modal-desc">{{ description() }}</div>
            }
          </div>
        }
        <button class="ale-modal-close" (click)="onClose()" aria-label="Cerrar">
          <svg lucideX size="18"></svg>
        </button>
      </div>

      <div class="ale-modal-body">
        <ng-content></ng-content>
      </div>

      @if (showFooter()) {
        <div class="ale-modal-footer">
          <ng-content select="[slotActions]"></ng-content>
          @if (showButtonCancel()) {
            <app-main-button variant="outlined" (click)="onClose()">{{ cancelText() }}</app-main-button>
          }
          @if (showButtonSuccess()) {
            <app-main-button (click)="onSuccess()">{{ successText() }}</app-main-button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .ale-modal { position: relative; display: flex; flex-direction: column; }
    .ale-modal-header {
      position: relative; display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;
      padding: 24px 24px 16px; border-bottom: 1px solid var(--color-border); flex-shrink: 0;
    }
    .ale-modal-text { min-width: 0; padding-top: 2px; }
    .ale-modal-title { font-weight: 700; color: var(--color-text); letter-spacing: -0.02em; font-size: 1.4rem; }
    .ale-modal-desc { color: var(--color-text); opacity: 0.6; font-weight: 400; font-size: 0.875rem; margin-top: 4px; }
    .ale-modal-close {
      width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--color-border);
      background: var(--color-bgCard); color: var(--color-text); opacity: 0.9; cursor: pointer;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0;
      transition: all 0.2s ease;
    }
    .ale-modal-close:hover { opacity: 1; color: var(--color-text); background: var(--color-hover); border-color: var(--color-primary); transform: rotate(90deg); }
    .ale-modal-body { padding: 24px; color: var(--color-text); overflow-y: auto; flex-grow: 1; }
    .ale-modal-footer {
      display: flex; justify-content: flex-end; gap: 12px; padding: 20px 24px;
      border-top: 1px solid var(--color-border); flex-shrink: 0;
    }
  `],
})
export class ModalShellComponent {
  title = input<string>();
  description = input<string>();
  showButtonSuccess = input(false);
  showButtonCancel = input(false);
  successText = input('Aceptar');
  cancelText = input('Cancelar');

  readonly footerVisible = input(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: ModalShellData | undefined,
    private dialogRef: MatDialogRef<unknown>,
  ) {}

  showFooter(): boolean {
    if (this.footerVisible()) return true;
    return !!(this.dialogData?.showButtonSuccess || this.dialogData?.showButtonCancel);
  }

  onClose(): void {
    if (!this.dialogRef) return;
    this.dialogRef.close();
  }

  onSuccess(): void {
    if (!this.dialogRef) return;
    this.dialogRef.close(true);
  }
}
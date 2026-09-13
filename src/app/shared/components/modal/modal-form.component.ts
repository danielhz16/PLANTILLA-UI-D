import { Component, Inject, viewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainButtonComponent } from '@components/buttons/main-button.component';
import { MainFormComponent } from '@components/form/main-form.component';
import { LoaderComponent } from '@components/loading/loader.component';
import { LucideSave, LucideX } from '@lucide/angular';
import { Input } from '@shared/types/form';

export interface ModalFormData {
  title?: string;
  inputs: Input[];
  onSubmit: (data: Record<string, unknown>) => void;
  isLoading?: boolean;
  defaultValues?: Record<string, unknown>;
  columns?: number;
  isPending?: boolean;
  saveLabel?: string;
  cancelLabel?: string;
}

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [MainButtonComponent, MainFormComponent, LoaderComponent, LucideSave, LucideX],
  template: `
    <div class="ale-form-modal">
      <div class="ale-form-modal-header">
        <div class="ale-form-modal-title">{{ data.title ?? 'Formulario' }}</div>
        <button class="ale-form-modal-close" (click)="close()" aria-label="Cerrar">
          <svg lucideX size="18"></svg>
        </button>
      </div>

      <div class="ale-form-modal-body">
        <app-loader [isPending]="data.isPending ?? false"></app-loader>
        <app-main-form
          #form
          [inputs]="data.inputs"
          [isLoading]="data.isLoading ?? false"
          [defaultValues]="data.defaultValues ?? {}"
          [columns]="data.columns"
          (onSubmit)="submit($event)"
        ></app-main-form>
      </div>

      <div class="ale-form-modal-footer">
        <app-main-button variant="outlined" (click)="close()" [disabled]="data.isPending ?? false">
          <svg lucideX size="16"></svg>
          {{ data.cancelLabel ?? 'Cancelar' }}
        </app-main-button>
        <app-main-button (click)="save()" [loading]="data.isPending ?? false">
          <svg lucideSave size="16"></svg>
          {{ data.saveLabel ?? 'Guardar' }}
        </app-main-button>
      </div>
    </div>
  `,
  styles: [`
    .ale-form-modal { position: relative; }
    .ale-form-modal-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 22px 22px 8px;
    }
    .ale-form-modal-title { font-weight: 700; color: var(--color-text); letter-spacing: -0.02em; font-size: 1.3rem; }
    .ale-form-modal-close {
      width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--color-border);
      background: var(--color-bgCard); color: var(--color-text); cursor: pointer;
      display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;
    }
    .ale-form-modal-close:hover { color: var(--color-error); border-color: var(--color-error); background: var(--color-errorBg); transform: rotate(90deg); }
    .ale-form-modal-body { padding: 18px 22px; overflow-y: auto; max-height: 70vh; }
    .ale-form-modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding: 14px 22px 22px; }
  `],
})
export class ModalFormComponent {
  readonly formRef = viewChild<MainFormComponent>('form');

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: ModalFormData,
    private dialogRef: MatDialogRef<ModalFormComponent>,
  ) {}

  submit(data: Record<string, unknown>): void {
    this.data.onSubmit(data);
  }

  save(): void {
    this.formRef()?.save();
  }

  getValue(name: string): unknown {
    return this.formRef()?.getValue(name);
  }

  getValues(): Record<string, unknown> {
    return this.formRef()?.getValues() ?? {};
  }

  close(): void {
    this.dialogRef?.close();
  }
}
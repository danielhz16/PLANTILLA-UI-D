import { Injectable, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalShellComponent, ModalShellData } from '@components/modal/modal-shell.component';

export interface ModalOpenOptions {
  maxWidth?: string | number;
  disableBackdropClick?: boolean;
  panelClass?: string;
  data?: unknown;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private dialog: MatDialog) {}

  open<T>(component: ComponentType<T> | TemplateRef<T>, options: ModalOpenOptions = {}): MatDialogRef<T> {
    const config: MatDialogConfig = {
      maxWidth: options.maxWidth ?? '600px',
      panelClass: ['ale-modal-panel', options.panelClass ?? ''].filter(Boolean),
      backdropClass: 'ale-modal-backdrop',
      disableClose: options.disableBackdropClick ?? false,
      data: options.data,
      autoFocus: false,
    };
    return this.dialog.open(component, config);
  }

  openShell(options: ModalShellData): MatDialogRef<ModalShellComponent> {
    return this.open(ModalShellComponent, {
      maxWidth: options.maxWidth ?? '600px',
      disableBackdropClick: options.disableBackdropClick,
      panelClass: options.showButtonSuccess || options.showButtonCancel ? 'ale-modal-shell' : undefined,
      data: options,
    });
  }
}
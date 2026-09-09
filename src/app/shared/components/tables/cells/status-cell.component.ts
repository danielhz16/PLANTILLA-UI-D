import { Component, input, signal } from '@angular/core';
import { RequestService } from '@services/request.service';
import { ModalService } from '@components/modal/modal.service';
import { ConfirmDialogComponent } from '@components/modal/confirm-dialog.component';
import { Method } from '@shared/const/api';

export interface StatusCellProps {
  id: string | number;
  nameID: string;
  keyCache: string;
  subProp?: string;
  url?: string;
  nameItem?: string;
  table?: string;
}

@Component({
  selector: 'app-status-cell',
  standalone: true,
  template: `
    <div
      class="ale-status"
      [class.active]="isActive()"
      [class.inactive]="!isActive()"
      (click)="openConfirm()"
    >
      {{ isActive() ? 'Activo' : 'Inactivo' }}
    </div>
  `,
  styles: [`
    .ale-status {
      cursor: pointer;
      display: grid;
      place-items: center;
      width: 60px;
      color: var(--color-textOnPrimary);
      border-radius: 4px;
      padding: 2px 0;
      font-size: 12px;
      font-weight: bold;
      user-select: none;
      transition: opacity 0.2s ease;
    }
    .ale-status:hover { opacity: 0.85; }
    .ale-status.active { background-color: var(--color-success); }
    .ale-status.inactive { background-color: var(--color-error); }
  `],
})
export class StatusCellComponent {
  method = input<Method>('PATCH');
  active = input<boolean>(true);
  id = input<string | number | undefined>(undefined);
  nameID = input<string | undefined>(undefined);
  keyCache = input<string | undefined>(undefined);
  subProp = input<string | undefined>(undefined);
  url = input<string | undefined>(undefined);
  nameItem = input<string | undefined>(undefined);
  table = input<string | undefined>(undefined);

  readonly confirmOpen = signal(false);
  readonly loading = signal(false);

  isActive = () => this.active();

  constructor(
    private request: RequestService,
    private modal: ModalService,
  ) {}

  openConfirm(): void {
    const ref = this.modal.open(ConfirmDialogComponent, {
      maxWidth: '440px',
      disableBackdropClick: this.loading(),
      data: {
        type: this.isActive() ? 'warning' : 'success',
        title: 'Confirmar acción',
        message: this.isActive()
          ? `¿Estás seguro de desactivar este ${this.nameItem() ?? 'registro'}?`
          : `¿Estás seguro de activar este ${this.nameItem() ?? 'registro'}?`,
        confirmText: this.isActive() ? 'Desactivar' : 'Activar',
        cancelText: 'Cancelar',
        confirmColor: this.isActive() ? 'error' : 'success',
      },
    });

    ref.afterClosed().subscribe((confirmed: boolean | undefined) => {
      if (!confirmed) return;
      void this.handleConfirm();
    });
  }

  private async handleConfirm(): Promise<void> {
    this.loading.set(true);
    try {
      const endpoint = this.url() ?? '/dynamic/update-status';
      const request = this.request.create({
        url: endpoint,
        method: this.method(),
        nameID: this.nameID(),
        keyCache: this.keyCache(),
        subProp: this.subProp(),
        toggleActive: true,
        refreshKey: this.keyCache(),
        id: this.id(),
      });
      await request.execute({ name: this.table(), id: this.id() });
    } finally {
      this.loading.set(false);
    }
  }
}
import { Component, input } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import {
  LucideChevronDown,
} from '@lucide/angular';
import { IconComponent } from '@components/icon/icon.component';
import { OptionsConfig } from '@shared/types/table';
import { ModalService } from '@components/modal/modal.service';
import { ViewDetailsModalComponent } from '@components/view-details/view-details-modal.component';
import { ConfirmDialogComponent } from '@components/modal/confirm-dialog.component';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-options-cell',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    IconComponent,
    LucideChevronDown,
  ],
  template: `
    <button mat-button [matMenuTriggerFor]="optionsMenu" class="ale-options" type="button">
      Opciones
      <svg lucideChevronDown size="16"></svg>
    </button>

    <mat-menu #optionsMenu="matMenu" class="ale-options-menu" [overlapTrigger]="false">
      @if (config().readEndpoint || config().detailsData) {
        <button mat-menu-item (click)="showDetails()">
          <app-icon name="Eye" [size]="16"></app-icon>
          <span>Detalles</span>
        </button>
      }

      @if (showStatusOption()) {
        <button mat-menu-item (click)="toggleStatus($event)" [disabled]="loading()">
          <app-icon name="RefreshCw" [size]="16" [color]="statusColor()"></app-icon>
          <span [style.color]="statusColor()">{{ statusText() }}</span>
        </button>
      }

      @if (config().enabledEdit) {
        <button mat-menu-item (click)="edit()" [disabled]="loading()">
          <app-icon name="Pencil" [size]="16"></app-icon>
          <span>Editar</span>
        </button>
      }

      @for (item of config().additionalItems ?? []; track $index) {
        <button mat-menu-item (click)="onAdditional(item)" [disabled]="item.disabled">
          @if (item.icon) {
            <app-icon [name]="item.icon" [size]="16" [color]="item.color ?? 'inherit'"></app-icon>
          }
          <span [style.color]="item.color">{{ item.label }}</span>
        </button>
      }
    </mat-menu>
  `,
  styles: [`
    .ale-options {
      font-size: 14px;
      text-transform: none;
      padding: 4px 8px;
      color: var(--color-text);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      background: transparent;
      cursor: pointer;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .ale-options:hover { background: var(--color-hover); color: var(--color-primary); }
  `],
})
export class OptionsCellComponent {
  config = input({} as OptionsConfig);
  loading = input(false);

  constructor(
    private modal: ModalService,
    private request: RequestService,
  ) {}

  showStatusOption(): boolean {
    return !!(this.config().enabledEdit && this.config().statusConfig?.enabled);
  }

  isActive(): boolean {
    return this.config().statusConfig?.active ?? true;
  }

  statusText(): string {
    return this.isActive() ? 'Inactivar' : 'Activar';
  }

  statusColor(): string {
    return this.isActive() ? 'var(--color-error)' : 'var(--color-success)';
  }

  showDetails(): void {
    const config = this.config();
    if (config.readEndpoint) {
      this.modal.open(ViewDetailsModalComponent, {
        maxWidth: '560px',
        data: {
          readEndpoint: config.readEndpoint,
          id: config.id,
          title: config.detailsTitle ?? 'Detalles',
          fields: config.detailFields ?? [],
        },
      });
      return;
    }
    if (config.detailsData) {
      this.modal.openShell({
        title: config.detailsTitle ?? 'Detalles',
        maxWidth: '560px',
      });
    }
  }

  toggleStatus(event: Event): void {
    event.stopPropagation();
    const config = this.config();
    const ref = this.modal.open(ConfirmDialogComponent, {
      maxWidth: '440px',
      data: {
        type: this.isActive() ? 'warning' : 'success',
        title: 'Confirmar acción',
        message: `¿Estás seguro de ${this.isActive() ? 'desactivar' : 'activar'} este registro?`,
        confirmText: this.isActive() ? 'Desactivar' : 'Activar',
        cancelText: 'Cancelar',
        confirmColor: this.isActive() ? 'error' : 'success',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      const request = this.request.create({
        url: '/dynamic/update-status',
        method: 'PATCH',
        keyCache: config.statusConfig?.cacheKey,
        nameID: config.statusConfig?.nameID,
        toggleActive: true,
        refreshKey: config.statusConfig?.cacheKey,
        id: config.id,
      });
      void request.execute({ name: config.table, id: config.id });
    });
  }

  edit(): void {
    this.config().onEdit?.();
  }

  onAdditional(item: { label: string; onClick: () => void; disabled?: boolean }): void {
    if (item.disabled) return;
    item.onClick();
  }
}
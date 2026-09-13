import { Component, Inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucidePlus, LucideX } from '@lucide/angular';
import { MainTableComponent } from '@components/tables/main-table.component';
import { MainButtonComponent } from '@components/buttons/main-button.component';
import { ModalFormComponent } from '@components/modal/modal-form.component';
import { ModalService } from '@components/modal/modal.service';
import { GetQueryService, GetQueryResult } from '@services/get-query.service';
import { RequestService } from '@services/request.service';
import { TYPES_AUTHORIZATIONS } from '@features/auth/const/auth';
import { Input, f } from '@shared/types/form';
import { Options } from '@shared/types/options';
import { ColumnConfig } from '@shared/types/table';

export interface ModalPermissionsData {
  idRole: number;
}

interface RolePermissionVM extends Record<string, unknown> {
  id: number;
  name: string;
  description: string;
  auth: number;
}

@Component({
  selector: 'app-modal-permissions',
  standalone: true,
  imports: [MainTableComponent, MainButtonComponent, LucidePlus, LucideX],
  template: `
    <div class="ale-relation-modal">
      <div class="ale-relation-header">
        <div class="ale-relation-text">
          <div class="ale-relation-title">Permisos del Rol</div>
          <div class="ale-relation-desc">Gestiona los permisos asignados a este rol</div>
        </div>
        <button class="ale-relation-close" (click)="close()" aria-label="Cerrar">
          <svg lucideX size="18"></svg>
        </button>
      </div>

      <div class="ale-relation-actions">
        <app-main-button variant="outlined" (click)="openForm()" [disabled]="saving()">
          <svg lucidePlus size="16"></svg>
          Agregar permiso
        </app-main-button>
      </div>

      <div class="ale-relation-body">
        @if (isLoading()) {
          <app-main-table
            [data]="[]"
            [columns]="columns"
            [isLoading]="true"
            [isFetched]="false"
            trackBy="'id'"
            name="permisos"
          ></app-main-table>
        } @else if (rows().length === 0) {
          <div class="ale-relation-empty">No hay permisos asignados a este rol.</div>
        } @else {
          <app-main-table
            [data]="rows()"
            [columns]="columns"
            [isLoading]="false"
            [isFetched]="true"
            trackBy="'id'"
            name="permisos"
          ></app-main-table>
        }
      </div>
    </div>
  `,
  styles: [`
    .ale-relation-modal { position: relative; display: flex; flex-direction: column; min-height: 300px; }
    .ale-relation-header {
      display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;
      padding: 22px 22px 10px;
    }
    .ale-relation-text { min-width: 0; padding-top: 2px; }
    .ale-relation-title { font-weight: 700; color: var(--color-text); letter-spacing: -0.02em; font-size: 1.35rem; }
    .ale-relation-desc { color: var(--color-text); opacity: 0.6; font-weight: 400; font-size: 0.875rem; margin-top: 4px; }
    .ale-relation-close {
      width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--color-border);
      background: var(--color-bgCard); color: var(--color-text); cursor: pointer;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0;
      transition: all 0.2s ease;
    }
    .ale-relation-close:hover { color: var(--color-error); border-color: var(--color-error); background: var(--color-errorBg); transform: rotate(90deg); }
    .ale-relation-actions { display: flex; justify-content: flex-end; padding: 6px 22px 14px; }
    .ale-relation-body { padding: 0 22px 22px; color: var(--color-text); }
    .ale-relation-empty {
      display: flex; align-items: center; justify-content: center; height: 200px;
      color: var(--color-text); opacity: 0.6;
    }
  `],
})
export class ModalPermissionsComponent implements OnInit {
  readonly rows = signal<RolePermissionVM[]>([]);
  readonly options = signal<Options[]>([]);
  readonly isLoading = signal(true);
  readonly saving = signal(false);

  readonly columns: ColumnConfig<RolePermissionVM>[] = [
    { header: 'Permiso', key: 'name', id: 'name' },
    { header: 'Descripción', key: 'description', id: 'description' },
    {
      header: 'Nivel',
      key: 'auth',
      id: 'auth',
      cell: (row) => ({
        kind: 'text',
        value: row.auth === TYPES_AUTHORIZATIONS.Read ? 'Lectura' : 'Escritura',
      }),
    },
  ];

  private readonly permissionsUrl: string;
  private readonly availableUrl: string;
  private readonly assignedQuery: GetQueryResult<Record<string, unknown>[]>;
  private readonly availableQuery: GetQueryResult<Options[]>;
  private formRef?: MatDialogRef<ModalFormComponent>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly dialogData: ModalPermissionsData,
    private readonly dialogRef: MatDialogRef<ModalPermissionsComponent>,
    private readonly getQuery: GetQueryService,
    private readonly request: RequestService,
    private readonly modal: ModalService,
  ) {
    this.permissionsUrl = `/roles/permissions/${this.dialogData.idRole}`;
    this.availableUrl = `/roles/available-permissions/${this.dialogData.idRole}`;
    this.assignedQuery = this.getQuery.get<Record<string, unknown>[]>(this.permissionsUrl);
    this.availableQuery = this.getQuery.get<Options[]>(this.availableUrl);
  }

  ngOnInit(): void {
    void this.refresh();
  }

  openForm(): void {
    if (this.saving()) return;
    this.formRef = this.modal.open(ModalFormComponent, {
      maxWidth: '420px',
      data: {
        title: 'Agregar permiso al rol',
        inputs: this.formInputs(),
        onSubmit: (formData: Record<string, unknown>) => this.onSubmit(formData),
        saveLabel: 'Agregar',
      },
    });
  }

  onSubmit(data: Record<string, unknown>): void {
    const permission = Number(data['permission']);
    if (!permission || this.saving()) return;

    this.saving.set(true);
    const request = this.request.create({
      url: '/roles/assign-permission',
      method: 'POST',
      keyCache: this.permissionsUrl,
    });

    void request
      .execute({ role: this.dialogData.idRole, permission })
      .then(async () => {
        this.formRef?.close();
        await this.refresh();
      })
      .finally(() => this.saving.set(false));
  }

  close(): void {
    this.dialogRef.close();
  }

  private formInputs(): Input[] {
    return [
      f.select('permission', this.options()).label('Permiso').required().build(),
    ];
  }

  private async refresh(): Promise<void> {
    this.isLoading.set(true);
    try {
      await Promise.all([this.assignedQuery.refetch(), this.availableQuery.refetch()]);
      this.options.set(this.availableQuery.data() ?? []);
      this.rows.set((this.assignedQuery.data() ?? []).map((row, index) => ({
        id: Number(row['id'] ?? index + 1),
        name: String(row['name'] ?? ''),
        description: String(row['description'] ?? ''),
        auth: Number(row['auth'] ?? TYPES_AUTHORIZATIONS.Read),
      })));
    } finally {
      this.isLoading.set(false);
    }
  }
}
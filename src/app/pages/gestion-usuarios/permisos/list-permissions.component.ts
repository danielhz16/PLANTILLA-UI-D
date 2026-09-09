import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ListComponent } from '@components/crud/list.component';
import { ModalService } from '@components/modal/modal.service';
import { ColumnConfig } from '@shared/types/table';
import { AuthStore } from '@core/auth/auth.store';
import { TYPES_AUTHORIZATIONS } from '@features/auth';
import { PERMISSIONS } from '@features/permissions';
import { ModalUsersComponent } from '@pages/gestion-usuarios/permisos/components/modal-users.component';

@Component({
  selector: 'app-list-permissions',
  standalone: true,
  imports: [ListComponent],
  template: `
    <app-list
      [endpoint]="'/permissions/list'"
      title="Permisos"
      name="permisos"
      queryKey="permissions"
      [columns]="columns()"
      toCreate="/gestion-usuarios/permisos/create"
      [permission]="permissionModule"
      [minDataFetch]="5"
    ></app-list>
  `,
  styles: [`:host { display: block; }`],
})
export class ListPermissionsComponent {
  readonly permissionModule = PERMISSIONS.MODULE;

  readonly columns = computed<ColumnConfig<Record<string, unknown>>[]>(() => [
    { header: 'ID', key: 'id', id: 'id', meta: { filterType: 'number', filterPlaceholder: 'Filtrar ID' } },
    { header: 'Nombre', key: 'name', id: 'name', meta: { filterType: 'text', filterPlaceholder: 'Filtrar Nombre' } },
    { header: 'Descripción', key: 'description', id: 'description', meta: { filterType: 'text', filterPlaceholder: 'Filtrar Descripción' } },
    {
      header: 'Opciones',
      key: 'id',
      id: 'options',
      cell: (row: Record<string, unknown>) => ({
        kind: 'options',
        config: {
          id: String(row['id'] ?? ''),
          table: 'permissions',
          enabledEdit: this.canWrite(),
          detailsData: row,
          detailsTitle: 'Permiso',
          readEndpoint: '/permissions/read',
          detailFields: [
            { label: 'ID', name: 'id', icon: 'Key' },
            { label: 'Nombre', name: 'name', icon: 'Shield' },
            { label: 'Descripción', name: 'description', icon: 'FileText' },
          ],
          statusConfig: {
            enabled: true,
            active: Boolean(row['active'] ?? true),
            cacheKey: 'permissions',
            nameID: 'id',
          },
          onEdit: () => this.goEdit(String(row['id'] ?? '')),
          additionalItems: [
            {
              label: 'Usuarios',
              icon: 'UsersRound',
              onClick: () => this.goUsers(String(row['id'] ?? '')),
            },
          ],
        },
      }),
    },
  ]);

  constructor(
    private router: Router,
    private auth: AuthStore,
    private modal: ModalService,
  ) {}

  canWrite(): boolean {
    return this.auth.validatePermission(this.permissionModule, TYPES_AUTHORIZATIONS.Write);
  }

  goEdit(id: string): void {
    void this.router.navigate([`/gestion-usuarios/permisos/details/${id}`]);
  }

  goUsers(id: string): void {
    this.modal.open(ModalUsersComponent, {
      maxWidth: '680px',
      data: { idPermission: Number(id) },
    });
  }
}
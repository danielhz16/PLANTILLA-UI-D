import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ListComponent } from '@components/crud/list.component';
import { ModalService } from '@components/modal/modal.service';
import { ColumnConfig } from '@shared/types/table';
import { AuthStore } from '@core/auth/auth.store';
import { TYPES_AUTHORIZATIONS } from '@features/auth';
import { ROLES } from '@features/roles';
import { ModalPermissionsComponent } from '@pages/gestion-usuarios/roles/components/modal-permissions.component';

@Component({
  selector: 'app-list-roles',
  standalone: true,
  imports: [ListComponent],
  template: `
    <app-list
      [endpoint]="'/roles/list'"
      title="Roles"
      name="roles"
      queryKey="roles"
      [columns]="columns()"
      toCreate="/gestion-usuarios/roles/create"
      [permission]="permissionModule"
      [minDataFetch]="5"
    ></app-list>
  `,
  styles: [`:host { display: block; }`],
})
export class ListRolesComponent {
  readonly permissionModule = ROLES.MODULE;

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
          table: 'role',
          enabledEdit: this.canWrite(),
          detailsData: row,
          detailsTitle: 'Rol',
          readEndpoint: '/roles/Read',
          detailFields: [
            { label: 'ID', name: 'id', icon: 'Key' },
            { label: 'Nombre', name: 'name', icon: 'Shield' },
            { label: 'Descripción', name: 'description', icon: 'FileText' },
          ],
          statusConfig: {
            enabled: true,
            active: Boolean(row['active'] ?? true),
            cacheKey: 'roles',
            nameID: 'id',
          },
          onEdit: () => this.goEdit(String(row['id'] ?? '')),
          additionalItems: [
            {
              label: 'Permisos',
              icon: 'ShieldCheck',
              onClick: () => this.goPermissions(String(row['id'] ?? '')),
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
    void this.router.navigate([`/gestion-usuarios/roles/details/${id}`]);
  }

  goPermissions(id: string): void {
    this.modal.open(ModalPermissionsComponent, {
      maxWidth: '680px',
      data: { idRole: Number(id) },
    });
  }
}
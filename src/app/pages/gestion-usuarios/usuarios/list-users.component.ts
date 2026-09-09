import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ListComponent } from '@components/crud/list.component';
import { ColumnConfig } from '@shared/types/table';
import { AuthStore } from '@core/auth/auth.store';
import { TYPES_AUTHORIZATIONS } from '@features/auth';
import { USERS } from '@features/users';
import { userDetailFields } from '@pages/gestion-usuarios/usuarios/details';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [ListComponent],
  template: `
    <app-list
      [endpoint]="endpoint"
      title="Usuarios"
      name="usuarios"
      queryKey="user"
      [columns]="columns()"
      toCreate="/gestion-usuarios/usuarios/create"
      [permission]="permissionModule"
    ></app-list>
  `,
  styles: [`:host { display: block; }`],
})
export class ListUsersComponent {
  readonly endpoint = '/users/list';
  readonly permissionModule = USERS.MODULE;

  readonly columns = computed<ColumnConfig<Record<string, unknown>>[]>(() => [
    { header: 'ID', key: 'id', id: 'id' },
    { header: 'Nombre de usuario', key: 'username', id: 'username', meta: { filterType: 'text', filterPlaceholder: 'Filtrar nombre' } },
    { header: 'Correo electrónico', key: 'email', id: 'email', meta: { filterType: 'text', filterPlaceholder: 'Filtrar correo' } },
    {
      header: 'Opciones',
      key: 'id',
      id: 'options',
      cell: (row: Record<string, unknown>) => ({
        kind: 'options',
        config: {
          id: String(row['id'] ?? ''),
          table: 'users',
          enabledEdit: this.canWrite(),
          detailsData: row,
          detailsTitle: 'Usuario',
          readEndpoint: '/users/read',
          detailFields: userDetailFields,
          onEdit: () => this.goEdit(String(row['id'] ?? '')),
        },
      }),
    },
  ]);

  constructor(
    private router: Router,
    private auth: AuthStore,
  ) {}

  canWrite(): boolean {
    return this.auth.validatePermission(this.permissionModule, TYPES_AUTHORIZATIONS.Write);
  }

  goEdit(id: string): void {
    void this.router.navigate([`/gestion-usuarios/usuarios/details/${id}`]);
  }
}
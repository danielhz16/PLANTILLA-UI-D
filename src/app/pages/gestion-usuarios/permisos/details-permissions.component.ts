import { Component } from '@angular/core';
import { DetailsComponent } from '@components/crud/details.component';
import { Input, f } from '@shared/types/form';

@Component({
  selector: 'app-details-permissions',
  standalone: true,
  imports: [DetailsComponent],
  template: `
    <app-details
      [inputs]="inputs"
      title="Permiso"
      urlCreate="/permissions/create"
      urlUpdate="/permissions/update"
      keyCache="permissions"
      ReadEndpoint="/permissions/read"
      [permission]="permissionModule"
    ></app-details>
  `,
  styles: [`:host { display: block; }`],
})
export class DetailsPermissionsComponent {
  readonly permissionModule = 'GESTION_PERMISOS';

  readonly inputs: Input[] = [
    f.text('name').label('Nombre').required().maxLength(50).build(),
    f.area('description').label('Descripción').required().maxLength(250).minLength(25).build(),
  ];
}
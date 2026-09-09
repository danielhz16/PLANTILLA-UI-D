import { Component } from '@angular/core';
import { DetailsComponent } from '@components/crud/details.component';
import { Input, f } from '@shared/types/form';

@Component({
  selector: 'app-details-roles',
  standalone: true,
  imports: [DetailsComponent],
  template: `
    <app-details
      [inputs]="inputs"
      title="Rol"
      urlCreate="/roles/create"
      urlUpdate="/roles/update"
      keyCache="roles"
      ReadEndpoint="/roles/Read"
      [permission]="permissionModule"
    ></app-details>
  `,
  styles: [`:host { display: block; }`],
})
export class DetailsRolesComponent {
  readonly permissionModule = 'GESTION_ROLES';

  readonly inputs: Input[] = [
    f.text('name').label('Nombre').required().maxLength(75).build(),
    f.area('description').label('Descripción').required().maxLength(250).build(),
  ];
}
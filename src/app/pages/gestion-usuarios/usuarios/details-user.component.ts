import { Component, signal, computed, OnInit } from '@angular/core';
import { DetailsComponent } from '@components/crud/details.component';
import { GetQueryService } from '@services/get-query.service';
import { inputsUser } from '@pages/gestion-usuarios/usuarios/inputs';
import { Input } from '@shared/types/form';
import { Options } from '@shared/types/options';

interface RolesResult {
  data?: Options[];
  list?: Options[];
  rows?: Options[];
}

@Component({
  selector: 'app-details-user',
  standalone: true,
  imports: [DetailsComponent],
  template: `
    <app-details
      [inputs]="inputs()"
      title="Usuario"
      urlCreate="/users/create"
      urlUpdate="/users/update"
      keyCache="user"
      ReadEndpoint="/users/read"
      [permission]="permissionModule"
      [isLoading]="isLoading()"
    ></app-details>
  `,
  styles: [`:host { display: block; }`],
})
export class DetailsUserComponent implements OnInit {
  readonly permissionModule = 'GESTION_USUARIOS';
  readonly isLoading = signal(false);
  readonly roles = signal<Options[]>([]);

  readonly inputs = computed<Input[]>(() => inputsUser(this.roles()));

  constructor(private getQuery: GetQueryService) {}

  ngOnInit(): void {
    this.isLoading.set(true);
    const query = this.getQuery.get<RolesResult>('/roles/list?isOptions=true');
    void query.refetch().then(() => {
      const res = query.data();
      const roles = res?.data ?? res?.list ?? res?.rows ?? [];
      this.roles.set(Array.isArray(roles) ? roles : []);
      this.isLoading.set(false);
    });
  }
}
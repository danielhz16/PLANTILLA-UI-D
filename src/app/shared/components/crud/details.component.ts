import { Component, input, output, viewChild, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainCardComponent } from '@components/cards/main-card.component';
import { RightComponent } from '@components/layout/Right.component';
import { MainButtonComponent } from '@components/buttons/main-button.component';
import { MainFormComponent } from '@components/form/main-form.component';
import { LoaderComponent } from '@components/loading/loader.component';
import { RequestService } from '@services/request.service';
import { GetQueryService } from '@services/get-query.service';
import { AuthStore } from '@core/auth/auth.store';
import { TYPES_AUTHORIZATIONS } from '@features/auth/const/auth';
import { LucideArrowLeft, LucideSave } from '@lucide/angular';
import { Input } from '@shared/types/form';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MainCardComponent,
    RightComponent,
    MainButtonComponent,
    MainFormComponent,
    LoaderComponent,
    LucideArrowLeft,
    LucideSave,
  ],
  template: `
    <app-main-card>
      <app-right>
        <app-main-button variant="contained" (click)="back()" [disabled]="isPending()">
          <svg lucideArrowLeft size="18"></svg>
          Volver
        </app-main-button>
        <app-main-button variant="contained" (click)="savedForm()" [disabled]="!canEdit() || isPending()">
          <svg lucideSave size="18"></svg>
          Guardar
        </app-main-button>
      </app-right>

      @if (isLoading()) {
        <div style="display: flex; flex-direction: column; gap: 16px; padding-top: 8px;">
          @for (i of skeletonRows; track i) {
            <div class="ale-skeleton"></div>
          }
        </div>
      } @else {
        <app-main-form
          #form
          [inputs]="inputs()"
          [defaultValues]="defaultValues()"
          [columns]="columns()"
          [disabled]="!canEdit()"
          (onSubmit)="handleSubmit($event)"
        ></app-main-form>
      }
      <app-loader [isPending]="isPending()"></app-loader>
    </app-main-card>
  `,
  styles: [`
    .ale-skeleton {
      height: 48px; border-radius: 4px; width: 100%;
      background: linear-gradient(90deg, var(--color-hover) 25%, var(--color-border) 37%, var(--color-hover) 63%);
      background-size: 400% 100%;
      animation: ale-shimmer 1.4s ease infinite;
    }
    @keyframes ale-shimmer {
      0% { background-position: 100% 50%; }
      100% { background-position: 0 50%; }
    }
  `],
})
export class DetailsComponent implements OnInit {
  inputs = input<Input[]>([]);
  title = input('');
  urlCreate = input('');
  urlUpdate = input('');
  keyCache = input('');
  nameID = input('id');
  useDataForm = input(false);
  subProp = input<string | undefined>(undefined);
  ReadEndpoint = input('');
  permission = input<string | undefined>(undefined);
  enabledEdit = input<boolean | undefined>(undefined);
  isLoading = input(false);
  columns = input(12);
  interceptSubmit = input<((data: Record<string, unknown>) => Record<string, unknown>) | undefined>(undefined);

  saved = output<void>();
  or = output<Record<string, unknown>>();

  private formRef = viewChild<MainFormComponent>('form');

  readonly editing = signal(false);
  readonly isPending = signal(false);
  readonly data = signal<Record<string, unknown> | null>(null);

  readonly skeletonRows = Array.from({ length: 6 }, (_, index) => index);

  private routeId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private request: RequestService,
    private getQuery: GetQueryService,
    private auth: AuthStore,
  ) {}

  ngOnInit(): void {
    this.routeId = this.route.snapshot.paramMap.get('id');
    this.editing.set(!!this.routeId);

    if (this.routeId) {
      const urlData = `${this.ReadEndpoint()}/${this.routeId}`;
      const query = this.getQuery.get<Record<string, unknown>>(urlData);
      void query.refetch().then(() => this.data.set(query.data()));
    }
  }

  canEdit(): boolean {
    if (this.enabledEdit() !== undefined) return this.enabledEdit() ?? false;
    if (this.permission()) {
      return this.auth.validatePermission(this.permission()!, TYPES_AUTHORIZATIONS.Write);
    }
    return true;
  }

  defaultValues(): Record<string, unknown> {
    return this.data() ?? {};
  }

  pageTitle(): string {
    return `${this.editing() ? 'Editar' : 'Crear'} ${this.title()}`;
  }

  back(): void {
    this.router.navigate(['..']);
  }

  savedForm(): void {
    this.formRef()?.save();
  }

  handleSubmit(data: Record<string, unknown>): void {
    const method = this.routeId ? 'PUT' : 'POST';
    const url = this.routeId ? `${this.urlUpdate()}/${this.routeId}` : this.urlCreate();
    const finalData = this.interceptSubmit() ? this.interceptSubmit()!(data) : data;
    this.or.emit(finalData);

    const request = this.request.create({
      url,
      method,
      keyCache: this.keyCache(),
      nameID: this.nameID(),
      subProp: this.subProp(),
      onSuccess: () => {
        this.saved.emit();
        this.back();
      },
    });

    this.isPending.set(true);
    void request.execute(finalData).finally(() => this.isPending.set(false));
  }
}
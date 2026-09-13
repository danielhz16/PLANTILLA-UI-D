import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetQueryService } from '@services/get-query.service';
import { DetailsViewComponent } from '@components/view-details/details-view.component';
import { LoaderComponent } from '@components/loading/loader.component';
import { DetailField } from '@shared/types/details';

export interface ViewDetailsData {
  readEndpoint: string;
  id: string | number;
  title?: string;
  fields: DetailField[];
}

@Component({
  selector: 'app-view-details-modal',
  standalone: true,
  imports: [DetailsViewComponent, LoaderComponent],
  template: `
    <div class="ale-view-modal">
      <div class="ale-view-modal-header">
        <div class="ale-view-modal-title">{{ title() }}</div>
        <button class="ale-view-modal-close" (click)="close()" aria-label="Cerrar">&times;</button>
      </div>
      <div class="ale-view-modal-body">
        @if (isLoading()) {
          <div style="display:flex; justify-content:center; padding: 48px 0;">
            <app-loader [isPending]="true"></app-loader>
          </div>
        } @else if (data()) {
          <app-details-view [fields]="fields()" [data]="data()!"></app-details-view>
        } @else {
          <div style="color: var(--color-text); opacity: 0.6; text-align: center; padding: 48px 0;">
            No se encontraron datos
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .ale-view-modal { position: relative; }
    .ale-view-modal-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 22px 22px 8px;
    }
    .ale-view-modal-title { font-weight: 700; color: var(--color-text); letter-spacing: -0.02em; font-size: 1.3rem; }
    .ale-view-modal-close {
      width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--color-border);
      background: var(--color-bgCard); color: var(--color-text); cursor: pointer; font-size: 22px; line-height: 1;
    }
    .ale-view-modal-close:hover { color: var(--color-error); border-color: var(--color-error); background: var(--color-errorBg); }
    .ale-view-modal-body { padding: 12px 22px 22px; overflow-y: auto; max-height: 70vh; }
  `],
})
export class ViewDetailsModalComponent {
  readonly data = signal<Record<string, unknown> | null>(null);
  readonly isLoading = signal(true);

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly dialogData: ViewDetailsData,
    private dialogRef: MatDialogRef<ViewDetailsModalComponent>,
    private getQuery: GetQueryService,
  ) {
    const url = `${dialogData.readEndpoint}/${dialogData.id}?details=true`;
    const query = this.getQuery.get<Record<string, unknown>>(url);
    this.isLoading.set(query.isLoading());
    query.refetch().then(() => {
      this.data.set(query.data());
      this.isLoading.set(query.isLoading());
    });
  }

  fields(): DetailField[] {
    return this.dialogData?.fields ?? [];
  }

  title(): string {
    return this.dialogData?.title ?? 'Detalles';
  }

  close(): void {
    this.dialogRef.close();
  }
}
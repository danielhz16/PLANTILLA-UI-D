import { Component, Inject, input, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetQueryService } from '@services/get-query.service';
import { DateCellComponent } from '@components/tables/cells/date-cell.component';
import { LoaderComponent } from '@components/loading/loader.component';

export interface HistoryData {
  table: string;
  id: string;
}

interface HistoryRecord {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [DateCellComponent, LoaderComponent],
  template: `
    <div class="ale-history">
      <div class="ale-history-header">
        <div class="ale-history-title">Bitácora de Cambios</div>
        <button class="ale-history-close" (click)="close()" aria-label="Cerrar">&times;</button>
      </div>
      <div class="ale-history-body">
        @if (isLoading()) {
          <div style="display:flex; justify-content:center; padding: 32px 0;">
            <app-loader [isPending]="true"></app-loader>
          </div>
        } @else if (rows().length > 0) {
          <table class="ale-history-table">
            <thead>
              <tr>
                <th>Fecha y Hora</th>
                <th>Acción</th>
                <th>Usuario</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              @for (record of rows(); track record.id) {
                <tr>
                  <td><app-date-cell [date]="record.timestamp"></app-date-cell></td>
                  <td>{{ record.action }}</td>
                  <td>{{ record.user }}</td>
                  <td>{{ record.details }}</td>
                </tr>
              }
            </tbody>
          </table>
        } @else {
          <div style="padding: 32px 0; text-align: center; color: var(--color-text); opacity: 0.6;">
            No hay registros en la bitácora
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .ale-history { position: relative; }
    .ale-history-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 22px 22px 8px;
    }
    .ale-history-title { font-weight: 700; color: var(--color-text); letter-spacing: -0.02em; font-size: 1.3rem; }
    .ale-history-close {
      width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--color-border);
      background: var(--color-bgCard); color: var(--color-text); cursor: pointer; font-size: 22px; line-height: 1;
    }
    .ale-history-close:hover { color: var(--color-error); border-color: var(--color-error); }
    .ale-history-body { padding: 12px 22px 22px; overflow-y: auto; max-height: 70vh; }
    .ale-history-table {
      width: 100%; border-collapse: collapse; font-size: 0.85rem;
    }
    .ale-history-table th {
      background: var(--color-tableHeader); color: var(--color-text); text-align: left;
      padding: 10px 12px; font-weight: 700; border-bottom: 1px solid var(--color-border);
    }
    .ale-history-table td {
      padding: 10px 12px; color: var(--color-text); border-bottom: 1px solid var(--color-tableRowBorder);
    }
    .ale-history-table tr:hover td { background: var(--color-tableRowHover); }
  `],
})
export class HistoryComponent {
  readonly rows = signal<HistoryRecord[]>([]);
  readonly isLoading = signal(true);

  private dialogRef: MatDialogRef<HistoryComponent>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: HistoryData,
    dialogRef: MatDialogRef<HistoryComponent>,
    private getQuery: GetQueryService,
  ) {
    this.dialogRef = dialogRef;
    const url = `/history/${data.table}/${data.id}`;
    const query = this.getQuery.get<HistoryRecord[]>(url);
    this.isLoading.set(query.isLoading());
    query.refetch().then(() => {
      this.rows.set(query.data() ?? []);
      this.isLoading.set(query.isLoading());
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
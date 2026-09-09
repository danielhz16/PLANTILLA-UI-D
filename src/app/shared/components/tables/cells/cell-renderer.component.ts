import { Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateCellComponent } from '@components/tables/cells/date-cell.component';
import { StatusCellComponent } from '@components/tables/cells/status-cell.component';
import { OptionsCellComponent } from '@components/tables/cells/options-cell.component';
import { isCellSpec, ColumnConfig, CellSpec } from '@shared/types/table';

@Component({
  selector: 'app-cell-renderer',
  standalone: true,
  imports: [RouterLink, DateCellComponent, StatusCellComponent, OptionsCellComponent],
  template: `
    @let current = spec();
    @if (current.kind === 'date') {
      <app-date-cell [date]="current.value"></app-date-cell>
    } @else if (current.kind === 'status') {
      <app-status-cell [active]="current.active" [url]="current.props.url" [keyCache]="current.props.keyCache" [nameID]="current.props.nameID" [subProp]="current.props.subProp" [id]="current.props.id" [table]="current.props.table"></app-status-cell>
    } @else if (current.kind === 'options') {
      <app-options-cell [config]="current.config"></app-options-cell>
    } @else if (current.kind === 'edit') {
      <a class="ale-cell-link" [routerLink]="current.to">
        <button type="button" class="ale-cell-btn ale-cell-btn-warning">Editar</button>
      </a>
    } @else if (current.kind === 'users') {
      <button type="button" class="ale-cell-btn ale-cell-btn-primary" (click)="current.select()">Usuarios</button>
    } @else {
      <span class="ale-cell-text">{{ toText() }}</span>
    }
  `,
  styles: [`
    .ale-cell-text { color: var(--color-text); }
    .ale-cell-link { text-decoration: none; }
    .ale-cell-btn {
      min-width: 36px; height: 36px; border-radius: 8px; border: none; cursor: pointer;
      font-family: inherit; font-size: 0.8rem; font-weight: 600; padding: 0 10px;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    .ale-cell-btn-warning { background-color: var(--color-warningSoft); color: var(--color-warning); }
    .ale-cell-btn-warning:hover { background-color: var(--color-warningSoftHover); }
    .ale-cell-btn-primary { background-color: var(--color-primarySoft); color: var(--color-primary); }
    .ale-cell-btn-primary:hover { background-color: var(--color-primary); color: white; }
  `],
})
export class CellRendererComponent {
  row = input.required<Record<string, unknown>>();
  column = input.required<ColumnConfig<any>>();

  spec = computed<CellSpec>(() => {
    const value: unknown = this.column().cell
      ? this.column().cell!(this.row())
      : (this.row() as Record<string, unknown>)[this.column().key];
    if (isCellSpec(value)) return value;
    return { kind: 'text', value };
  });

  toText(): string {
    const spec = this.spec() as { kind: 'text'; value: unknown };
    if (spec.value === null || spec.value === undefined || spec.value === '') return '—';
    return String(spec.value);
  }
}
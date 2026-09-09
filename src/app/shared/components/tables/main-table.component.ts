import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { LucideFilter, LucideX } from '@lucide/angular';
import { ColumnConfig } from '@shared/types/table';
import { CellRendererComponent } from '@components/tables/cells/cell-renderer.component';
import { PreviewComponent } from '@components/loading/preview.component';
import { NoDataComponent } from '@components/tables/no-data.component';
import { PaginationComponent } from '@components/tables/pagination.component';

interface FilterOptions {
  fieldName: string;
  meta: ColumnConfig<unknown>['meta'];
}

@Component({
  selector: 'app-main-table',
  standalone: true,
  imports: [
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    LucideFilter,
    LucideX,
    CellRendererComponent,
    PreviewComponent,
    NoDataComponent,
    PaginationComponent,
  ],
  template: `
    <div class="ale-table-wrap" (mouseleave)="closeFilter()">
      <table class="ale-table">
        <thead>
          <tr>
            @for (column of columns(); track column.id; let last = $last) {
              <th
                class="ale-th"
                [style.opacity]="draggedId() === column.id ? 0.72 : 1"
                draggable="true"
                (dragstart)="onDragStart($event, column.id!)"
                (dragover)="onDragOver($event)"
                (drop)="onDrop($event, column.id!)"
                (dragend)="onDragEnd()"
                [class.last]="last"
              >
                <div class="ale-th-cell">
                  <span class="ale-th-label">{{ column.header }}</span>
                  @if (isFilterable(column.id!)) {
                    <button
                      type="button"
                      class="ale-filter-btn"
                      [class.active]="hasActiveFilter(column.id!)"
                      (click)="openFilter($event, column.id!, column)"
                    >
                      <svg lucideFilter size="15"></svg>
                    </button>
                  }
                </div>
              </th>
            }
          </tr>
        </thead>
        <tbody>
          @if (isLoading()) {
            @for (rowId of loadingRows; track rowId) {
              <tr>
                @for (column of columns(); track column.id) {
                  <td class="ale-td">
                    <app-preview [loading]="true" width="100%" [height]="24" [radius]="4"></app-preview>
                  </td>
                }
              </tr>
            }
          } @else {
            @for (row of data(); track row[trackKey()]; let rowIndex = $index) {
              <tr class="ale-tr">
                @for (column of columns(); track column.id) {
                  <td class="ale-td">
                    <app-cell-renderer [row]="row" [column]="column"></app-cell-renderer>
                  </td>
                }
              </tr>
            }
          }
        </tbody>
      </table>

      @if (!isLoading() && data().length === 0) {
        <app-no-data [isFetched]="isFetched()" [name]="name()"></app-no-data>
      }
    </div>

    <div class="ale-table-footer">
      <app-pagination
        [currentPage]="page()"
        [totalPages]="totalPages()"
        [showItemsPerPage]="hasPagination()"
        [totalItems]="totalRecords()"
        [itemsPerPage]="pageSize()"
        (pageChange)="emitPage($event)"
        (itemsPerPageChange)="emitPageSize($event)"
      ></app-pagination>
    </div>

    @if (filterState(); as f) {
      <div class="ale-filter-popover" [style.left.px]="filterState()!.left" [style.top.px]="filterState()!.top">
        <div class="ale-filter-row">
          @if (f.meta?.filterType === 'select') {
            <mat-form-field appearance="outline" class="ale-filter-select">
              <mat-select
                [value]="columnFilters()[f.fieldName]"
                (selectionChange)="onFilterChange(f.fieldName, $event.value)"
              >
                <mat-option value="">Todos</mat-option>
                @for (option of f.meta?.filterOptions ?? []; track option.id) {
                  <mat-option [value]="option.id">{{ option.label }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
          } @else {
            <input
              class="ale-filter-input"
              type="text"
              [value]="columnFilters()[f.fieldName]"
              [placeholder]="f.meta?.filterPlaceholder ?? 'Filtrar'"
              (input)="onFilterChange(f.fieldName, filterValue($event))"
              (blur)="onFilterBlur(f.fieldName, filterValue($event))"
            />
          }
          <button type="button" class="ale-filter-close" (click)="closeFilter()">
            <svg lucideX size="16"></svg>
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .ale-table-wrap {
      position: relative;
      width: 100%;
      overflow-x: auto;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      background-color: var(--color-bgCard);
    }
    .ale-table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      table-layout: fixed;
      font-size: 0.9rem;
      min-width: 600px;
      color: var(--color-text);
    }
    .ale-th {
      background-color: var(--color-sidebar);
      color: var(--color-text);
      padding: 9px 14px;
      user-select: none;
      cursor: grab;
      transition: background-color 0.18s ease, opacity 0.18s ease;
      text-align: left;
      font-size: 0.76rem;
      font-weight: 700;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-right: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      border-top: 3px solid var(--color-primary);
    }
    .ale-th.last { border-right: none; }
    .ale-th:hover { background-color: var(--color-hover); }
    .ale-th-cell { display: flex; align-items: center; gap: 6px; min-width: 0; }
    .ale-th-label { overflow: hidden; text-overflow: ellipsis; flex: 1; }
    .ale-filter-btn {
      width: 28px; height: 28px; flex: 0 0 auto; cursor: pointer; border-radius: 4px;
      color: var(--color-text); opacity: 0.62; border: 1px solid transparent; background: transparent;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .ale-filter-btn:hover { opacity: 1; background-color: var(--color-background); border-color: var(--color-border); }
    .ale-filter-btn.active { color: var(--color-primary); opacity: 1; border: 1px solid var(--color-primary); }
    .ale-td {
      color: var(--color-text);
      border-bottom: 1px solid var(--color-tableRowBorder);
      padding: 11px 14px;
      background-color: var(--color-bgCard);
      overflow-wrap: anywhere;
      line-height: 1.5;
      transition: background-color 0.18s ease;
    }
    .ale-tr:hover .ale-td { background-color: var(--color-tableRowHover); }
    .ale-table-footer { margin-top: 12px; }
    .ale-filter-popover {
      position: fixed;
      z-index: 1000;
      width: 280px;
      padding: 10px;
      border-radius: 8px;
      background-color: var(--color-sidebar);
      color: var(--color-text);
      border: 1px solid var(--color-border);
      box-shadow: var(--color-shadowPopover);
    }
    .ale-filter-row { display: flex; align-items: center; gap: 8px; }
    .ale-filter-input {
      flex: 1; min-width: 0; border-radius: 8px; border: 1px solid var(--color-border);
      background-color: var(--color-background); color: var(--color-text); font-family: inherit;
      padding: 9px 10px; font-size: 0.875rem;
    }
    .ale-filter-input:focus { outline: none; border-color: var(--color-primary); }
    .ale-filter-select { flex: 1; min-width: 0; width: 100%; }
    .ale-filter-select ::ng-deep .mat-mdc-text-field-wrapper { border-radius: 8px; }
    .ale-filter-close {
      width: 34px; height: 34px; flex: 0 0 auto; cursor: pointer; border-radius: 8px;
      color: var(--color-text); border: 1px solid var(--color-border); background-color: var(--color-background);
      display: inline-flex; align-items: center; justify-content: center;
    }
    .ale-filter-close:hover { background-color: var(--color-hover); border-color: var(--color-primary); }
  `],
})
export class MainTableComponent<T = unknown> {
  data = input<Record<string, unknown>[]>([]);
  columns = input<ColumnConfig<T>[]>([]);
  isLoading = input(false);
  isFetched = input(false);
  columnFilters = input<Record<string, string>>({});

  onColumnFilterChange = input<((name: string, value: string) => void) | undefined>(undefined);
  onColumnFilterBlur = input<((name: string, value: string) => void) | undefined>(undefined);

  page = input(1);
  pageSize = input(10);
  totalPages = input(0);
  totalRecords = input(0);
  trackBy = input<string>('id');
  name = input<string>();

  onPageChange = input<((page: number) => void) | undefined>(undefined);
  onPageSizeChange = input<((pageSize: number) => void) | undefined>(undefined);

  reorder = output<ColumnConfig<T>[]>();

  readonly draggedId = signal<string | null>(null);
  readonly filterState = signal<FilterOptions & { left: number; top: number } | null>(null);

  readonly loadingRows = Array.from({ length: 5 }, (_, index) => `loading-row-${index}`);

  trackKey(): string {
    return this.trackBy();
  }

  hasColumnFilters(): boolean {
    return !!this.onColumnFilterChange() || !!this.onColumnFilterBlur();
  }

  hasPagination(): boolean {
    return !!this.onPageChange() || !!this.onPageSizeChange();
  }

  isFilterable(fieldName: string): boolean {
    return this.hasColumnFilters() && !['options', 'actions'].includes(fieldName);
  }

  hasActiveFilter(fieldName: string): boolean {
    return !!this.columnFilters()[fieldName]?.trim();
  }

  openFilter(event: MouseEvent, fieldName: string, column: ColumnConfig<T>): void {
    event.stopPropagation();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.filterState.set({
      fieldName,
      meta: column.meta,
      left: rect.left,
      top: rect.bottom + 6,
    });
  }

  closeFilter(): void {
    this.filterState.set(null);
  }

  onFilterChange(fieldName: string, value: unknown): void {
    this.onColumnFilterChange()?.(fieldName, String(value ?? ''));
  }

  filterValue(event: Event): string {
    return (event.target as HTMLInputElement)?.value ?? '';
  }

  onFilterBlur(fieldName: string, value: unknown): void {
    this.onColumnFilterBlur()?.(fieldName, String(value ?? ''));
  }

  emitPage(page: number): void {
    this.onPageChange()?.(page);
  }

  emitPageSize(pageSize: number): void {
    this.onPageSizeChange()?.(pageSize);
  }

  onDragStart(event: DragEvent, columnId: string): void {
    this.draggedId.set(columnId);
    event.dataTransfer?.setData('text/plain', columnId);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, targetColumnId: string): void {
    event.preventDefault();
    const sourceColumnId = event.dataTransfer?.getData('text/plain') || this.draggedId();
    this.draggedId.set(null);
    if (!sourceColumnId || sourceColumnId === targetColumnId) return;

    const order = this.columns().map((col) => col.id);
    const sourceIndex = order.indexOf(sourceColumnId);
    const targetIndex = order.indexOf(targetColumnId);
    if (sourceIndex === -1 || targetIndex === -1) return;

    order.splice(sourceIndex, 1);
    order.splice(targetIndex, 0, sourceColumnId);
    const source = this.columns();
    this.reorder.emit(order
      .map((id) => source.find((col) => col.id === id))
      .filter((col): col is ColumnConfig<T> => !!col));
  }

  onDragEnd(): void {
    this.draggedId.set(null);
  }
}
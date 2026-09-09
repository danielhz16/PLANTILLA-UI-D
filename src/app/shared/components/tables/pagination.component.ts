import { Component, input, output, computed } from '@angular/core';
import { LucideChevronLeft, LucideChevronRight, LucideChevronsLeft, LucideChevronsRight } from '@lucide/angular';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatSelectModule, LucideChevronLeft, LucideChevronRight, LucideChevronsLeft, LucideChevronsRight],
  template: `
    <div class="ale-pagination">
      <div class="ale-pagination-info">
        Mostrando {{ startItem() }} - {{ endItem() }} de {{ totalItems() }} resultados
      </div>

      <div class="ale-pagination-controls">
        <button class="ale-page-btn ale-nav-btn" (click)="handleFirstPage()" [disabled]="currentPage() === 1">
          <svg lucideChevronsLeft size="18"></svg>
        </button>
        <button class="ale-page-btn ale-nav-btn" (click)="handlePrevPage()" [disabled]="currentPage() === 1">
          <svg lucideChevronLeft size="18"></svg>
        </button>

        @for (page of pageNumbers(); track $index) {
          @if (page === '...') {
            <div class="ale-page-ellipsis">...</div>
          } @else {
            <button
              class="ale-page-btn ale-page-num"
              [class.active]="page === currentPage()"
              (click)="handlePageClick(page)"
            >
              {{ page }}
            </button>
          }
        }

        <button class="ale-page-btn ale-nav-btn" (click)="handleNextPage()" [disabled]="currentPage() === totalPages()">
          <svg lucideChevronRight size="18"></svg>
        </button>
        <button class="ale-page-btn ale-nav-btn" (click)="handleLastPage()" [disabled]="currentPage() === totalPages()">
          <svg lucideChevronsRight size="18"></svg>
        </button>
      </div>

      @if (showItemsPerPage()) {
        <mat-form-field appearance="outline" class="ale-page-size">
          <mat-select [value]="itemsPerPage()" (selectionChange)="itemsPerPageChange.emit($event.value)">
            @for (option of itemsPerPageOptions(); track option) {
              <mat-option [value]="option">{{ option }} por página</mat-option>
            }
          </mat-select>
        </mat-form-field>
      }
    </div>
  `,
  styles: [`
    .ale-pagination {
      display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
      padding: 16px; border-radius: 16px; background-color: var(--color-sidebar);
      backdrop-filter: blur(20px); border: 1px solid var(--color-border);
    }
    .ale-pagination-info { color: var(--color-text); opacity: 0.8; font-size: 0.875rem; }
    .ale-pagination-controls { display: flex; align-items: center; gap: 4px; }
    .ale-page-btn {
      min-width: 36px; height: 36px; border-radius: 10px; border: none; padding: 0;
      background-color: transparent; color: var(--color-text); cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center; font-family: inherit;
      transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
    }
    .ale-page-btn:hover:not(:disabled) { background-color: var(--color-hover); color: var(--color-primary); }
    .ale-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .ale-page-btn.ale-nav-btn { border: 1px solid var(--color-border); background-color: var(--color-background); }
    .ale-page-btn.ale-nav-btn:hover:not(:disabled) { border-color: var(--color-primary); }
    .ale-page-num { font-size: 0.875rem; font-weight: 500; }
    .ale-page-num:hover:not(.active) { background-color: var(--color-primarySoft); color: var(--color-primary); }
    .ale-page-num.active {
      background-color: var(--color-primary);
      color: white; font-weight: 700; box-shadow: var(--color-focusShadow);
    }
    .ale-page-ellipsis { min-width: 24px; text-align: center; color: var(--color-text); opacity: 0.7; }
    .ale-page-size { width: 150px; }
    .ale-page-size ::ng-deep .mat-mdc-text-field-wrapper { border-radius: 10px; }
  `],
})
export class PaginationComponent {
  currentPage = input(1);
  totalPages = input(0);
  totalItems = input(0);
  itemsPerPage = input(10);
  itemsPerPageOptions = input<number[]>([10, 20, 50, 100]);
  showItemsPerPage = input(true);

  pageChange = output<number>();
  itemsPerPageChange = output<number>();

  startItem = computed(() => (this.totalItems() === 0 ? 0 : (this.currentPage() - 1) * this.itemsPerPage() + 1));
  endItem = computed(() => Math.min(this.currentPage() * this.itemsPerPage(), this.totalItems()));

  pageNumbers = computed<(number | string)[]>(() => {
    const totalPages = this.totalPages();
    const currentPage = this.currentPage();
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  });

  handleFirstPage(): void {
    if (this.currentPage() > 1) this.pageChange.emit(1);
  }

  handlePageClick(page: number | string): void {
    if (typeof page === 'number') this.pageChange.emit(page);
  }

  handlePrevPage(): void {
    if (this.currentPage() > 1) this.pageChange.emit(this.currentPage() - 1);
  }

  handleNextPage(): void {
    if (this.currentPage() < this.totalPages()) this.pageChange.emit(this.currentPage() + 1);
  }

  handleLastPage(): void {
    if (this.currentPage() < this.totalPages()) this.pageChange.emit(this.totalPages());
  }
}
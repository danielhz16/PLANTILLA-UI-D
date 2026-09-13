import { Component, input } from '@angular/core';
import { LucideInbox, LucideSearchX } from '@lucide/angular';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [LucideInbox, LucideSearchX],
  template: `
    <div class="ale-nodata">
      @if (isFetched()) {
        <svg lucideInbox [style.width.px]="60" [style.height.px]="60"></svg>
      } @else {
        <svg lucideSearchX [style.width.px]="60" [style.height.px]="60"></svg>
      }
      <span>{{ message }}</span>
    </div>
  `,
  styles: [`
    .ale-nodata {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 8px; width: 100%; user-select: none; padding: 48px 0; opacity: 0.55; color: var(--color-text);
    }
    .ale-nodata span { font-size: 1rem; font-weight: 600; }
  `],
})
export class NoDataComponent {
  name = input<string>();
  isFetched = input<boolean>();
  emptyLabel = input<string>();
  filterLabel = input<string>();

  get message(): string {
    if (this.isFetched()) return this.emptyLabel() || 'NO HAY DATOS';
    return this.filterLabel() || `Usa los filtros para listar ${this.name() || 'datos'}`;
  }
}
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-preview',
  template: `
    @if (loading()) {
      <div class="preview-block" [style.width]="width()" [style.height]="height()" [style.borderRadius]="radius()"></div>
    } @else {
      <ng-content></ng-content>
    }
  `,
  styles: `
    .preview-block {
      background: linear-gradient(90deg, var(--color-hover) 25%, var(--color-border) 37%, var(--color-hover) 63%);
      background-size: 400% 100%;
      animation: ale-shimmer 1.4s ease infinite;
    }
    @keyframes ale-shimmer {
      0% { background-position: 100% 50%; }
      100% { background-position: 0 50%; }
    }
  `,
})
export class PreviewComponent {
  loading = input(false);
  width = input<string | number>('100%');
  height = input<string | number>('15px');
  radius = input<string | number>('4px');
}
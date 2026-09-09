import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    @if (isPending()) {
      <div class="loader-backdrop">
        <div class="loader-spinner"></div>
      </div>
    }
  `,
  styles: `
    .loader-backdrop {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-loaderBackdrop);
      backdrop-filter: blur(4px);
    }
    .loader-spinner {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: 4px solid var(--color-border);
      border-top-color: var(--color-primary);
      animation: ale-spin 0.8s linear infinite;
    }
    @keyframes ale-spin {
      to { transform: rotate(360deg); }
    }
  `,
})
export class LoaderComponent {
  isPending = input(false);
}
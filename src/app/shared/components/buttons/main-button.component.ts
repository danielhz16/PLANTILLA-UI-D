import { Component, input } from '@angular/core';

@Component({
  selector: 'app-main-button',
  template: `
    <button
      type="button"
      class="crystal-btn"
      [class.loading]="loading()"
      [class.full-width]="fullWidth()"
      [class.gradient]="gradient()"
      [disabled]="loading() || disabled()"
      [style.background]="gradient() ? 'var(--color-authGradient)' : variant() === 'contained' ? bgColor() : ''"
      [style.color]="variant() === 'contained' || gradient() ? 'white' : 'var(--color-text)'"
      [style.borderColor]="variant() === 'outlined' ? borderColor() : ''"
    >
      @if (loading()) {
        <span class="btn-spinner"></span>
      }
      <ng-content></ng-content>
    </button>
  `,
  styles: `
    .crystal-btn {
      backdrop-filter: blur(16px) saturate(180%);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px var(--color-shadowCard);
      padding: 8px 24px;
      text-transform: none;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
      gap: 8px;
      min-width: auto;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
    }
    .crystal-btn:not([disabled]):hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px var(--color-buttonShadow);
    }
    .crystal-btn.gradient {
      box-shadow: var(--color-authGradientShadow);
      border-radius: 12px;
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: 0.2px;
      padding: 0.9rem 1.5rem;
    }
    .crystal-btn.gradient:not([disabled]):hover {
      background: var(--color-authGradientHover);
      box-shadow: var(--color-authGradientShadowHover);
      transform: translateY(-1px);
    }
    .crystal-btn[disabled] {
      background: var(--color-hover);
      opacity: 0.4;
      color: var(--color-text) !important;
      border: 1px solid var(--color-border);
      filter: grayscale(0.5);
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }
    .full-width { width: 100%; }
    .btn-spinner {
      width: 16px; height: 16px;
      border-radius: 50%;
      border: 2px solid currentColor;
      border-top-color: transparent;
      animation: ale-spin 0.7s linear infinite;
    }
    @keyframes ale-spin { to { transform: rotate(360deg); } }
  `,
})
export class MainButtonComponent {
  variant = input<'contained' | 'outlined' | 'text'>('contained');
  loading = input(false);
  disabled = input(false);
  fullWidth = input(false);
  color = input('primary');
  gradient = input(false);

  bgColor(): string {
    switch (this.color()) {
      case 'success':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'error':
        return 'var(--color-error)';
      case 'secondary':
        return 'var(--color-secondary)';
      default:
        return 'var(--color-primary)';
    }
  }

  borderColor(): string {
    if (this.color() === 'primary') return 'var(--color-border)';
    const tokens: Record<string, string> = {
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      error: 'var(--color-error)',
    };
    return tokens[this.color()] ?? 'var(--color-border)';
  }
}
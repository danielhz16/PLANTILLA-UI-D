import { Component } from '@angular/core';
import { ThemeService } from '@core/theme/theme.service';
import { LucideSun, LucideMoon } from '@lucide/angular';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [LucideSun, LucideMoon],
  template: `
    <button
      class="toolbar-toggle"
      (click)="toggleTheme()"
      [attr.title]="theme.isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
    >
      @if (theme.isDark()) {
        <svg lucideSun size="20"></svg>
      } @else {
        <svg lucideMoon size="20"></svg>
      }
    </button>
  `,
  styles: [`
    .toolbar-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      border: 1px solid var(--color-border);
      background-color: var(--color-sidebar);
      backdrop-filter: blur(20px);
      color: var(--color-text);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    .toolbar-toggle:hover {
      background-color: var(--color-hover);
      border-color: var(--color-primary);
      transform: translateY(-2px);
      box-shadow: var(--color-toggleHoverShadow);
    }
    .toolbar-toggle:active {
      transform: translateY(0px);
    }
    .toolbar-toggle svg {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      filter: var(--color-toggleIconShadow);
    }
  `],
})
export class ThemeToggleComponent {
  constructor(public theme: ThemeService) {}

  toggleTheme(): void {
    this.theme.toggleTheme();
  }
}
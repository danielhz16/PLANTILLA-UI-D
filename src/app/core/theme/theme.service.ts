import { Injectable, signal } from '@angular/core';
import { themeConfig, ThemeType } from '@core/theme/theme-config';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'ale-theme';
  private themeSignal = signal<ThemeType>('light');

  readonly theme = this.themeSignal.asReadonly();
  readonly isDark = signal<boolean>(false);

  get currentTheme(): ThemeType {
    return this.themeSignal();
  }

  get colors() {
    return themeConfig[this.currentTheme];
  }

  constructor() {
    this.init();
  }

  private init(): void {
    const saved = localStorage.getItem(this.storageKey) as ThemeType;
    this.apply(saved === 'dark' ? 'dark' : 'light');
  }

  toggleTheme(): void {
    this.apply(this.currentTheme === 'light' ? 'dark' : 'light');
  }

  private apply(theme: ThemeType): void {
    this.themeSignal.set(theme);
    this.isDark.set(theme === 'dark');
    const root = document.documentElement;
    const colors = themeConfig[theme];

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    root.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);
  }
}

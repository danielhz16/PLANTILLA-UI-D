import { Component, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { UserProfileComponent } from '@layout/user-profile.component';
import { ThemeToggleComponent } from '@components/layout/theme-toggle.component';
import { MenuService } from '@routes/menu.service';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [UserProfileComponent, ThemeToggleComponent],
  template: `
    <header class="layout-header">
      <div class="header-left">
        <span class="header-title">{{ title() }}</span>
      </div>
      <div class="header-right">
        <app-theme-toggle></app-theme-toggle>
        <app-user-profile></app-user-profile>
      </div>
    </header>
  `,
  styles: [`
    .layout-header {
      width: 100%;
      padding: 1.25rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      border-bottom: 1px solid var(--color-border);
      position: sticky;
      top: 0;
      z-index: 10;
      backdrop-filter: blur(20px);
      background: var(--color-headerBg);
    }
    .header-left { display: flex; align-items: center; gap: 2rem; flex: 1; min-width: 0; }
    .header-title {
      font-weight: 700;
      color: var(--color-text);
      letter-spacing: -0.02em;
      font-size: 1.375rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .header-right { display: flex; align-items: center; gap: 1rem; }
  `],
})
export class LayoutHeaderComponent {
  private readonly router = inject(Router);
  private readonly menuService = inject(MenuService);

  readonly title = signal(this.menuService.titleForUrl(this.router.url));

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.title.set(this.menuService.titleForUrl(this.router.url)));
  }
}
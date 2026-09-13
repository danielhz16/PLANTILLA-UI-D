import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@layout/sidebar.component';
import { LayoutHeaderComponent } from '@layout/layout-header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, LayoutHeaderComponent],
  template: `
    <div class="layout-root">
      <app-sidebar></app-sidebar>
      <main class="layout-main">
        <app-layout-header></app-layout-header>
        <div class="layout-content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .layout-root {
      display: flex;
      min-height: 100vh;
      width: 100%;
      background: var(--color-background);
      background-image: radial-gradient(ellipse at 0% 0%, var(--color-gradientBgPrimary) 0px, transparent 55%),
        radial-gradient(ellipse at 100% 0%, var(--color-gradientBgSecondary) 0px, transparent 55%),
        radial-gradient(ellipse at 50% 100%, var(--color-gradientBgTertiary) 0px, transparent 50%);
    }
    .layout-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .layout-content {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  `],
})
export class MainLayoutComponent {}
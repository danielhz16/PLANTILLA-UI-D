import { Component, HostListener, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuService } from '@routes/menu.service';
import { ThemeService } from '@core/theme/theme.service';
import { IconComponent } from '@components/icon/icon.component';
import { INFO_SYSTEM } from '@conf/info.system';
import { LucideChevronLeft, LucideChevronRight, LucideChevronDown } from '@lucide/angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, IconComponent, LucideChevronLeft, LucideChevronRight, LucideChevronDown],
  template: `
    <aside
      class="sidebar"
      [class.collapsed]="collapsed()"
      aria-label="Sidebar navigation"
      (mouseenter)="hovered.set(true)"
      (mouseleave)="hovered.set(false)"
    >
      <div class="sidebar-header">
        <span class="logo-text">
          <img
            class="logo-img"
            [src]="collapsed() ? info.minlogo : info.fulllogo"
            [alt]="info.name"
            [style.height.px]="collapsed() ? 28 : 48"
            [style.filter]="logoFilter()"
          />
        </span>
        <button
          class="collapse-btn"
          (click)="toggleSidebar()"
          [attr.aria-label]="collapsed() ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          @if (collapsed()) {
            <svg lucideChevronRight size="16"></svg>
          } @else {
            <svg lucideChevronLeft size="16"></svg>
          }
        </button>
      </div>

      <nav class="sidebar-nav" aria-label="Main navigation">
        @for (item of menuItems(); track item.path) {
          @if (item.children && item.children.length > 0) {
            <div class="nav-group">
              <button
                class="nav-item nav-group-header"
                [class.parent-active]="groupActive(item)"
                (click)="toggleMenu(item.path)"
                [attr.title]="collapsed() ? item.name : ''"
                [attr.aria-expanded]="isOpen(item.path)"
                type="button"
              >
                <span class="nav-icon">
                  <app-icon [name]="item.icon ?? 'Folder'"></app-icon>
                </span>
                @if (!collapsed()) {
                  <span class="nav-label">{{ item.name }}</span>
                  <span class="nav-group-arrow" [class.open]="isOpen(item.path)">
                    <svg lucideChevronDown size="16"></svg>
                  </span>
                }
              </button>
              @if (!collapsed()) {
                <div class="nav-group-children" [class.expanded]="isOpen(item.path)">
                  @for (child of item.children; track child.path) {
                    <a
                      class="nav-item nav-child"
                      [class.active]="menuService.isActive(child.path)"
                      [routerLink]="child.path"
                      [attr.title]="child.name"
                    >
                      <span class="nav-icon">
                        <app-icon [name]="child.icon ?? 'Folder'"></app-icon>
                      </span>
                      <span class="nav-label">{{ child.name }}</span>
                    </a>
                  }
                </div>
              }
            </div>
          } @else {
            <a
              class="nav-item"
              [class.active]="menuService.isActive(item.path)"
              [routerLink]="item.path"
              [attr.title]="collapsed() ? item.name : ''"
            >
              <span class="nav-icon">
                <app-icon [name]="item.icon ?? 'Folder'"></app-icon>
              </span>
              @if (!collapsed()) {
                <span class="nav-label">{{ item.name }}</span>
              }
            </a>
          }
        }
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      height: calc(100vh - 32px);
      margin: 16px 0 16px 16px;
      background: var(--color-sidebar);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--color-border);
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, border 0.3s ease;
      position: sticky;
      top: 16px;
      overflow-x: visible;
      z-index: 100;
      box-shadow: var(--color-sidebarShadow);
    }
    .sidebar.collapsed { width: 88px; }
    .sidebar-header {
      height: 78px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      margin-bottom: 1.25rem;
      position: relative;
      flex-shrink: 0;
    }
    .collapsed .sidebar-header { padding: 0; justify-content: center; }
    .logo-text {
      font-weight: 800;
      white-space: nowrap;
      display: flex;
      align-items: center;
      line-height: 0;
    }
    .logo-img {
      max-width: 160px;
      object-fit: contain;
      transition: filter 0.3s ease, height 0.3s ease;
    }
    .collapse-btn {
      background: var(--color-hover);
      border: 1px solid var(--color-border);
      color: var(--color-text);
      width: 32px;
      height: 32px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      position: absolute;
      right: -16px;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: var(--color-collapseBtnShadow);
      z-index: 120;
    }
    .collapse-btn:hover {
      background: var(--color-primary);
      color: var(--color-textOnPrimary);
      border-color: transparent;
    }
    .sidebar-nav {
      flex: 1;
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.8rem 1rem;
      cursor: pointer;
      color: var(--color-sidebarNavText);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      white-space: nowrap;
      text-decoration: none;
      border-radius: 14px;
      opacity: 1;
      font-weight: 500;
    }
    .nav-item:hover {
      background-color: var(--color-hover);
      color: var(--color-text);
      opacity: 1;
      transform: translateX(4px);
    }
    button.nav-item {
      width: 100%;
      border: none;
      outline: none;
      background: none;
      font-family: inherit;
      font-size: inherit;
      text-align: left;
    }
    .collapsed .nav-item:hover { transform: none; }
    .nav-item.active {
      background: var(--color-primarySoft);
      color: var(--color-primary);
      opacity: 1;
      position: relative;
    }
    .nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      bottom: 20%;
      width: 3px;
      border-radius: 0 3px 3px 0;
      background: var(--color-primary);
    }
    .collapsed .nav-item { padding: 0.8rem; justify-content: center; margin: 0 0.5rem; }
    .nav-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      transition: transform 0.2s ease;
    }
    .nav-item:hover .nav-icon { transform: scale(1.1); }
    .nav-label { margin-left: 1rem; font-size: 0.95rem; }
    .nav-group { display: flex; flex-direction: column; }
    .nav-group-header { justify-content: flex-start; position: relative; }
    .nav-group-header.parent-active { opacity: 1; color: var(--color-primary); }
    .nav-group-arrow {
      display: flex;
      align-items: center;
      margin-left: auto;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .nav-group-arrow.open { transform: rotate(180deg); }
    .nav-group-children {
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
    }
    .nav-group-children.expanded { max-height: 300px; opacity: 1; }
    .nav-child { padding-left: 2.8rem !important; font-size: 0.9rem; }
    .nav-child .nav-icon { min-width: 20px; }
    .nav-child .nav-label { font-size: 0.88rem; }
    .collapsed .nav-group-header { justify-content: center; }
  `],
})
export class SidebarComponent {
  readonly collapsed = signal(false);
  readonly hovered = signal(false);
  readonly openMenus = signal<Record<string, boolean>>({});
  readonly info = INFO_SYSTEM;

  constructor(
    public menuService: MenuService,
    private theme: ThemeService,
  ) {}

  readonly menuItems = computed(() => this.menuService.menu());

  logoFilter(): string | undefined {
    return this.theme.isDark() ? 'brightness(0) invert(1)' : undefined;
  }

  collapsible(): boolean {
    return this.collapsed() && !this.hovered();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
      event.preventDefault();
      this.toggleSidebar();
    }
  }

  toggleSidebar(): void {
    this.hovered.set(false);
    this.collapsed.update((prev) => !prev);
  }

  toggleMenu(key: string): void {
    this.openMenus.update((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  isOpen(key: string): boolean {
    return this.openMenus()[key] ?? false;
  }

  groupActive(item: { path: string; children?: { path?: string }[] }): boolean {
    if (this.menuService.isActive(item.path)) return true;
    return (item.children ?? []).some((child) => child.path && this.menuService.isActive(child.path));
  }
}
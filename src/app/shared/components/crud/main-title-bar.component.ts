import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RightComponent } from '@components/layout/Right.component';
import { ButtonStatusComponent } from '@components/filter/button-status.component';
import { MainButtonComponent } from '@components/buttons/main-button.component';
import { AuthStore } from '@core/auth/auth.store';
import { TYPES_AUTHORIZATIONS } from '@features/auth/const/auth';
import { LucideSave, LucideRefreshCw } from '@lucide/angular';

@Component({
  selector: 'app-main-title-bar',
  standalone: true,
  imports: [RightComponent, ButtonStatusComponent, MainButtonComponent, MatTooltipModule, LucideSave, LucideRefreshCw],
  template: `
    <app-right>
      @if (!disabledButtonStatus()) {
        <app-button-status
          [active]="statusActive()"
          [toggleStatus]="toggleStatus()"
          [isPending]="isPending()"
        ></app-button-status>
      }
      <button class="ale-refresh-btn" type="button" (click)="get()()" [disabled]="isPending()"
              [matTooltip]="'Actualizar'">
        <svg lucideRefreshCw size="18"></svg>
      </button>
      @if (canCreate()) {
        <app-main-button variant="contained" (click)="handleCreate()" [disabled]="isPending()">
          Crear
          <svg lucideSave size="18"></svg>
        </app-main-button>
      }
      <ng-content></ng-content>
    </app-right>
  `,
  styles: [`
    :host { display: block; }
    .ale-refresh-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 38px; height: 38px; border-radius: 8px; cursor: pointer;
      color: var(--color-text); background: transparent;
      border: 1px solid var(--color-border); font-family: inherit; font-size: 0.875rem;
      transition: background-color 0.18s ease, color 0.18s ease;
    }
    .ale-refresh-btn:hover { background: var(--color-hover); color: var(--color-primary); }
    .ale-refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  `],
})
export class MainTitleBarComponent {
  title = input('');
  toCreate = input<string | undefined>(undefined);
  name = input<string | undefined>(undefined);
  permission = input<string | undefined>(undefined);
  enabledCreate = input<boolean | undefined>(undefined);
  isPending = input(false);
  get = input<() => void>(() => undefined);
  disabledButtonStatus = input(false);
  statusActive = input(true);
  toggleStatus = input<() => void>(() => undefined);

  constructor(
    private router: Router,
    private auth: AuthStore,
  ) {}

  canCreate(): boolean {
    if (this.enabledCreate() !== undefined) return this.enabledCreate() ?? false;
    if (!this.permission()) return true;
    return this.auth.validatePermission(this.permission()!, TYPES_AUTHORIZATIONS.Write);
  }

  handleCreate(): void {
    void this.router.navigate([this.toCreate() ?? '/']);
  }
}
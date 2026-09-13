import { Component, input } from '@angular/core';
import { MainCardComponent } from '@components/cards/main-card.component';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [MainCardComponent],
  template: `
    <app-main-card>
      <div class="stats-row">
        <div class="stats-text">
          <div class="stats-title">{{ title() }}</div>
          <div class="stats-value">{{ value() }}</div>
          @if (subtitle()) {
            <div class="stats-subtitle">{{ subtitle() }}</div>
          }
        </div>
        @if (icon()) {
          <div class="stats-icon" [style.backgroundColor]="iconBg()" [style.color]="iconColor()">
            <ng-content select="[icon]"></ng-content>
          </div>
        }
      </div>
    </app-main-card>
  `,
  styles: `
    .stats-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
    .stats-title { color: var(--color-text); opacity: 0.7; font-weight: 500; font-size: 0.875rem; margin-bottom: 4px; }
    .stats-value { color: var(--color-text); font-weight: 800; font-size: 1.7rem; line-height: 1.1; }
    .stats-subtitle { color: var(--color-text); opacity: 0.5; font-size: 0.75rem; margin-top: 4px; display: block; }
    .stats-icon {
      width: 44px; height: 44px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
  `,
})
export class StatsCardComponent {
  title = input('');
  value = input<number | string>('');
  colorToken = input<string | undefined>(undefined);
  subtitle = input('');
  icon = input(true);

  iconBg(): string {
    const token = this.colorToken();
    return token ? `var(--color-${token}Soft)` : 'var(--color-primarySoft)';
  }

  iconColor(): string {
    const token = this.colorToken();
    return token ? `var(--color-${token})` : 'var(--color-primary)';
  }
}
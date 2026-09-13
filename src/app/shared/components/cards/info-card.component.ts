import { Component, input } from '@angular/core';
import { MainCardComponent } from '@components/cards/main-card.component';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [MainCardComponent],
  template: `
    <app-main-card>
      <div class="info-row">
        <div class="info-icon" [style.backgroundColor]="iconBg()" [style.color]="iconColor()">
          <ng-content select="[icon]"></ng-content>
        </div>
        <div class="info-text">
          <div class="info-label">{{ label() }}</div>
          <div class="info-value" [title]="value()">{{ value() }}</div>
        </div>
      </div>
    </app-main-card>
  `,
  styles: `
    .info-row { display: flex; align-items: center; gap: 16px; }
    .info-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .info-text { min-width: 0; }
    .info-label { color: var(--color-text); opacity: 0.6; font-weight: 500; font-size: 0.7rem; line-height: 1.4; }
    .info-value { color: var(--color-text); font-weight: 500; font-size: 0.9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  `,
})
export class InfoCardComponent {
  label = input('');
  value = input('');
  colorToken = input<string | undefined>(undefined);

  iconBg(): string {
    const token = this.colorToken();
    return token ? `var(--color-${token}Soft)` : 'var(--color-primarySoft)';
  }

  iconColor(): string {
    const token = this.colorToken();
    return token ? `var(--color-${token})` : 'var(--color-primary)';
  }
}
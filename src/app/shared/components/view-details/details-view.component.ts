import { Component, input } from '@angular/core';
import { DetailField } from '@shared/types/details';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-details-view',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="ale-details">
      @for (field of fields(); track field.name; let index = $index) {
        <div class="ale-detail-row">
          @if (index > 0) {
            <div class="ale-detail-divider"></div>
          }
          <div class="ale-detail-body">
            @if (field.icon) {
              <div class="ale-detail-icon">
                <app-icon [name]="field.icon" [size]="18"></app-icon>
              </div>
            }
            <div class="ale-detail-content">
              <div class="ale-detail-label">{{ field.label }}</div>
              <div class="ale-detail-value" [title]="stringValue(field)">{{ stringValue(field) }}</div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .ale-details { padding: 16px; }
    .ale-detail-row { padding: 8px 0; }
    .ale-detail-divider { border-top: 1px solid var(--color-border); opacity: 0.4; margin: 16px 0; }
    .ale-detail-body { display: flex; align-items: flex-start; gap: 20px; }
    .ale-detail-icon {
      width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
      background: var(--color-primarySoft); color: var(--color-primary);
      display: flex; align-items: center; justify-content: center;
    }
    .ale-detail-content { flex: 1; min-width: 0; padding-top: 2px; }
    .ale-detail-label {
      color: var(--color-text); opacity: 0.6; font-weight: 600; letter-spacing: 0.05em;
      text-transform: uppercase; font-size: 0.65rem; display: block; margin-bottom: 4px;
    }
    .ale-detail-value {
      font-weight: 600; color: var(--color-text); font-size: 0.9rem; line-height: 1.5; word-break: break-word;
    }
  `],
})
export class DetailsViewComponent {
  fields = input<DetailField[]>([]);
  data = input<Record<string, unknown>>({});

  stringValue(field: DetailField): string {
    const raw = this.data()[field.name];
    const rendered = field.value ? field.value(raw) : raw;
    const value = rendered !== null && rendered !== undefined && rendered !== '' ? String(rendered) : '—';
    return value;
  }
}
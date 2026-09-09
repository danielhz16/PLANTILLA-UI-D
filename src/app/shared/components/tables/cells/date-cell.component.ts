import { Component, input, computed } from '@angular/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/es';
import { MatTooltipModule } from '@angular/material/tooltip';

dayjs.extend(utc);

@Component({
  selector: 'app-date-cell',
  standalone: true,
  imports: [MatTooltipModule],
  template: `
    @if (formatted()?.short) {
      <span class="ale-date" [matTooltip]="formatted()?.long ?? ''" matTooltipPosition="above">{{ formatted()?.short }}</span>
    } @else {
      <span>-</span>
    }
  `,
  styles: [`
    .ale-date { color: var(--color-date); font-weight: 400; font-size: 0.8125rem; cursor: help; white-space: nowrap; }
  `],
})
export class DateCellComponent {
  date = input<Date | string | null>(null);

  formatted = computed(() => {
    const value = this.date();
    if (!value) return null;
    const base = dayjs(value).add(dayjs().utcOffset(), 'minutes').locale('es');
    return {
      short: base.format('DD/MM/YYYY HH:mm'),
      long: base.format('dddd, DD [de] MMMM [de] YYYY, HH:mm'),
    };
  });
}
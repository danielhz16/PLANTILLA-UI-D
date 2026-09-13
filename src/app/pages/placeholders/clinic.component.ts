import { Component } from '@angular/core';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-clinic',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2rem; padding-block: 8rem;">
      <div style="opacity: 0.3;">
        <app-icon name="Stethoscope" [size]="48"></app-icon>
      </div>
      <div style="font-weight: 600; color: var(--color-text); opacity: 0.5; font-size: 1.5rem;">Clínica</div>
    </div>
  `,
  styles: [`:host { display: flex; flex: 1; }`],
})
export class ClinicComponent {}
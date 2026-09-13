import { Component, input } from '@angular/core';
import { MainButtonComponent } from '@components/buttons/main-button.component';

@Component({
  selector: 'app-button-status',
  standalone: true,
  imports: [MainButtonComponent],
  template: `
    <app-main-button
      variant="contained"
      [color]="active() ? 'error' : 'success'"
      (click)="toggleStatus()()"
      [disabled]="isPending()"
    >
      {{ active() ? 'Inactivos' : 'Activos' }}
    </app-main-button>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class ButtonStatusComponent {
  active = input(true);
  isPending = input(false);
  toggleStatus = input<() => void>(() => undefined);
}
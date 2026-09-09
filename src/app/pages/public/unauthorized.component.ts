import { Component } from '@angular/core';
import { MainButtonComponent } from '@components/buttons/main-button.component';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [MainButtonComponent, IconComponent],
  template: `
    <div class="unauthorized">
      <app-icon name="ShieldX" [size]="64"></app-icon>
      <h2>Sin autorización</h2>
      <p>No tienes permisos para acceder a esta sección.</p>
      <app-main-button variant="contained" (click)="goBack()">Volver al inicio</app-main-button>
    </div>
  `,
  styles: [`
    .unauthorized {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      background: var(--color-background);
      color: var(--color-text);
      text-align: center;
      padding: 2rem;
    }
    .unauthorized h2 { margin: 0; }
    .unauthorized p { opacity: 0.6; }
  `],
})
export class UnauthorizedComponent {
  goBack(): void {
    globalThis.location.href = '/dashboard';
  }
}
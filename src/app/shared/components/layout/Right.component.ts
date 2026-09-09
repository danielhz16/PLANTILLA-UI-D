import { Component } from '@angular/core';

@Component({
  selector: 'app-right',
  standalone: true,
  template: `
    <div class="right-actions">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .right-actions {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
      color: var(--color-text);
    }
  `,
})
export class RightComponent {}

import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'app-main-card',
  template: `<ng-content></ng-content>`,
  styles: `
    :host {
      display: block;
      border-radius: 10px;
      background-color: var(--color-bgCard);
      border: 1px solid var(--color-border);
      box-shadow: 0 1px 3px var(--color-shadowCard);
    }
  `,
})
export class MainCardComponent {
  customMinHeight = input<string>('');
  padding = input('16px');

  @HostBinding('style.minHeight') get minHeight() {
    return this.customMinHeight();
  }

  @HostBinding('style.padding') get paddingCss() {
    return this.padding();
  }
}
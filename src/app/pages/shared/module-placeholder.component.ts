import { Component, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-module-placeholder',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2rem; padding-block: 8rem;">
      <div style="opacity: 0.3;">
        <app-icon [name]="resolvedIcon()" [size]="48"></app-icon>
      </div>
      <div style="font-weight: 600; color: var(--color-text); opacity: 0.5; font-size: 1.5rem;">{{ resolvedLabel() }}</div>
    </div>
  `,
  styles: [`:host { display: flex; flex: 1; }`],
})
export class ModulePlaceholderComponent {
  icon = input('Folder');
  label = input('');

  constructor(private route: ActivatedRoute) {}

  resolvedIcon(): string {
    return (this.route.snapshot.data['icon'] as string | undefined) ?? this.icon();
  }

  resolvedLabel(): string {
    return (this.route.snapshot.data['label'] as string | undefined) ?? this.label();
  }
}
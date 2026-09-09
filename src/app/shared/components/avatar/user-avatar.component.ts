import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  template: `
    <div
      class="avatar"
      [style.width.px]="size()"
      [style.height.px]="size()"
      [style.fontSize]="fontSize()"
      [style.backgroundColor]="bgColor()"
      [style.border]="'2px solid var(--color-border)'"
    >
      {{ initials() }}
    </div>
  `,
  styles: `
    .avatar {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 700;
      flex-shrink: 0;
      user-select: none;
    }
  `,
})
export class UserAvatarComponent {
  name = input('');
  size = input(40);
  fontSize = input('0.9rem');

  initials = computed(() => {
    const parts = this.name().trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const second = parts.length > 1 ? parts[parts.length - 1]?.[0] : '';
    return (first + second || '?').toUpperCase();
  });

  bgColor = computed(() => {
    const palette = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#0ea5e9', '#6366f1', '#64748b'];
    let hash = 0;
    const name = this.name();
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return palette[Math.abs(hash) % palette.length];
  });
}
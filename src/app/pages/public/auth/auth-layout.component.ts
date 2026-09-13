import { Component, input } from '@angular/core';
import { INFO_SYSTEM } from '@conf/info.system';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  template: `
    <div class="auth-root">
      <div class="auth-brand">
        <div class="brand-circle brand-circle-1"></div>
        <div class="brand-circle brand-circle-2"></div>
        <div class="brand-content">
          @if (info.fulllogo) {
            <img [src]="info.fulllogo" [alt]="info.name" class="brand-logo" />
          }
          <div class="brand-description">{{ info.description }}</div>
          @if (subtitle()) {
            <div class="brand-subtitle">{{ subtitle() }}</div>
          }
        </div>
      </div>

      <div class="auth-panel">
        @if (info.fulllogo) {
          <div class="auth-logo-mobile">
            <img [src]="info.fulllogo" [alt]="info.name" />
          </div>
        }
        <div class="auth-content">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-root {
      min-height: 100vh;
      width: 100vw;
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      user-select: none;
    }
    .auth-brand {
      display: none;
      flex: 0 0 45%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      background: linear-gradient(160deg, #2563eb 0%, #1a3ea8 55%, #1230a0 100%);
      padding: 6rem;
      position: relative;
      overflow: hidden;
    }
    @media (min-width: 900px) {
      .auth-brand { display: flex; }
    }
    .brand-circle-1 {
      position: absolute;
      width: 420px;
      height: 420px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      top: -120px;
      right: -140px;
      pointer-events: none;
    }
    .brand-circle-2 {
      position: absolute;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.06);
      bottom: -80px;
      left: -80px;
      pointer-events: none;
    }
    .brand-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3rem;
      position: relative;
      z-index: 1;
    }
    .brand-logo {
      width: 100%;
      max-width: 220px;
      object-fit: contain;
      filter: brightness(0) invert(1);
    }
    .brand-description {
      color: #ffffff;
      font-weight: 700;
      text-align: center;
      letter-spacing: 0.3px;
      font-size: 1.5rem;
    }
    .brand-subtitle {
      color: rgba(255, 255, 255, 0.65);
      text-align: center;
      max-width: 280px;
      line-height: 1.7;
      font-size: 0.875rem;
    }
    .auth-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: var(--color-background);
      padding: 3rem;
    }
    @media (min-width: 600px) {
      .auth-panel { padding: 6rem; }
    }
    .auth-logo-mobile {
      display: flex;
      justify-content: center;
      margin-bottom: 4rem;
    }
    .auth-logo-mobile img { width: 160px; object-fit: contain; }
    @media (min-width: 900px) {
      .auth-logo-mobile { display: none; }
    }
    .auth-content { width: 100%; max-width: 380px; }
  `],
})
export class AuthLayoutComponent {
  subtitle = input<string | undefined>(undefined);
  readonly info = INFO_SYSTEM;
}
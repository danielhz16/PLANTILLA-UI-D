import { Component, input, signal, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LucideEye, LucideEyeOff } from '@lucide/angular';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, LucideEye, LucideEyeOff],
  template: `
    <mat-form-field appearance="outline" class="ale-password">
      <input
        matInput
        class="ale-password-input"
        [type]="visible() ? 'text' : 'password'"
        [value]="value"
        (input)="onInput($event)"
        [placeholder]="placeholder()"
        [disabled]="disabled"
        autocomplete="off"
      />
      <button matIconSuffix type="button" (click)="toggle()" tabindex="-1" class="ale-eye">
        @if (visible()) {
          <svg lucideEyeOff size="20"></svg>
        } @else {
          <svg lucideEye size="20"></svg>
        }
      </button>
    </mat-form-field>
  `,
  styles: `
    :host { display: block; width: 100%; }
    .ale-password { width: 100%; }
    .ale-eye {
      border: none;
      background: transparent;
      padding: 0;
      margin-right: 10px;
      display: flex;
      align-items: center;
      color: var(--color-text);
      opacity: 0.6;
      cursor: pointer;
    }
    .ale-eye:hover { opacity: 1; }
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: PasswordInputComponent, multi: true },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor {
  placeholder = input('');
  disabled = false;

  readonly visible = signal(false);
  value = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  toggle(): void {
    this.visible.set(!this.visible());
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  writeValue(value: unknown): void {
    this.value = (value as string) ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
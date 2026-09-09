import { Component, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LucidePhone } from '@lucide/angular';

@Component({
  selector: 'app-input-phone',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, LucidePhone],
  template: `
    <mat-form-field appearance="outline" class="ale-phone">
      <mat-icon matPrefix class="ale-phone-icon" style="display:flex; align-items:center;">
        <svg lucidePhone size="18"></svg>
      </mat-icon>
      <input
        matInput
        type="tel"
        [value]="value"
        (input)="onInput($event)"
        [placeholder]="placeholder()"
        [disabled]="disabled"
        autocomplete="off"
      />
    </mat-form-field>
  `,
  styles: `
    :host { display: block; width: 100%; }
    .ale-phone { width: 100%; }
    .ale-phone-icon { color: var(--color-text); opacity: 0.5; }
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputPhoneComponent, multi: true },
  ],
})
export class InputPhoneComponent implements ControlValueAccessor {
  placeholder = input('');
  disabled = false;

  value = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  onInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.value = raw;
    this.onChange(raw);
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
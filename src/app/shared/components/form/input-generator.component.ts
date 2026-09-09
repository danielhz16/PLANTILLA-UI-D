import { Component, input, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainSelectComponent } from '@components/form/inputs/main-select.component';
import { PasswordInputComponent } from '@components/form/inputs/password-input.component';
import { InputPhoneComponent } from '@components/form/inputs/input-phone.component';
import { Input } from '@shared/types/form';

const TEXTAREA_TYPES = ['textarea', 'area'];
const CUSTOM_TYPES = ['select', 'password', 'phone'];

@Component({
  selector: 'app-input-generator',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MainSelectComponent,
    PasswordInputComponent,
    InputPhoneComponent,
  ],
  template: `
    @if (isCustom()) {
      <ng-container [formGroup]="parentGroup()">
        @switch (input().type) {
          @case ('select') {
            <app-main-select
              [formControlName]="input().name"
              [options]="input().options ?? []"
              [placeholder]="input().placeholder ?? ''"
            />
          }
          @case ('password') {
            <app-password-input [formControlName]="input().name" [placeholder]="input().placeholder ?? ''" />
          }
          @case ('phone') {
            <app-input-phone [formControlName]="input().name" [placeholder]="input().placeholder ?? ''" />
          }
        }
      </ng-container>
      @if (errorMessage()) {
        <div class="ale-error-text">{{ errorMessage() }}</div>
      }
    } @else {
      <mat-form-field appearance="outline" floatLabel="always" class="ale-field" [class.ale-field-disabled]="fieldDisabled()">
        <mat-label class="ale-label">{{ input().label }}</mat-label>

        @if (isTextarea()) {
          <textarea matInput rows="4" [formControl]="control()" [placeholder]="input().placeholder || ''"></textarea>
        } @else if (input().type === 'checkbox') {
          <mat-checkbox [formControl]="control()">{{ input().label }}</mat-checkbox>
        } @else {
          <input matInput [type]="inputType()" [formControl]="control()" [placeholder]="input().placeholder || ''" />
        }

        @if (control().invalid && control().touched && errorMessage()) {
          <mat-error>{{ errorMessage() }}</mat-error>
        }
      </mat-form-field>
    }
  `,
  styles: `
    :host { display: block; width: 100%; }
    .ale-field { width: 100%; }
    .ale-label {
      font-weight: 600;
      color: var(--color-text);
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
      font-size: 0.75rem;
    }
    .ale-error-text { color: var(--color-error); font-weight: 500; font-size: 0.8rem; margin: 4px 0 0 4px; }
    .ale-field-disabled ::ng-deep .mat-mdc-text-field-wrapper { opacity: 0.6; }
  `,
})
export class InputGeneratorComponent {
  input = input.required<Input>();
  control = input.required<FormControl>();
  parentGroup = input.required<import('@angular/forms').FormGroup>();

  isTextarea = computed(() => TEXTAREA_TYPES.includes(this.input().type));
  isCustom = computed(() => CUSTOM_TYPES.includes(this.input().type));
  fieldDisabled = computed(() => this.control().disabled);

  inputType = computed(() => {
    if (this.input().type === 'number') return 'number';
    if (this.input().type === 'email') return 'email';
    if (this.input().type === 'date') return 'date';
    return 'text';
  });

  errorMessage = computed(() => {
    const control = this.control();
    if (control.invalid && control.errors) {
      return (control.errors as { message?: string }).message ?? '';
    }
    return '';
  });
}
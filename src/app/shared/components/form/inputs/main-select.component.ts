import { Component, input, signal, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LucideChevronDown, LucideXCircle, LucideSearch } from '@lucide/angular';
import { Options } from '@shared/types/options';

@Component({
  selector: 'app-main-select',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, LucideChevronDown, LucideXCircle, LucideSearch],
  template: `
    <mat-form-field appearance="outline" class="ale-select">
      <input
        matInput
        [value]="displayValue()"
        (input)="onInput($event)"
        (focus)="panelOpen.set(true)"
        [placeholder]="placeholder()"
        [disabled]="disabled"
        [matAutocomplete]="auto"
        autocomplete="off"
      />
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="onSelect($event.option.value)" [displayWith]="displayLabel">
        @for (opt of filteredOptions(); track opt.id) {
          <mat-option [value]="opt.id">{{ opt.label }}</mat-option>
        } @empty {
          <mat-option [value]="null" disabled>
            <span class="ale-no-results">
              <svg lucideSearch size="16"></svg>
              Sin resultados
            </span>
          </mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>

    @if (clearable()) {
      <button class="ale-clear" type="button" (click)="onClear($event)" tabindex="-1">
        <svg lucideXCircle size="16"></svg>
      </button>
    }
    <svg lucideChevronDown size="18" class="ale-arrow" [class.open]="panelOpen()"></svg>
  `,
  styles: `
    :host { display: block; position: relative; width: 100%; }
    .ale-select { width: 100%; cursor: pointer; }
    .ale-clear {
      position: absolute; right: 30px; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer; color: var(--color-text); opacity: 0.35;
      display: flex; align-items: center; padding: 2px; z-index: 1;
    }
    .ale-clear:hover { opacity: 1; color: var(--color-error); }
    .ale-arrow {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%) rotate(0deg);
      color: var(--color-text); opacity: 0.35; pointer-events: none; transition: transform 0.2s ease; z-index: 1;
    }
    .ale-arrow.open { transform: translateY(-50%) rotate(180deg); }
    .ale-no-results { display: flex; align-items: center; gap: 6px; color: var(--color-text); opacity: 0.5; }
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: MainSelectComponent, multi: true },
  ],
})
export class MainSelectComponent implements ControlValueAccessor {
  options = input<Options[]>([]);
  placeholder = input('');
  clearable = input(false);
  toNumber = input(true);

  readonly inputValue = signal('');
  readonly panelOpen = signal(false);
  disabled = false;

  private value: string | number | null = null;

  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  selectedOption = computed(() => this.options().find((opt) => String(opt.id) === String(this.value)));

  displayValue = computed(() => this.selectedOption()?.label ?? '');

  filteredOptions = computed(() => {
    const query = this.inputValue().trim().toLowerCase();
    if (!query) return this.options();
    return this.options().filter((opt) => opt.label.toLowerCase().includes(query));
  });

  displayLabel = (id: unknown): string => {
    return this.options().find((opt) => String(opt.id) === String(id))?.label ?? '';
  };

  onInput(event: Event): void {
    this.panelOpen.set(true);
    this.inputValue.set((event.target as HTMLInputElement).value);
  }

  onSelect(id: string | number | null): void {
    if (id === null) {
      this.writeValue(null);
      this.onChange(null);
      this.onTouched();
      return;
    }
    const option = this.options().find((opt) => String(opt.id) === String(id));
    const newId = this.toNumber() && !Number.isNaN(Number(id)) ? Number(id) : id;
    this.writeValue(newId);
    this.onChange(newId);
    this.onTouched();
    this.inputValue.set(option?.label ?? String(id));
    this.panelOpen.set(false);
  }

  writeValue(value: unknown): void {
    this.value = (value as string | number | null) ?? null;
    this.inputValue.set(this.selectedOption()?.label ?? '');
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClear(event: Event): void {
    event.stopPropagation();
    this.writeValue(null);
    this.onChange(null);
    this.onTouched();
    this.inputValue.set('');
    this.panelOpen.set(false);
  }
}
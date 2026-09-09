import { Component, input, output, computed, effect } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PreviewComponent } from '@components/loading/preview.component';
import { InputGeneratorComponent } from '@components/form/input-generator.component';
import { Input } from '@shared/types/form';
import { buildFormGroup } from '@components/form/build-form';

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [ReactiveFormsModule, PreviewComponent, InputGeneratorComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="submitFromView()" style="width: 100%; position: relative;">
      <div
        class="ale-form-grid"
        [style.gridTemplateColumns]="gridColumns()"
        [style.gridTemplateRows]="gridRows()"
      >
        @for (input of inputs(); track input.name; let index = $index) {
          @if (input.type === 'group' && input.fields) {
            <div class="ale-form-item" [style.gridColumn]="gridColumn(input)">
              <div class="ale-form-group" [style.gridTemplateColumns]="groupColumns(input)">
                @for (field of input.fields; track field.name) {
                  <div class="ale-form-item">
                    <app-preview [loading]="isLoading()" width="100%" [height]="15" [radius]="5">
                      <app-input-generator [input]="field" [control]="controlFor(field.name)" [parentGroup]="form" />
                    </app-preview>
                  </div>
                }
              </div>
            </div>
          } @else {
            <div class="ale-form-item" [style.gridColumn]="gridColumn(input)">
              <app-preview [loading]="isLoading()" width="100%" [height]="15" [radius]="5">
                <app-input-generator [input]="input" [control]="controlFor(input.name)" [parentGroup]="form" />
              </app-preview>
            </div>
          }
        }
      </div>
      <button type="submit" style="display: none"></button>
    </form>
  `,
  styles: `
    .ale-form-grid {
      display: grid;
      gap: 16px;
      width: 100%;
    }
    .ale-form-group {
      display: grid;
      gap: 8px;
    }
    .ale-form-item { min-width: 0; }
  `,
})
export class MainFormComponent {
  inputs = input<Input[]>([]);
  onSubmit = output<Record<string, unknown>>();
  rows = input<number>();
  columns = input<number>();
  isLoading = input(false);
  disabled = input(false);
  valuesWatch = input<string[]>([]);
  handleWatch = input<(values: Record<string, unknown>, name?: string) => void>();
  defaultValues = input<Record<string, unknown>>({});

  form!: FormGroup;

  readonly hasMd = computed(() => this.inputs().some((input) => !!input.md));

  readonly gridColumns = computed(() => {
    if (this.columns() !== undefined) return `repeat(${this.columns()}, minmax(0, 1fr))`;
    if (this.hasMd()) return 'repeat(12, 1fr)';
    return 'repeat(auto-fit, minmax(200px, 1fr))';
  });

  readonly gridRows = computed(() => {
    return this.rows() !== undefined ? `repeat(${this.rows()}, auto)` : 'auto';
  });

  readonly groupColumns = (input: Input): string => {
    const count = input.fields?.length;
    return count ? `repeat(${count}, minmax(0, 1fr))` : 'repeat(auto-fit, minmax(100px, 1fr))';
  };

  readonly gridColumn = (input: Input): string => {
    if (!this.hasMd()) return '';
    return `span ${input.md || 12}`;
  };

  controlFor(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  constructor() {
    effect(() => {
      if (!this.form) return;
      if (this.disabled()) {
        this.form.disable({ emitEvent: false });
      } else {
        this.form.enable({ emitEvent: false });
      }
    });

    effect(() => {
      if (!this.form) return;
      const defaults = this.defaultValues();
      if (defaults && Object.keys(defaults).length > 0) {
        this.form.patchValue(defaults, { emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.form = buildFormGroup(this.inputs());
    this.setupWatch();
  }

  private setupWatch(): void {
    this.form.valueChanges.subscribe((values) => {
      const watched = this.valuesWatch();
      if (watched.length === 0) return;
      const subset: Record<string, unknown> = {};
      watched.forEach((name) => {
        subset[name] = values[name];
      });
      this.handleWatch()?.(subset);
    });
  }

  submitFromView(): void {
    this.save();
  }

  save(): void {
    if (!this.form) return;
    if (this.form.valid) {
      this.onSubmit.emit(this.form.getRawValue());
    } else {
      this.markAllTouched(this.form);
    }
  }

  getValues(): Record<string, unknown> {
    return this.form?.getRawValue() ?? {};
  }

  getValue(name?: string): unknown {
    if (!name) return this.getValues();
    return this.form?.get(name)?.value;
  }

  setValue(name: string, value: unknown): void {
    this.form?.get(name)?.setValue(value, { emitEvent: false });
  }

  reset(values?: Record<string, unknown>): void {
    this.form?.reset(values ?? {});
  }

  trigger(): void {
    this.markAllTouched(this.form);
  }

  watch(name: string): unknown {
    return this.form?.get(name)?.value;
  }

  private markAllTouched(group: FormGroup): void {
    Object.keys(group.controls).forEach((key) => {
      const control = group.get(key);
      control?.markAsTouched();
      if (control instanceof FormGroup) this.markAllTouched(control);
    });
  }
}
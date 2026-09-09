import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Input } from '@shared/types/form';
import { createValidators } from '@components/form/validators';

const defaultValueFor = (input: Input): unknown => {
  if (input.value !== undefined && input.value !== null) return input.value;
  if (input.defaultValue !== undefined && input.defaultValue !== null) return input.defaultValue;
  return '';
};

export const buildFormGroup = (inputs: Input[]): FormGroup => {
  const controls: Record<string, FormControl> = {};

  const register = (input: Input, validators: ValidatorFn[] = []) => {
    controls[input.name] = new FormControl(defaultValueFor(input), validators);
  };

  inputs.forEach((input) => {
    if (input.type === 'group' && input.fields) {
      input.fields.forEach((field) => register(field, createValidators(field.validations)));
      return;
    }
    register(input, createValidators(input.validations));
  });

  return new FormGroup(controls);
};
import { Validators, ValidatorFn } from '@angular/forms';
import { VALIDATIONS } from '@shared/const/validations';
import { InputValidation } from '@shared/types/form';

const MESSAGES: Record<number, (value?: number) => string> = {
  [VALIDATIONS.REQUIRED]: () => 'Este campo es requerido',
  [VALIDATIONS.MIN_LENGTH]: (value) => `Mínimo ${value} caracteres`,
  [VALIDATIONS.MAX_LENGTH]: (value) => `Máximo ${value} caracteres`,
  [VALIDATIONS.EMAIL]: () => 'Correo electrónico inválido',
  [VALIDATIONS.MIN]: (value) => `El valor mínimo es ${value}`,
  [VALIDATIONS.MAX]: (value) => `El valor máximo es ${value}`,
};

const withMessage = (validator: ValidatorFn, message: string): ValidatorFn => (control) => {
  const error = validator(control);
  if (!error) return null;
  return { ...error, message };
};

export const createValidators = (validations: InputValidation[] = []): ValidatorFn[] => {
  return validations.map(({ type, msg, value }) => {
    const message = msg || MESSAGES[type]?.(value) || '';
    switch (type) {
      case VALIDATIONS.REQUIRED:
        return withMessage(Validators.required, message);
      case VALIDATIONS.MIN_LENGTH:
        return withMessage(Validators.minLength(value ?? 0), message);
      case VALIDATIONS.MAX_LENGTH:
        return withMessage(Validators.maxLength(value ?? Number.MAX_SAFE_INTEGER), message);
      case VALIDATIONS.EMAIL:
        return withMessage(Validators.email, message);
      case VALIDATIONS.MIN:
        return withMessage(Validators.min(value ?? 0), message);
      case VALIDATIONS.MAX:
        return withMessage(Validators.max(value ?? Number.MAX_SAFE_INTEGER), message);
      default:
        return () => null;
    }
  });
};
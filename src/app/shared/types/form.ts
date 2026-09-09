import { VALIDATIONS, ValidationType } from '@shared/const/validations';
import { Options } from '@shared/types/options';

export type InputTypes =
  | 'text'
  | 'number'
  | 'password'
  | 'phone'
  | 'email'
  | 'textarea'
  | 'area'
  | 'select'
  | 'group'
  | 'checkbox'
  | 'date';

export interface InputValidation {
  type: ValidationType;
  msg?: string;
  value?: number;
}

export interface Input {
  name: string;
  label?: string;
  type: InputTypes;
  validations?: InputValidation[];
  options?: Options[];
  placeholder?: string;
  disabled?: boolean;
  md?: number;
  value?: unknown;
  defaultValue?: unknown;
  handleChange?: (value: unknown) => void;
  fields?: Input[];
}

const REQUIRED_MSG = 'Este campo es obligatorio';
const EMAIL_MSG = 'Ingrese un correo válido';

export class FieldBuilder<T extends InputTypes = InputTypes> {
  private readonly input: Input;

  constructor(type: T, name: string) {
    this.input = { name, type };
  }

  label(label: string): this {
    this.input.label = label;
    return this;
  }

  md(md: number): this {
    this.input.md = md;
    return this;
  }

  placeholder(placeholder: string): this {
    this.input.placeholder = placeholder;
    return this;
  }

  disabled(disabled = true): this {
    this.input.disabled = disabled;
    return this;
  }

  value(value: unknown): this {
    this.input.value = value;
    return this;
  }

  defaultValue(value: unknown): this {
    this.input.defaultValue = value;
    return this;
  }

  options(options: Options[]): this {
    this.input.options = options;
    return this;
  }

  handleChange(handler: (value: unknown) => void): this {
    this.input.handleChange = handler;
    return this;
  }

  validations(validations: InputValidation[]): this {
    this.input.validations = validations;
    return this;
  }

  required(msg = REQUIRED_MSG): this {
    return this.push({ type: VALIDATIONS.REQUIRED, msg });
  }

  email(msg = EMAIL_MSG): this {
    return this.push({ type: VALIDATIONS.EMAIL, msg });
  }

  minLength(value: number, msg?: string): this {
    return this.push({ type: VALIDATIONS.MIN_LENGTH, value, msg });
  }

  maxLength(value: number, msg?: string): this {
    return this.push({ type: VALIDATIONS.MAX_LENGTH, value, msg });
  }

  min(value: number, msg?: string): this {
    return this.push({ type: VALIDATIONS.MIN, value, msg });
  }

  max(value: number, msg?: string): this {
    return this.push({ type: VALIDATIONS.MAX, value, msg });
  }

  group(fields: Input[]): this {
    this.input.fields = fields;
    return this;
  }

  build(): Input {
    return this.input;
  }

  private push(validation: InputValidation): this {
    this.input.validations = [...(this.input.validations ?? []), validation];
    return this;
  }
}

export const f = {
  text: (name: string) => new FieldBuilder('text', name),
  number: (name: string) => new FieldBuilder('number', name),
  password: (name: string) => new FieldBuilder('password', name),
  phone: (name: string) => new FieldBuilder('phone', name),
  email: (name: string) => new FieldBuilder('email', name),
  textarea: (name: string) => new FieldBuilder('textarea', name),
  area: (name: string) => new FieldBuilder('area', name),
  select: (name: string, options?: Options[]) => {
    const builder = new FieldBuilder('select', name);
    return options ? builder.options(options) : builder;
  },
  checkbox: (name: string) => new FieldBuilder('checkbox', name),
  date: (name: string) => new FieldBuilder('date', name),
};

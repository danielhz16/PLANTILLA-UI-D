import { object, string, number, boolean, date } from 'yup';
import type { AnySchema } from 'yup';
import { VALIDATIONS } from '@/const/validations';
import type { Input } from '../../types/form';

const messages = {
  VALIDATIONS: {
    REQUIRED: 'Este campo es requerido',
    MIN_LENGTH: 'Mínimo {value} caracteres',
    MAX_LENGTH: 'Máximo {value} caracteres',
    MIN: 'El valor mínimo es {value}',
    MAX: 'El valor máximo es {value}',
    EMAIL: 'Correo electrónico inválido',
  }
};

const interpolate = (str: string | undefined, data: any) => {
  if (!str) return '';
  return str.replace(/{(\w+)}/g, (_, key) => data[key]);
};


export const useValidations = (inputs: Input[]) => {
  const flattenInputs =
    inputs.flatMap(input =>
      input.type === 'group' && input.fields ? input.fields : input
    ) as Input[];


  const createSchema = () => {
    const shape: Record<string, AnySchema> = {};

    flattenInputs.forEach((input: Input) => {
      const { name, type, validations = [] } = input;


      let fieldSchema: AnySchema;

      switch (type) {
        case 'text':
        case 'email':
        case 'password':
        case 'textarea':
        case 'area':
          fieldSchema = string();
          break;
        case 'number':
          fieldSchema = number();
          break;
        case 'checkbox':
          fieldSchema = boolean();
          break;
        case 'date':
          fieldSchema = date();
          break;
        default:
          fieldSchema = string();
          break;
      }

      validations.forEach(({ type: ruleType, msg, value }) => {
        let message;

        switch (ruleType) {
          case VALIDATIONS.REQUIRED:
            message = msg ?? messages?.VALIDATIONS?.REQUIRED;
            fieldSchema = (fieldSchema as any).required(message);
            break;

          case VALIDATIONS.MIN_LENGTH:
            message = msg ?? interpolate(messages?.VALIDATIONS?.MIN_LENGTH, { value });
            fieldSchema = (fieldSchema as any).min(value, message);
            break;

          case VALIDATIONS.MAX_LENGTH:
            message = msg ?? interpolate(messages?.VALIDATIONS?.MAX_LENGTH, { value });
            fieldSchema = (fieldSchema as any).max(value, message);
            break;

          case VALIDATIONS.MIN:
            message = msg ?? interpolate(messages?.VALIDATIONS?.MIN, { value });
            fieldSchema = (fieldSchema as any).min(value, message);
            break;

          case VALIDATIONS.MAX:
            message = msg ?? interpolate(messages?.VALIDATIONS?.MAX, { value });
            fieldSchema = (fieldSchema as any).max(value, message);
            break;

          case VALIDATIONS.EMAIL:
            message = msg ?? messages?.VALIDATIONS?.EMAIL;
            fieldSchema = (fieldSchema as any).email(message);
            break;

          default:
            break;
        }
      });

      shape[name] = fieldSchema;
    });

    return object().shape(shape);
  };

  const yupSchema = createSchema();

  return { yupSchema };
};

export const VALIDATIONS = {
  REQUIRED: 1,
  MIN_LENGTH: 2,
  MAX_LENGTH: 3,
  EMAIL: 4,
  MIN: 5,
  MAX: 6,
} as const;

export type ValidationType =
  typeof VALIDATIONS[keyof typeof VALIDATIONS];

export const TYPES_AUTHORIZATIONS = {
  Read: 1,
  Write: 2
} as const;

export const NAMES_TYPES_AUTHORIZATIONS: Record<number, string> = {
  [TYPES_AUTHORIZATIONS.Read]: 'LECTURA',
  [TYPES_AUTHORIZATIONS.Write]: 'ESCRITURA'
};

export type Auth = (typeof TYPES_AUTHORIZATIONS)[keyof typeof TYPES_AUTHORIZATIONS];

export interface AuthOption {
  id: number;
  label: string;
}

export const AUTH_OPTIONS: AuthOption[] = [
  {
    id: TYPES_AUTHORIZATIONS.Read,
    label: NAMES_TYPES_AUTHORIZATIONS[TYPES_AUTHORIZATIONS.Read]
  },
  {
    id: TYPES_AUTHORIZATIONS.Write,
    label: NAMES_TYPES_AUTHORIZATIONS[TYPES_AUTHORIZATIONS.Write]
  }
];

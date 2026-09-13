export interface DetailField {
  label: string;
  name: string;
  value?: (raw: unknown) => unknown;
  icon?: string;
  md?: number;
}

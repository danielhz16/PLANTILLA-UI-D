import { DetailField } from '@shared/types/details';

export type FilterType = 'text' | 'number' | 'email' | 'date' | 'password' | 'select';

export interface ColumnMeta {
  filterType?: FilterType;
  filterOptions?: { id: number | string; label: string }[];
  filterPlaceholder?: string;
  filterDisabled?: boolean;
}

export type IconName = string;

export interface AdditionalItem {
  label: string;
  icon?: IconName;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
}

export interface StatusConfig {
  enabled?: boolean;
  cacheKey?: string;
  nameID?: string;
  subProp?: string;
  active?: boolean;
}

export interface StatusCellProps {
  id: string | number;
  nameID: string;
  keyCache: string;
  subProp?: string;
  url?: string;
  nameItem?: string;
  table?: string;
}

export interface OptionsConfig {
  id: string;
  name?: string;
  table: string;
  enabledEdit?: boolean;
  onEdit?: () => void;
  detailsData?: Record<string, unknown>;
  detailsTitle?: string;
  detailFields?: DetailField[];
  readEndpoint?: string;
  nameID?: string;
  statusConfig?: StatusConfig;
  additionalItems?: AdditionalItem[];
}

export type CellSpec =
  | { kind: 'text'; value: unknown }
  | { kind: 'date'; value: Date | string | null; time?: boolean }
  | { kind: 'status'; active: boolean; props: StatusCellProps }
  | { kind: 'options'; config: OptionsConfig }
  | { kind: 'edit'; to: string }
  | { kind: 'users'; tooltip: string; select: () => void }
  | { kind: 'details'; data: Record<string, unknown>; title?: string };

export interface ColumnConfig<T = unknown> {
  header: string;
  key: string;
  id?: string;
  cell?: (row: T) => CellSpec;
  meta?: ColumnMeta;
}

export const resolveValue = <T,>(row: T, key: string): unknown => {
  return (row as Record<string, unknown>)[key];
};

export const isCellSpec = (value: unknown): value is CellSpec => {
  return !!value && typeof value === 'object' && 'kind' in (value as Record<string, unknown>);
};
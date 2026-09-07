import type { ReactNode, ElementType } from 'react';

export interface DetailField {
    label: string;
    name: string;
    value?: (raw: unknown) => ReactNode;
    icon?: ElementType<{ size?: number }>;
    md?: number;
}

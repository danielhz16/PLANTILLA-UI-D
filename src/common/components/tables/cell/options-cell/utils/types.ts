import type { ReactNode } from 'react';
import type { DetailField } from '@common/types/details';

export interface StatusConfig {
    enabled?: boolean;
    cacheKey?: string;
    nameID?: string;
    subProp?: string;
    actualStatus?: number;
};

export interface HistoryConfig {
    enabled?: boolean;
}

export interface AdditionalItem {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    color?: string;
}

export interface Config {
    id: string;
    name?: string;
    statusConfig?: StatusConfig;
    historyConfig?: HistoryConfig;
    table: string;
    onEdit?: () => void;
    enabledEdit?: boolean;
    detailsData?: Record<string, any>;
    detailsTitle?: string;
    detailFields?: DetailField[];
    readEndpoint?: string;
    nameID?: string;
    additionalItems?: AdditionalItem[];
}


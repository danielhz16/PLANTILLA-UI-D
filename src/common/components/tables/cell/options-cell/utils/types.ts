import type { ReactNode } from 'react';

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
    additionalItems?: AdditionalItem[];
}


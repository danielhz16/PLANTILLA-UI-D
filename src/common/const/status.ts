export const STATUS = {
    ACTIVE: 1,
    INACTIVE: 2
} as const;

export const STATUS_NAME = {
    [STATUS.ACTIVE]: 'Activo',
    [STATUS.INACTIVE]: 'Inactivo'
}

export const optionsStatus = [
    { id: STATUS.ACTIVE, label: STATUS_NAME[STATUS.ACTIVE] },
    { id: STATUS.INACTIVE, label: STATUS_NAME[STATUS.INACTIVE] }
]


export type Status = typeof STATUS[keyof typeof STATUS];

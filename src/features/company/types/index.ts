interface CommonColumns {
    id: number,
    createdAt: Date,
    name: string,
    status: number
}

export interface Company extends CommonColumns {
    bpCode: string;
}

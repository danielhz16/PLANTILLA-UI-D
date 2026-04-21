export interface Role {
    id: number;
    name: string;
    description: string;
    status: number;
}

export interface RolePermission {
    id: number;
    name: string;
    description: string;
    auth: number;
}

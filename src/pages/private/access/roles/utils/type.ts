export interface Role {
    id: number;
    name: string;
    description: string;
    status_id: number;
}

export interface RolePermission {
    id: number;
    name: string;
    description: string;
    auth: number;
}

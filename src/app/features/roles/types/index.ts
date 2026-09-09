export interface Role {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface RolePermission {
  id: number;
  name: string;
  description: string;
  auth: number;
}
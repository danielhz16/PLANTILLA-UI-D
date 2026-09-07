import { createColumnHelper } from "@tanstack/react-table";
import type { RolePermission } from "@/features/roles";

const { accessor } = createColumnHelper<RolePermission>();

export const columnsPermissions = [
    accessor('name', {
        header: 'Permiso'
    }),
    accessor('description', {
        header: 'Descripción'
    }),
    accessor('auth', {
        header: 'Nivel',
        cell: ({ getValue }) => getValue() === 1 ? 'Lectura' : 'Escritura'
    })
];

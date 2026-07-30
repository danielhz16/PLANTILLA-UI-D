import { TYPES_AUTHORIZATIONS, type TypeAuth } from "@/features/auth";
import { createColumnHelper } from "@tanstack/react-table";

export interface UserPermission {
    idUserPermission: number;
    user: string,
    auth: TypeAuth,
}

const { accessor } = createColumnHelper<UserPermission>();

export const columnsUsers = [
    accessor('user', {
        header: 'Usuario'
    }),
    accessor('auth', {
        header: 'Nivel de autorización',
        cell: ({ getValue }) => {
            const auth = getValue();
            return auth === TYPES_AUTHORIZATIONS.Read ? 'Lectura' : 'Escritura';
        }
    })
];
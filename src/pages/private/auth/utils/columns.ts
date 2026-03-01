import { createColumnHelper } from "@tanstack/react-table";

const { accessor } = createColumnHelper<User>();

export interface User {
    id: number;
    username: string;
    email: string;
}

export const columnsUser = () => {
    const columns = [
    accessor('id', {
        header: 'ID'
    }),
    accessor('username', {
        header: 'Nombre de usuario'
    }),
    accessor('email', {
        header: 'Correo electrónico'
    })
    ]
    return columns
}
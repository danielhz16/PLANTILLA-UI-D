import { createColumnHelper } from "@tanstack/react-table";

const { accessor } = createColumnHelper<User>();

export interface User {
    id: number;
    name: string;
}

export const columnsUser = () => {
    const columns = [
    accessor('id', {
        header: 'ID'
    }),
    accessor('name', {
        header: 'Nombre'
    })
    ]
    return columns
}
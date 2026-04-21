import { createColumnHelper } from "@tanstack/react-table";
import { OptionsSecondary } from "@/components/tables/cell/options/OptionsSecondary";
import { mapRowWithHeaders } from "@/common";

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
    }),
    accessor('id', {
        id: 'id',
        header: 'Opciones',
        cell: ({ getValue, row }) => <OptionsSecondary id={getValue()} select={() => {}} toolTipUsers="" to="" data={mapRowWithHeaders(row, columnsUser())} />
    })
    ]
    return columns
}
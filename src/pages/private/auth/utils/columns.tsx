import { createColumnHelper } from "@tanstack/react-table";
import { OptionsCell } from "@/components/tables/cell";
import { userDetailFields } from "./details";

const { accessor } = createColumnHelper<User>();

export interface User {
    id: number;
    username: string;
    email: string;
}

interface ColumnsProps {
    canWrite: boolean;
    handleNavigate: (id: number) => void;
}

export const columnsUser = ({ canWrite, handleNavigate }: ColumnsProps) => [
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
        id: 'options',
        header: 'Opciones',
        cell: ({ getValue, row }) => (
            <OptionsCell
                config={{
                    id: String(getValue()),
                    table: 'users',
                    enabledEdit: canWrite,
                    detailsData: row.original,
                    detailsTitle: 'Usuario',
                    readEndpoint: '/users/read',
                    detailFields: userDetailFields,
                    onEdit: () => handleNavigate(getValue()),
                }}
            />
        ),
    })
];
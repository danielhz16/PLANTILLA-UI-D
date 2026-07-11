import { createColumnHelper } from "@tanstack/react-table";
import { OptionsCell } from "@/components/tables/cell";
import { useNavigate } from "react-router";
import { userDetailFields } from "./details";

const { accessor } = createColumnHelper<User>();

export interface User {
    id: number;
    username: string;
    email: string;
}

interface ColumnsProps {
    canWrite: boolean;
}

export const columnsUser = ({ canWrite }: ColumnsProps) => [
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
        cell: function CellWrapper({ getValue, row }) {
            const navigate = useNavigate();
            return (
                <OptionsCell
                    config={{
                        id: String(getValue()),
                        table: 'users',
                        enabledEdit: canWrite,
                        detailsData: row.original,
                        detailsTitle: 'Usuario',
                        readEndpoint: '/users/read',
                        detailFields: userDetailFields,
                        onEdit: () => navigate(`/gestion-usuarios/usuarios/details/${getValue()}`),
                    }}
                />
            );
        },
    })
];
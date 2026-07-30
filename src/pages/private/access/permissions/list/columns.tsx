import { createColumnHelper } from "@tanstack/react-table";
import { OptionsCell } from "@/ui/tables/cell";
import { UsersRound } from "lucide-react";
import { permissionDetailFields } from "../details/details";

interface Permission {
    id: number;
    name: string;
    description: string;
    status_id: number;
}

interface ColumnsProps {
    cacheKey: string;
    handleSelect: (id: number) => void;
    handleNavigate: (id: number) => void;
    canWrite: boolean;
}

const { accessor } = createColumnHelper<Permission>();

export const getColumnsPermissions = ({ cacheKey, handleSelect, handleNavigate, canWrite }: ColumnsProps) => [
    accessor("id", {
        header: "ID",
        meta: { filterType: 'number', filterPlaceholder: 'Filtrar ID' }
    }),
    accessor("name", {
        header: "Nombre",
        meta: { filterType: 'text', filterPlaceholder: 'Filtrar Nombre' }
    }),
    accessor("description", {
        header: "Descripción",
        meta: { filterType: 'text', filterPlaceholder: 'Filtrar Descripción' }
    }),
    accessor("id", {
        id: "options",
        header: "Opciones",
        cell: ({ getValue, row }) => (
            <OptionsCell
                config={{
                    id: String(getValue()),
                    table: 'permissions',
                    enabledEdit: canWrite,
                    detailsData: row.original,
                    detailsTitle: 'Permiso',
                    readEndpoint: '/permissions/Read',
                    detailFields: permissionDetailFields,
                    statusConfig: {
                        enabled: true,
                        actualStatus: row.original.status_id,
                        cacheKey,
                        nameID: 'id'
                    },
                    onEdit: () => handleNavigate(getValue()),
                    additionalItems: [{
                        label: 'Usuarios',
                        icon: <UsersRound size={16} />,
                        onClick: () => handleSelect(getValue())
                    }]
                }}
                rowData={row.original}
            />
        )
    })
];

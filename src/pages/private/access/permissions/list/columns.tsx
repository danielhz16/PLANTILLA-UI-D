import { createColumnHelper } from "@tanstack/react-table";
import { OptionsCell } from "@/common/components/tables/cell";
import { useNavigate } from "react-router";
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
    canWrite: boolean;
}

const { accessor } = createColumnHelper<Permission>();

export const getColumnsPermissions = ({ cacheKey, handleSelect, canWrite }: ColumnsProps) => [
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
        cell: function CellWrapper({ getValue, row }) {
            const navigate = useNavigate();
            return (
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
                        onEdit: () => navigate(`/permissions/details/${getValue()}`),
                        additionalItems: [{
                            label: 'Usuarios',
                            icon: <UsersRound size={16} />,
                            onClick: () => handleSelect(getValue())
                        }]
                    }}
                    rowData={row.original}
                />
            );
        }
    })
];

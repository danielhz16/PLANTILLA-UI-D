import { createColumnHelper } from "@tanstack/react-table";
import type { Role } from "../utils/type";
import { OptionsCell } from "@/components/tables/cell";
import { ShieldCheck } from "lucide-react";
import { roleDetailFields } from "../details/details";

const { accessor } = createColumnHelper<Role>();

interface ColumnsProps {
    cacheKey: string;
    onEdit: (id: number) => void;
    onPermissions: (id: number) => void;
    canWrite: boolean;
}

export const columnsRoles = ({ cacheKey, onEdit, onPermissions, canWrite }: ColumnsProps) => [
    accessor("id", { header: "ID", meta: { filterType: 'number', filterPlaceholder: 'Filtrar ID' } }),
    accessor("name", { header: "Nombre", meta: { filterType: 'text', filterPlaceholder: 'Filtrar Nombre' } }),
    accessor("description", { header: "Descripción", meta: { filterType: 'text', filterPlaceholder: 'Filtrar Descripción' } }),
    accessor("id", {
        id: "options",
        header: "Opciones",
        cell: ({ getValue, row }) => (
            <OptionsCell
                config={{
                    id: String(getValue()),
                    table: "role",
                    enabledEdit: canWrite,
                    detailsData: row.original,
                    detailsTitle: 'Rol',
                    readEndpoint: '/roles/Read',
                    detailFields: roleDetailFields,
                    statusConfig: {
                        enabled: true,
                        actualStatus: row.original.status_id,
                        cacheKey: cacheKey,
                        nameID: "id"
                    },
                    onEdit: () => onEdit(getValue()),
                    additionalItems: [{
                        label: 'Permisos',
                        icon: <ShieldCheck size={16} />,
                        onClick: () => onPermissions(getValue())
                    }]
                }}
                rowData={row.original}
            />
        ),
    }),
];

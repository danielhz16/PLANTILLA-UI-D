import { createColumnHelper } from "@tanstack/react-table";
import type { Role } from "./type";
import { OptionsCell } from "@/ui/tables/cell";
import { ShieldCheck } from "lucide-react";

const { accessor } = createColumnHelper<Role>();

interface ColumnsProps {
    cacheKey: string;
    onEdit: (id: number) => void;
    onPermissions: (id: number) => void;
}

export const columnsRoles = ({ cacheKey, onEdit, onPermissions }: ColumnsProps) => [
    accessor("id", { header: "ID" }),
    accessor("name", { header: "Nombre" }),
    accessor("description", { header: "Descripción" }),
    accessor("id", {
        id: "options",
        header: "Opciones",
        cell: ({ getValue, row }) => (
            <OptionsCell
                config={{
                    id: String(getValue()),
                    table: "roles",
                    enabledEdit: true,
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

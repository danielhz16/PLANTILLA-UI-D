import type { Permission } from "@/common";
import { DateCell } from "@/components/tables/cell";
import { StatusCell } from "@/components/tables/cell/status-cell/StatusCell";
import { createColumnHelper } from "@tanstack/react-table"
import { OptionsSecondary } from "@/components/tables/cell/options/OptionsSecondary";


const { accessor } = createColumnHelper<Permission>();

export const getColumnsPermissions = () => {
    const columns = [
        accessor('id', {
            header: 'ID'
        }),
        accessor('name', {
            header: 'Nombre'
        }),
        accessor('createdAt', {
            header: 'Fecha Creación',
            cell: ({ getValue }) => <DateCell date={getValue()} />
        }),
        accessor('status', {
            header: 'Estado',
            cell: ({ getValue }) => <StatusCell status={getValue()} />
        }),
        accessor('id', {
            id: 'options',
            header: 'Opciones',
            cell: ({ getValue }) => (
                <OptionsSecondary id={getValue()} select={() => {}} toolTipUsers="Usuarios" to={`/permissions/details/${getValue()}`} />
            )
        })
    ];

    return columns;
};
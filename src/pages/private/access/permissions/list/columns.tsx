import type { Permission, PropsColumns } from "@/common";
import { DateCell } from "@/components/tables/cell/date-cell/DateCell";
import { createColumnHelper } from "@tanstack/react-table"
import { OptionsCell } from "@/common/components/tables/cell";
import { useNavigate } from "react-router";
import { UsersRound } from "lucide-react";

const { accessor } = createColumnHelper<Permission>();
export const getColumnsPermissions = ({
    cacheKey,
    handleSelect
}: PropsColumns & {handleSelect: (id: number) => void}) => {
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
        accessor('id', {
            id: 'options',
            header: 'Opciones',
            cell: function CellWrapper({ getValue, row }) {
                const navigate = useNavigate();
                return (
                    <OptionsCell
                        config={{
                            id: String(getValue()),
                            table: 'permissions',
                            enabledEdit: true,
                            statusConfig: {
                                enabled: true,
                                actualStatus: row.original.status,
                                cacheKey: cacheKey,
                                nameID: 'id'
                            },
                            historyConfig: {
                                enabled: true
                            },
                            onEdit: () => {
                                navigate(`/permissions/details/${getValue()}`);
                            },
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

    return columns;
};
import { createColumnHelper } from "@tanstack/react-table";
import { OptionsCell, DateCell } from "@/components/tables/cell";
import { companyDetailFields } from "../details/company-details";
import { Users } from "lucide-react";

const { accessor } = createColumnHelper<Company>();

interface Company {
    id: number;
    name: string;
    nit: string;
    createdAt: Date;
    uuid: string;
}

interface ColumnsProps {
    canWrite: boolean;
    handleSelect: (id: number) => void;
    handleNavigate: (id: string) => void;
}

export const columnsCompany = ({ canWrite, handleSelect, handleNavigate }: ColumnsProps) => [
    accessor('id', {
        header: 'ID',
    }),
    accessor('name', {
        header: 'Nombre',
    }),
    accessor('createdAt', {
        header: 'Fecha Creación',
        cell: ({ getValue }) => <DateCell date={getValue()} />,
    }),
    accessor('uuid', {
        id: 'options',
        header: 'Opciones',
        cell: ({ getValue, row }) => (
            <OptionsCell
                config={{
                    id: String(getValue()),
                    table: 'company',
                    enabledEdit: canWrite,
                    detailsData: row.original,
                    detailsTitle: 'Empresa',
                    readEndpoint: '/company/read',
                    detailFields: companyDetailFields,
                    onEdit: () => handleNavigate(getValue()),
                    additionalItems: [
                        {
                            label: 'Usuarios',
                            icon: <Users size={16} />,
                            onClick: () => handleSelect(Number(getValue())),
                        },
                    ],
                }}
            />
        ),
    }),
];

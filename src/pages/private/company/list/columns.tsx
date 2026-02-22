import type { Company } from "@/common/types";
import { createColumnHelper } from "@tanstack/react-table";
import { DateCell } from "@/components/tables/cell";
import { OptionsSecondary } from "@/components/tables/cell/options/OptionsSecondary";

const { accessor } = createColumnHelper<Company>();

export const columnsCompany = ({handleSelect}: {
  handleSelect: Function
}) => {
  return [
    accessor('id', {
      header: 'ID',
    }),
    accessor('bpCode', {
      header: 'Código Socio Negocio',
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
      cell: ({ getValue }) => <OptionsSecondary id={getValue()} select={handleSelect} toolTipUsers="Usuarios de la empresa" to={`/company/details/${getValue()}`} />
    }),
  ];
};

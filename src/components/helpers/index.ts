import type { Row, ColumnDef } from "@tanstack/react-table";

export const mapRowWithHeaders = <T,>(
  row: Row<T>,
  columns: ColumnDef<T, any>[]
) => {
  const result: Record<string, any> = {};

  columns.forEach((col: any) => {
    if (!col.accessorKey || !col.header) return;

    const header =
      typeof col.header === "string" ? col.header : col.accessorKey;

    const value = (row.original as any)[col.accessorKey];

    result[header] = value;
  });

  return result;
};
import {
  useReactTable,
  flexRender,
  type ColumnDef,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Box } from "@mui/material";
import { Preview } from "@/components/loading/Preview";
import { NoData } from "./NoData";
import { useState } from "react";

const CopyableContent = ({ cell }: { cell: any }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const value = cell.getValue();
    if (value !== undefined && value !== null) {
      navigator.clipboard.writeText(String(value));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const content = flexRender(cell.column.columnDef.cell, cell.getContext());

  if (cell.column.id === 'options' || cell.column.id === 'actions') {
    return content;
  }

  return (
    <Tooltip title={copied ? "¡Copiado!" : "Doble clic para copiar"} placement="top" arrow>
      <Box
        component="div"
        onDoubleClick={handleCopy}
        sx={{ userSelect: 'none', display: 'block', width: '100%', height: '100%' }}
      >
        {content}
      </Box>
    </Tooltip>
  );
};

interface PropsTable<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  isLoading: boolean
}

export const MainTable = <T,>({
  data,
  columns,
  isLoading = false
}: PropsTable<T>) => {
  const customTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table sx={{
      color: "var(--color-text)",
      borderCollapse: 'separate',
      borderSpacing: '0 10px'
    }}>
      <TableHead>
        {
          customTable.getHeaderGroups()?.map((group, groupIndex) => (
            <TableRow key={`header-group-${groupIndex}-${group.id}`}>
              {group.headers.map((header, index) => (
                <th
                  key={header.id}
                  style={{
                    background: 'var(--color-secondary)',
                    color: 'white',
                    padding: '12px',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    borderTopLeftRadius: index === 0 ? '12px' : '0',
                    borderTopRightRadius: index === group.headers.length - 1 ? '12px' : '0',
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </TableRow>
          ))
        }
      </TableHead>
      <TableBody>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((_, colIndex) => (
                <TableCell key={colIndex} sx={{ border: 'none' }}>
                  <Preview loading={true} width="100%" height={24} radius={4} />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          customTable.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              sx={{
                transition: 'all 0.2s ease',
                backgroundColor: 'var(--color-background)',
                '&:hover': {
                  backgroundColor: 'var(--color-hover)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }
              }}
            >
              {row.getVisibleCells()?.map((cell, index) => (
                <TableCell
                  key={cell.id}
                  sx={{
                    color: "var(--color-text)",
                    border: 'none',
                    borderTop: '1px solid var(--color-border)',
                    borderBottom: '1px solid var(--color-border)',
                    borderLeft: index === 0 ? '1px solid var(--color-border)' : 'none',
                    borderRight: index === row.getVisibleCells().length - 1 ? '1px solid var(--color-border)' : 'none',
                    borderTopLeftRadius: index === 0 ? '12px' : '0',
                    borderBottomLeftRadius: index === 0 ? '12px' : '0',
                    borderTopRightRadius: index === row.getVisibleCells().length - 1 ? '12px' : '0',
                    borderBottomRightRadius: index === row.getVisibleCells().length - 1 ? '12px' : '0',
                    padding: '16px',
                  }}
                >
                  <CopyableContent cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

import {
  useReactTable,
  flexRender,
  type ColumnDef,
  type Cell,
  type ColumnOrderState,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Box, TextField, MenuItem, Button, IconButton, Popover } from "@mui/material";
import { Preview } from "@/components/loading/Preview";
import type { InputTypes } from "@/components/ts/form";
import { useTheme } from "@/hooks/useTheme";
import { Filter, X } from "lucide-react";
import { NoData } from "./NoData";
import { useMemo, useState, type ChangeEvent, type DragEvent, type MouseEvent } from "react";

const CopyableContent = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
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
  // TanStack columns are heterogeneous by value type in this generic table.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  isLoading: boolean;
  columnFilters?: Record<string, string>;
  onColumnFilterChange?: (name: string, value: string) => void;
  onColumnFilterBlur?: (name: string, value: string) => void;
  page?: number;
  pageSize?: number;
  hasNextPage?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  totalPages?: number;
  totalRecords?: number;
  isFetched?: boolean,
  name?: string
}

export const MainTable = <T,>({
  data,
  columns,
  isLoading = false,
  columnFilters = {},
  onColumnFilterChange,
  onColumnFilterBlur,
  page = 1,
  pageSize = 10,
  hasNextPage = false,
  onPageChange,
  onPageSizeChange,
  totalPages,
  totalRecords,
  isFetched,
  name
}: PropsTable<T>) => {

  const { colors } = useTheme();
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [draggedColumnId, setDraggedColumnId] = useState<string | null>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [activeFilterField, setActiveFilterField] = useState<string | null>(null);

  const customTable = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
  });
  const hasColumnFilters = !!onColumnFilterChange || !!onColumnFilterBlur;
  const activeFilterColumn = useMemo(() => {
    if (!activeFilterField) {
      return null;
    }

    return customTable.getAllLeafColumns().find((column) => column.id === activeFilterField) ?? null;
  }, [activeFilterField, customTable]);

  const handleFilterChange = (name: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onColumnFilterChange?.(name, event.target.value);
  };

  const handleFilterBlur = (name: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onColumnFilterBlur?.(name, event.target.value);
  };

  const handleOpenFilter = (fieldName: string) => (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setActiveFilterField(fieldName);
    setFilterAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setFilterAnchorEl(null);
  };

  const renderFilterInput = (
    filterType: InputTypes,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    onBlur: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    disabled: boolean,
    filterOptions: { id: string | number; label: string }[] = [],
    placeholder = "Filtrar"
  ) => {
    const commonProps = {
      value,
      onChange,
      onBlur,
      size: "small" as const,
      variant: "outlined" as const,
      placeholder,
      fullWidth: true,
      disabled,
      InputProps: {
        sx: {
          borderRadius: "8px",
          backgroundColor: colors.background,
          color: colors.text,
          fontSize: "0.875rem",
          padding: 0,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary,
            borderWidth: 1,
          },
        }
      },
      sx: {
        width: "100%",
        minWidth: 0,
      }
    };

    if (filterType === "select") {
      return (
        <TextField {...commonProps} select>
          <MenuItem value="">Todos</MenuItem>
          {filterOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
    }

    const inputType = ["number", "email", "date", "password"].includes(filterType)
      ? filterType
      : "text";

    return <TextField {...commonProps} type={inputType} />;
  };

  const hasPagination = !!onPageChange || !!onPageSizeChange;
  const activeFilterMeta = activeFilterColumn?.columnDef.meta as {
    filterType?: InputTypes;
    filterOptions?: { id: string | number; label: string }[];
    filterPlaceholder?: string;
    filterDisabled?: boolean;
  } | undefined;
  const loadingRowIds = Array.from({ length: 5 }, (_, rowIndex) => `loading-row-${rowIndex}`);
  const loadingColumnIds = columns.map((_, colIndex) => `loading-cell-${colIndex}`);
  const handleColumnDragStart = (columnId: string) => (event: DragEvent<HTMLTableCellElement>) => {
    setDraggedColumnId(columnId);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", columnId);
  };

  const handleColumnDragOver = (event: DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleColumnDrop = (targetColumnId: string) => (event: DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();

    const sourceColumnId = event.dataTransfer.getData("text/plain") || draggedColumnId;
    if (!sourceColumnId || sourceColumnId === targetColumnId) {
      setDraggedColumnId(null);
      return;
    }

    const nextColumnOrder = customTable.getAllLeafColumns().map((column) => column.id);
    const sourceIndex = nextColumnOrder.indexOf(sourceColumnId);
    const targetIndex = nextColumnOrder.indexOf(targetColumnId);

    if (sourceIndex === -1 || targetIndex === -1) {
      setDraggedColumnId(null);
      return;
    }

    nextColumnOrder.splice(sourceIndex, 1);
    nextColumnOrder.splice(targetIndex, 0, sourceColumnId);
    setColumnOrder(nextColumnOrder);
    setDraggedColumnId(null);
  };

  return (
    <>
      <Table sx={{
        width: '100%',
        color: colors.text,
        borderCollapse: 'collapse',
        borderSpacing: 0,
        tableLayout: 'fixed',
        fontSize: '0.9rem',
        minWidth: 600,
        backgroundColor: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <TableHead>
          {
            customTable.getHeaderGroups()?.map((group, groupIndex) => (
              <TableRow key={`header-group-${groupIndex}-${group.id}`}>
                {group.headers.map((header, index) => {
                  const fieldName = header.column.id;
                  const isFilterable = hasColumnFilters && !["options", "actions"].includes(fieldName);
                  const hasActiveFilter = !!columnFilters[fieldName]?.trim();

                  return (
                    <TableCell
                      key={header.id}
                      component="th"
                      scope="col"
                      draggable={!header.isPlaceholder}
                      title="Arrastrar para ordenar columna"
                      onDragStart={handleColumnDragStart(fieldName)}
                      onDragOver={handleColumnDragOver}
                      onDrop={handleColumnDrop(fieldName)}
                      onDragEnd={() => setDraggedColumnId(null)}
                      sx={{
                        backgroundColor: colors.sidebar,
                        color: colors.text,
                        px: 1.5,
                        py: 1.15,
                        userSelect: 'none',
                        cursor: 'grab',
                        opacity: draggedColumnId === fieldName ? 0.72 : 1,
                        transition: 'background-color 0.18s ease, opacity 0.18s ease',
                        textAlign: 'left',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        letterSpacing: 0,
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        borderTop: `3px solid ${colors.primary}`,
                        borderRight: index === group.headers.length - 1 ? 'none' : `1px solid ${colors.border}`,
                        borderBottom: `1px solid ${colors.border}`,
                        '&:active': {
                          cursor: 'grabbing',
                        },
                        '&:hover': {
                          backgroundColor: colors.hover,
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
                        <Box sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </Box>
                        {isFilterable && (
                          <Tooltip title="Filtrar" placement="top" arrow>
                            <IconButton
                              size="small"
                              onMouseDown={(event) => event.stopPropagation()}
                              onClick={handleOpenFilter(fieldName)}
                              sx={{
                                width: 28,
                                height: 28,
                                ml: 'auto',
                                flex: '0 0 auto',
                                color: hasActiveFilter ? colors.primary : colors.text,
                                opacity: hasActiveFilter ? 1 : 0.62,
                                border: hasActiveFilter ? `1px solid ${colors.primary}` : '1px solid transparent',
                                backgroundColor: hasActiveFilter ? colors.background : 'transparent',
                                '&:hover': {
                                  opacity: 1,
                                  backgroundColor: colors.background,
                                  borderColor: colors.border,
                                },
                              }}
                            >
                              <Filter size={15} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          }
        </TableHead>
        <TableBody>
          {isLoading ? (
            loadingRowIds.map((rowId) => (
              <TableRow key={rowId}>
                {loadingColumnIds.map((cellId) => (
                  <TableCell key={cellId} sx={{ border: 'none' }}>
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
                  transition: 'background-color 0.18s ease',
                  '&:hover': {
                    '& .MuiTableCell-root': {
                      backgroundColor: colors.hover,
                    },
                  }
                }}
              >
                {row.getVisibleCells()?.map((cell) => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      color: colors.text,
                      border: 'none',
                      borderBottom: `1px solid ${colors.border}`,
                      padding: '11px 14px',
                      whiteSpace: 'normal',
                      overflowWrap: 'anywhere',
                      minHeight: 48,
                      lineHeight: 1.5,
                      backgroundColor: colors.bgCard,
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
      {!isLoading && data.length === 0 && (
        <NoData isFetched={isFetched} name={name} />
      )}
      {hasPagination && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1.5,
            mt: 1.5,
            color: colors.text
          }}
        >
          <TextField
            select
            size="small"
            value={pageSize}
            onChange={(event) => onPageSizeChange?.(Number(event.target.value))}
            sx={{ width: 96 }}
          >
            {[10, 25, 50].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            size="small"
            disabled={isLoading || page <= 1}
            onClick={() => onPageChange?.(page - 1)}
          >
            Anterior
          </Button>
          <Box sx={{ minWidth: 72, textAlign: "center", fontSize: 14 }}>
            Página {page} {totalPages ? `de ${totalPages}` : ''}
          </Box>
          <Button
            variant="outlined"
            size="small"
            disabled={isLoading || !hasNextPage}
            onClick={() => onPageChange?.(page + 1)}
          >
            Siguiente
          </Button>
          {totalRecords !== undefined && (
            <Box sx={{ ml: 2, fontSize: 13, color: colors.text }}>
              Total: {totalRecords}
            </Box>
          )}
        </Box>
      )}
      <Popover
        open={!!filterAnchorEl && !!activeFilterColumn}
        anchorEl={filterAnchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              p: 1.25,
              mt: 0.75,
              borderRadius: '8px',
              backgroundColor: colors.sidebar,
              color: colors.text,
              border: `1px solid ${colors.border}`,
              boxShadow: colors.shadowPopover,
            }
          }
        }}
      >
        {activeFilterField && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {renderFilterInput(
                activeFilterMeta?.filterType ?? "text",
                columnFilters[activeFilterField] ?? "",
                handleFilterChange(activeFilterField),
                handleFilterBlur(activeFilterField),
                isLoading || !!activeFilterMeta?.filterDisabled,
                activeFilterMeta?.filterOptions ?? [],
                activeFilterMeta?.filterPlaceholder ?? "Filtrar"
              )}
            </Box>
            <Tooltip title="Cerrar" placement="top" arrow>
              <IconButton
                size="small"
                onClick={handleCloseFilter}
                sx={{
                  width: 34,
                  height: 34,
                  flex: '0 0 auto',
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.background,
                  '&:hover': {
                    backgroundColor: colors.hover,
                    borderColor: colors.primary,
                  },
                }}
              >
                <X size={16} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Popover>
    </>
  );
};

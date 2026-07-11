import { MainTable, Title, MainCard, MainButton, MainFilter, useAuth, TYPES_AUTHORIZATIONS } from "@/common";
import { useList, type PropsHook } from "./useList";
import type { ColumnDef } from "@tanstack/react-table";
import { Save } from "lucide-react";
import { useNavigate } from "react-router";
import type { Input } from "@/components/ts/form";
import { useMemo } from "react";
import ButtonStatus from "../../filter/ButtonStatus";


interface Props<T> extends PropsHook {
  title: string;
  name: string;
  toCreate?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  queryKey: string;
  endpoint: string;
  enabled?: boolean;
  onClickCreate?: () => void;
  filters?: Input[];
  initialFilter?: Record<string, unknown>;
  isPending?: boolean;
  permission?: string;
  enabledCreate?: boolean;
  useMainFilter?: boolean;
  disabledButtonStatus?: boolean;
}

export const List = <T,>({
  title,
  name,
  queryKey,
  endpoint,
  enabled = false,
  columns,
  toCreate,
  onClickCreate,
  filters,
  initialFilter,
  isPending = false,
  permission,
  enabledCreate,
  useMainFilter = false,
  disabledButtonStatus = false,
  minDataFetch
}: Props<T>) => {
  const { validarPermiso } = useAuth();

  const canCreate = enabledCreate ?? (permission ? validarPermiso(permission, TYPES_AUTHORIZATIONS.Write) : undefined);

  const {
    data,
    isLoading,
    isFetched,
    get,
    columnFilters,
    onColumnFilterChange,
    onColumnFilterBlur,
    page,
    pageSize,
    hasNextPage,
    setPage,
    setPageSize,
    totalPages,
    totalRecords
  } = useList<T>({
    endpoint,
    enabled,
    queryKey,
    minDataFetch,
  });
  const nav = useNavigate();

  const fnCreate = () => onClickCreate ? onClickCreate() : nav(toCreate ?? '/')

  const objFilters = useMemo(() => {
    if (!filters) return {};

    return ({
      initialValues: initialFilter,
      inputs: filters,
    });
  }, [filters, initialFilter]);


  return (
    <>
      <MainCard>
        {(useMainFilter) && (
          <MainFilter
            title={title}
            get={get}
            isPending={isLoading || isPending}
            {...objFilters}
          />
        )}
        <Title title={title}>

          {!disabledButtonStatus && (
            <ButtonStatus get={get} isPending={isLoading || isPending} />
          )}

          {canCreate && (
            <MainButton variant="contained" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }} onClick={fnCreate}>
              Crear <Save size={18} />
            </MainButton>
          )}

        </Title>

      </MainCard>
      <MainCard sx={{ p: 2, minHeight: '60%', borderRadius: '10px', paddingBlock: '1rem' }}>
        <MainTable<T>
          name={name}
          columns={columns}
          data={data}
          isLoading={isLoading || isPending}
          isFetched={isFetched}
          columnFilters={columnFilters}
          onColumnFilterChange={onColumnFilterChange}
          onColumnFilterBlur={onColumnFilterBlur}
          page={page}
          pageSize={pageSize}
          hasNextPage={hasNextPage}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          totalPages={totalPages}
          totalRecords={totalRecords}
        />
    
      </MainCard></>
  );
};

import { MainTable, Title, MainCard, MainButton, MainFilter, NoData } from "@/common";
import { useList, type PropsHook } from "./useList";
import type { ColumnDef } from "@tanstack/react-table";
import { Save } from "lucide-react";
import { useNavigate } from "react-router";
import type { Input } from "@/components/ts/form";
import { useMemo } from "react";


interface Props<T> extends PropsHook {
  title: string;
  toCreate?: string;
  columns: ColumnDef<T, any>[];
  queryKey: string;
  endpoint: string;
  enabled?: boolean;
  onClickCreate?: () => void;
  filters?: Input[];
  initialFilter?: Record<string, any>;
  isPending?: boolean;
  enabledCreate?: boolean
}

export const List = <T,>({
  title,
  queryKey,
  endpoint,
  enabled = false,
  columns,
  toCreate,
  onClickCreate,
  filters,
  initialFilter,
  isPending = false,
  enabledCreate
}: Props<T>) => {
  const { data, isLoading, get } = useList<T>({
    endpoint,
    enabled,
    queryKey,
  });
  const nav = useNavigate();

  const fnCreate = () => onClickCreate ? onClickCreate() : nav(toCreate ?? '/')

  const objFilters = useMemo(() => {
    if (!filters) return {};

    return ({
      initialValues: initialFilter,
      inputs: filters,
    });
  }, [filters]);

  return (
    <>
      <MainCard>
        <MainFilter title={title} get={get} isPending={isLoading || isPending} {...objFilters} />
        <Title>

          {enabledCreate && (

            <MainButton variant="contained" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }} onClick={fnCreate}>
              Crear <Save size={18} />
            </MainButton>

          )}

        </Title>

      </MainCard>
      <MainCard sx={{ p: 2, minHeight: '60%', borderRadius: '10px', paddingBlock: '1rem' }}>
        <MainTable<T>
          columns={columns}
          data={data}
          isLoading={isLoading || isPending}
        />
        {!data.length && <NoData />}
      </MainCard></>
  );
};


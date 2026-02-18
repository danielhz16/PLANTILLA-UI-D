import { MainTable } from "@/components/tables/mainTable/MainTable";
import { useList, type PropsHook } from "./useList";
import type { ColumnDef } from "@tanstack/react-table";
import { Title } from "@/components/layout/Title/Title";
import { Save } from "lucide-react";
import { MainCard } from "@/components/Cards/MainCard";
import { Espace } from "@/components/containers/Espace";
import { MainButton } from "@/components/buttons/MainButton";
import { MainFilter } from "@/components/filter/MainFIlter";

interface Props<T> extends PropsHook {
  title: string;
  toCreate: () => void;
  columns: ColumnDef<T, any>[];
  queryKey: string;
  endpoint: string;
  enabled?: boolean;
}

export const List = <T,>({
  title,
  queryKey,
  endpoint,
  enabled = true,
  columns,
  toCreate
}: Props<T>) => {
  const { data, isLoading, get } = useList<T>({
    endpoint,
    enabled,
    queryKey,
  });

  return (
    <MainCard sx={{ p: 2, height: '100%', borderRadius: '10px', paddingBlock: '1rem' }}>
      <MainFilter title={title}  get={get} isPending={isLoading} />
      <Title>
        <MainButton variant="contained" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }} onClick={toCreate}>
          Crear <Save size={18} />
        </MainButton>
      </Title>
        
      <Espace space={2.5} />
      <MainTable<T>
        columns={columns}
        data={data}
        isLoading={isLoading}
      />
    </MainCard>
  );
};

import { List } from "@/components/crud/list/List";
import { columnsUser } from "./utils/columns";
import { useUsers } from "./utils/useUsers";
import { filters } from "./utils/inputs";
import { useMemo } from "react";

const ListUsers = () => {
  const { optionsCompany, isLoading, initialValues } = useUsers();
  const memoColumns = useMemo(() => {
     return columnsUser()
  }, [])
  return (
    <List
      title="Usuarios"
      toCreate='/user/create'
      endpoint="auth/list"
      queryKey="user"
      columns={memoColumns}
      initialFilter={initialValues}
      filters={filters(optionsCompany ?? [])}
      isPending={isLoading}
    />
  )
}

export default ListUsers
import { List } from "@/components/crud/list/List";
import { columnsUser } from "./utils/columns";
import { useUsers } from "./utils/useUsers";
import { filters } from "./utils/inputs";

const ListUsers = () => {
  const { optionsCompany, isLoading, initialValues } = useUsers();

  return (
    <List
      title="Usuarios"
      toCreate='/user/create'
      endpoint="auth/list"
      queryKey="user"
      columns={columnsUser()}
      initialFilter={initialValues}
      filters={filters(optionsCompany ?? [])}
      isPending={isLoading}
    />
  )
}

export default ListUsers
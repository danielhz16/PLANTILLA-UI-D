import { List } from "@/components/crud/list/List";
import { columnsUser } from "./utils/columns";

const ListUsers = () => {

  return (
    <List
      title="Usuarios"
      toCreate='/user/create'
      endpoint="auth/list"
      queryKey="user"
      columns={columnsUser()}
    />
  )
}

export default ListUsers
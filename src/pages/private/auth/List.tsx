import { List } from "@/components/crud/list/List";
import { columnsUser } from "./columns";
import { useNavigate } from "react-router";

const ListUsers = () => {
  const navigate = useNavigate();

  return (
    <List
      title="Usuarios"
      toCreate={() => { navigate("/user/create") }}
      endpoint="auth/list"
      queryKey="user"
      columns={columnsUser()}
    />
  )
}

export default ListUsers
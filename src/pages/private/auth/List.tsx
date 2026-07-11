import { USERS, useAuth, TYPES_AUTHORIZATIONS } from "@/common";
import { List } from "@/components/crud/list/List";
import { columnsUser } from "./utils/columns";
import { useMemo } from "react";

const ListUsers = () => {
  const { validarPermiso } = useAuth();
  const canWrite = validarPermiso(USERS.MODULE, TYPES_AUTHORIZATIONS.Write);
  const memoColumns = useMemo(() => {
     return columnsUser({ canWrite })
  }, [canWrite])
  return (
    <List
      name="usuarios"
      title="Usuarios"
      toCreate='/gestion-usuarios/usuarios/create'
      endpoint="/users/list"
      queryKey="user"
      columns={memoColumns}
      permission={USERS.MODULE}
    />
  )
}

export default ListUsers
import { USERS, useAuth, TYPES_AUTHORIZATIONS } from "@/common";
import { List } from "@/components/crud/list/List";
import { columnsUser } from "./utils/columns";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";

const ListUsers = () => {
  const { validarPermiso } = useAuth();
  const navigate = useNavigate();
  const canWrite = validarPermiso(USERS.MODULE, TYPES_AUTHORIZATIONS.Write);
  const handleNavigate = useCallback((id: number) => {
    navigate(`/gestion-usuarios/usuarios/details/${id}`);
  }, [navigate]);
  const memoColumns = useMemo(() => {
     return columnsUser({ canWrite, handleNavigate })
  }, [canWrite, handleNavigate])
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
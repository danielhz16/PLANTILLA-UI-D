import { useAuth, TYPES_AUTHORIZATIONS } from "@/features/auth";
import { COMPANY } from "@/features/company";
import { List } from "@/ui/crud/list/List";
import { columnsCompany } from "./columns.tsx";
import { useModalUsers } from "./modal-users/useModalUser.ts";
import { ModalUsers } from "./modal-users/ModalUsers.tsx";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";

const ListCompany = () => {
  const { validarPermiso } = useAuth();
  const navigate = useNavigate();
  const canWrite = validarPermiso(COMPANY.MODULE, TYPES_AUTHORIZATIONS.Write);
  const { handleSelect, handleClose, isOpen, data, isLoading, handleAddUser, isPending } = useModalUsers();

  const handleNavigate = useCallback((id: string) => {
    navigate(`/clientes/detalles/${id}`);
  }, [navigate]);

  const memoColumns = useMemo(() => {
    return columnsCompany({ canWrite, handleSelect, handleNavigate });
  }, [canWrite, handleSelect, handleNavigate]);

  return (
    <>
      <List
        name="empresas"
        endpoint="company/list"
        queryKey="companies"
        columns={memoColumns}
        title="Empresas"
        toCreate='/clientes/crear'
        permission={COMPANY.MODULE}
      />
      <ModalUsers
        open={isOpen}
        onClose={handleClose}
        data={data ?? { assigned: [], notAssigned: [] }}
        isLoading={isLoading}
        handleAddUser={handleAddUser}
        isPending={isPending}
      />
    </>
  )
};

export default ListCompany;

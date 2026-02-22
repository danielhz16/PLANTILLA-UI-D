import { List } from "@/components/crud/list/List";
import { columnsCompany } from "./columns.tsx";
import { useModalUsers } from "./modal-users/useModalUser.ts";
import { ModalUsers } from "./modal-users/ModalUsers.tsx";

const ListCompany = () => {
  const { handleSelect, handleClose, isOpen, data, isLoading, handleAddUser, isPending } = useModalUsers();
  return (
    <>
      <List
        endpoint="company/list"
        queryKey="companies"
        columns={columnsCompany({ handleSelect })}
        title="Empresas"
        toCreate='/company/create'
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
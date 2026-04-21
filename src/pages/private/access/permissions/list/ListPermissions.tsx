import { List } from "@/components/crud/list/List";
import { getColumnsPermissions } from "./columns";
import { useModalUsers } from "./hooks/useModalUsers";
import { ModalUsers } from "./components/modal-users/ModalUsers";

const cacheKey = "permissions";

const ListePermissions = () => {

  const {
    handleOpenModal,
    openModal,
    handleCloseModal,
    usersOptions,
    assignedUsers,
    isLoading,
    openForm,
    handleOpenForm,
    handleCloseForm,
    onSubmit,
    isPendingForm
  } = useModalUsers();

  return (
    <>
      <List
        columns={getColumnsPermissions({ cacheKey, handleSelect: handleOpenModal })}
        endpoint="/permissions/list"
        title="Permisos"
        queryKey={cacheKey}
        toCreate="/permissions/create"
      />
      <ModalUsers
        isLoading={isLoading}
        onClose={handleCloseModal}
        open={openModal}
        users={assignedUsers}
        usersOptions={usersOptions}
        openForm={openForm}
        onOpenForm={handleOpenForm}
        onCloseForm={handleCloseForm}
        onSubmit={onSubmit}
        isPendingForm={isPendingForm}
      />
    </>
  )
};

export default ListePermissions;
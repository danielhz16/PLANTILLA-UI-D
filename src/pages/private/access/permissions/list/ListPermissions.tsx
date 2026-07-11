import { PERMISSIONS } from "@/common";
import { useAuth, TYPES_AUTHORIZATIONS } from "@/common";
import { List } from "@/components/crud/list/List";
import { getColumnsPermissions } from "./columns";
import { useModalUsers } from "./hooks/useModalUsers";
import { ModalUsers } from "./components/modal-users/ModalUsers";

const cacheKey = "permissions";

const ListPermissions = () => {
    const { validarPermiso } = useAuth();
    const canWrite = validarPermiso(PERMISSIONS.MODULE, TYPES_AUTHORIZATIONS.Write);

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
                name="permisos"
                columns={getColumnsPermissions({ cacheKey, handleSelect: handleOpenModal, canWrite })}
                endpoint="/permissions/list"
                title="Permisos"
                queryKey={cacheKey}
                toCreate="/permissions/create"
                permission={PERMISSIONS.MODULE}
                minDataFetch={5}
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
    );
};

export default ListPermissions;

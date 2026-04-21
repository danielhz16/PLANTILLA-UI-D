import { List } from "@/components/crud/list/List";
import { columnsRoles } from "./columns";
import { useRoles } from "../hooks/useRoles";
import { useModalPermissions } from "../details/hooks/useModalPermissions";
import { ModalPermissions } from "../details/components/modal-permissions/ModalPermissions";
import { usePermissionRoles } from "../hooks/usePermissionRoles";

const cacheKey = "roles";

const ListRoles = () => {
    const { handleEdit } = useRoles();
    const {
        openModal,
        handleOpenModal,
        handleCloseModal,
        permissionsOptions,
        permissions,
        isLoading,
        openForm,
        handleOpenForm,
        handleCloseForm,
        onSubmit,
        onRemove,
        isPendingForm
    } = useModalPermissions();
    const  { canWrite } = usePermissionRoles();

    return (
        <>
            <List
                columns={columnsRoles({ cacheKey, onEdit: handleEdit, onPermissions: handleOpenModal, canWrite })}
                endpoint="/roles/list"
                title="Roles"
                queryKey={cacheKey}
                toCreate="/roles/create"
                enabledCreate={true}
            />
            <ModalPermissions
                isLoading={isLoading}
                onClose={handleCloseModal}
                open={openModal}
                permissions={permissions}
                permissionsOptions={permissionsOptions}
                openForm={openForm}
                onOpenForm={handleOpenForm}
                onCloseForm={handleCloseForm}
                onSubmit={onSubmit}
                onRemove={onRemove}
                isPendingForm={isPendingForm}
            />
        </>
    );
};

export default ListRoles;

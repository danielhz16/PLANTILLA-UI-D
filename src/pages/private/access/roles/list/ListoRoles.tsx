import { ROLES } from "@/features/roles";
import { useAuth, TYPES_AUTHORIZATIONS } from "@/features/auth";
import { List } from "@/components/crud/list/List";
import { columnsRoles } from "./columns";
import { useRoles } from "../hooks/useRoles";
import { useModalPermissions } from "../details/hooks/useModalPermissions";
import { ModalPermissions } from "../details/components/modal-permissions/ModalPermissions";

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
        isPendingForm
    } = useModalPermissions();
    const { validarPermiso } = useAuth();
    const canWrite = validarPermiso(ROLES.MODULE, TYPES_AUTHORIZATIONS.Write);

    return (
        <>
            <List
                name="roles"
                columns={columnsRoles({ cacheKey, onEdit: handleEdit, onPermissions: handleOpenModal, canWrite })}
                endpoint="/roles/list"
                title="Roles"
                queryKey={cacheKey}
                toCreate="/gestion-usuarios/roles/create"
                permission={ROLES.MODULE}
                minDataFetch={5}
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
                isPendingForm={isPendingForm}
            />
        </>
    );
};

export default ListRoles;

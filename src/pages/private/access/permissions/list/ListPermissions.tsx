import { PERMISSIONS } from "@/features/permissions";
import { useAuth, TYPES_AUTHORIZATIONS } from "@/features/auth";
import { List } from "@/components/crud/list/List";
import { getColumnsPermissions } from "./columns";
import { useModalUsers } from "./hooks/useModalUsers";
import { ModalUsers } from "./components/modal-users/ModalUsers";
import { useCallback } from "react";
import { useNavigate } from "react-router";

const cacheKey = "permissions";

const ListPermissions = () => {
    const { validarPermiso } = useAuth();
    const navigate = useNavigate();
    const canWrite = validarPermiso(PERMISSIONS.MODULE, TYPES_AUTHORIZATIONS.Write);

    const handleNavigate = useCallback((id: number) => {
        navigate(`/gestion-usuarios/permisos/details/${id}`);
    }, [navigate]);

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
                columns={getColumnsPermissions({ cacheKey, handleSelect: handleOpenModal, handleNavigate, canWrite })}
                endpoint="/permissions/list"
                title="Permisos"
                queryKey={cacheKey}
                toCreate="/gestion-usuarios/permisos/create"
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

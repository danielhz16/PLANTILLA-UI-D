import { useGetQuery, useMutationQuery, useClient } from "@/hooks/index";
import { useState } from "react";
import type { RolePermission } from "@/features/roles";
import type { Options } from "@/shared";

export const useModalPermissions = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [idRole, setIdRole] = useState<number | null>(null);
    const { deleteItem } = useClient();

    const permissionsUrl = `/roles/permissions/${idRole}`;
    const availablePermissionsUrl = `/roles/available-permissions/${idRole}`;

    const handleOpenModal = (id: number) => {
        setOpenModal(true);
        setIdRole(id);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setIdRole(null);
    };

    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);

    const { data: permissions, isLoading: isLoadingPermissions } = useGetQuery<RolePermission[]>(
        permissionsUrl,
        permissionsUrl,
        !!idRole
    );
    const { data: permissionsOptions, isLoading: isLoadingOptions } = useGetQuery<Options[]>(
        availablePermissionsUrl,
        availablePermissionsUrl,
        !!idRole
    );

    const { mutate, isPending: isPendingForm } = useMutationQuery({
        url: '/roles/assign-permission',
        method: 'POST',
        keyCache: permissionsUrl,
    });

    const { mutate: mutateRemove } = useMutationQuery({
        url: '/roles/remove-permission',
        method: 'POST',
        keyCache: permissionsUrl,
    });

    const onSubmit = (data: { permission: string }) => {
        mutate({ role: idRole, permission: Number(data.permission) }, {
            onSuccess: () => {
                deleteItem({
                    key: availablePermissionsUrl,
                    id: data.permission,
                    nameID: "id"
                });
                handleCloseForm();
            }
        });
    };

    const onRemove = (permissionId: number) => {
        mutateRemove({ role: idRole, permission: permissionId }, {
            onSuccess: () => {
                deleteItem({
                    key: permissionsUrl,
                    id: String(permissionId),
                    nameID: "id"
                });
            }
        });
    };

    return {
        openModal,
        openForm,
        idRole,
        handleOpenModal,
        handleCloseModal,
        handleOpenForm,
        handleCloseForm,
        permissionsOptions: permissionsOptions || [],
        permissions: permissions || [],
        isLoading: isLoadingOptions || isLoadingPermissions,
        isPendingForm,
        onSubmit,
        onRemove
    };
};

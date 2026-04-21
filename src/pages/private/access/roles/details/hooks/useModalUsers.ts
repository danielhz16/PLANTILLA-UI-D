import { useGetQuery, useMutationQuery, useClient } from "@/hooks/index";
import { useState } from "react";
import type { UserPermission } from "../components/modal-users/columns";
import type { Options } from "@/common";

export const useModalUsers = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [idRole, setIdRole] = useState<number | null>(null);
    const { deleteItem } = useClient();

    const availableUsersUrl = `/roles/available-users/${idRole}`;
    const assignedUsersUrl = `/roles/users/${idRole}`;

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

    const { data: usersOptions, isLoading: isLoadingOptions } = useGetQuery<Options[]>(
        availableUsersUrl,
        availableUsersUrl,
        !!idRole
    );
    const { data: assignedUsers, isLoading: isLoadingAssigned } = useGetQuery<UserPermission[]>(
        assignedUsersUrl,
        assignedUsersUrl,
        !!idRole
    );

    const { mutate, isPending: isPendingForm } = useMutationQuery({
        url: '/roles/assign-user',
        method: 'POST',
        keyCache: assignedUsersUrl,
    });

    const onSubmit = (data: { user: string }) => {
        mutate({ role: idRole, user: Number(data.user) }, {
            onSuccess: () => {
                deleteItem({
                    key: availableUsersUrl,
                    id: data?.user,
                    nameID: "id"
                });
                handleCloseForm();
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
        usersOptions: usersOptions || [],
        assignedUsers: assignedUsers || [],
        isLoading: isLoadingOptions || isLoadingAssigned,
        isPendingForm,
        onSubmit
    };
};

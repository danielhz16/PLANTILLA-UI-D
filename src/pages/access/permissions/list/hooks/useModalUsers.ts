import { useGetQuery, useMutationQuery, useClient } from "@/hooks/index";
import { useState } from "react";
import type { UserPermission } from "../components/modal-users/columns";
import type { Options } from "@/shared";

export const useModalUsers = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [idPermission, setIdPermission] = useState<number | null>(null);
    const { deleteItem } = useClient();

    const availableUsersUrl = `/permissions/available-users/${idPermission}`;
    const assignedUsersUrl = `/permissions/users/${idPermission}`;

    const handleOpenModal = (id: number) => {
        setOpenModal(true);
        setIdPermission(id);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setIdPermission(null);
    }

    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);

    const { data: usersOptions, isLoading: isLoadingOptions } = useGetQuery<Options[]>(availableUsersUrl, availableUsersUrl, !!idPermission);
    const { data: assignedUsers, isLoading: isLoadingAssigned } = useGetQuery<UserPermission[]>(assignedUsersUrl, assignedUsersUrl, !!idPermission);

    const { mutate, isPending: isPendingForm } = useMutationQuery({
        url: '/permissions/assign-user',
        method: 'POST',
        keyCache: assignedUsersUrl,
    });

    const onSubmit = (data: {user: string}) => {
        mutate({ ...data, permission: idPermission }, {
            onSuccess: () => {
                deleteItem({
                    key: availableUsersUrl,
                    id: data?.user,
                    nameID: "id"
                }),
                 handleCloseForm();
            }
        });
    }

    return {
        openModal,
        openForm,
        idPermission,
        handleOpenModal,
        handleCloseModal,
        handleOpenForm,
        handleCloseForm,
        usersOptions: usersOptions || [],
        assignedUsers: assignedUsers || [],
        isLoading: isLoadingOptions || isLoadingAssigned,
        isPendingForm,
        onSubmit
    }
}
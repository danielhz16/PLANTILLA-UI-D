import { MainButton, MainTable, ModalForm, Title } from "@/components";
import { type Options } from "@/shared";
import { Modal } from "@/components/modal";
import { columnsUsers, type UserPermission } from "./columns";
import { useMemo } from "react";
import { inputs } from "./inputs";

interface Props {
    open: boolean;
    onClose: () => void;
    users: UserPermission[];
    isLoading: boolean;
    usersOptions: Options[];
    openForm: boolean;
    onOpenForm: () => void;
    onCloseForm: () => void;
    onSubmit: (data: any) => void;
    isPendingForm: boolean;
}

export const ModalUsers = ({
    open,
    onClose,
    users,
    isLoading,
    usersOptions,
    openForm,
    onOpenForm,
    onCloseForm,
    onSubmit,
    isPendingForm
}: Props) => {
    const inputsMemo = useMemo(() => inputs(usersOptions), [usersOptions])
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Usuarios"
        >
            <Title sx={{
                marginBottom: 2
            }}>
                <MainButton sx={{ mt: 2 }} onClick={onOpenForm}>
                    Agregar usuario
                </MainButton>
            </Title>
            <MainTable
                data={users}
                columns={columnsUsers}
                isLoading={isLoading}
            />
            <ModalForm
                open={openForm}
                onClose={onCloseForm}
                inputs={inputsMemo}
                onSubmit={onSubmit}
                isLoading={isPendingForm}
                title="Agregar usuario al permiso"
            />
        </Modal>
    )
}
import { MainButton, MainTable, ModalForm, Title, type Options } from "@/common";
import { Modal } from "@/common/components/modal";
import { columnsPermissions } from "./columns";
import { useMemo } from "react";
import { inputs } from "./inputs";
import type { RolePermission } from "../../../utils/type";

interface Props {
    open: boolean;
    onClose: () => void;
    permissions: RolePermission[];
    isLoading: boolean;
    permissionsOptions: Options[];
    openForm: boolean;
    onOpenForm: () => void;
    onCloseForm: () => void;
    onSubmit: (data: any) => void;
    onRemove: (permissionId: number) => void;
    isPendingForm: boolean;
}

export const ModalPermissions = ({
    open,
    onClose,
    permissions,
    isLoading,
    permissionsOptions,
    openForm,
    onOpenForm,
    onCloseForm,
    onSubmit,
    onRemove,
    isPendingForm
}: Props) => {
    const inputsMemo = useMemo(() => inputs(permissionsOptions), [permissionsOptions]);
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Permisos del Rol"
        >
            <Title>
                <MainButton sx={{ mt: 2 }} onClick={onOpenForm}>
                    Agregar permiso
                </MainButton>
            </Title>
            <MainTable
                data={permissions}
                columns={columnsPermissions}
                isLoading={isLoading}
                
            />
            <ModalForm
                open={openForm}
                onClose={onCloseForm}
                inputs={inputsMemo}
                onSubmit={onSubmit}
                isLoading={isPendingForm}
                title="Agregar permiso al rol"
            />
        </Modal>
    );
};

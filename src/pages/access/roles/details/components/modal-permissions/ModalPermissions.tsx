import { MainButton, MainTable, ModalForm, Title } from "@/components";
import { type Options } from "@/shared";
import { Modal } from "@/components/modal";
import { columnsPermissions } from "./columns";
import { useMemo } from "react";
import { inputs } from "./inputs";
import type { RolePermission } from "@/features/roles";
import { Typography } from "@mui/material";
import { Box, Grid } from "lucide-react";

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
                <MainButton sx={{ m: 2 }} onClick={onOpenForm}>
                    Agregar permiso
                </MainButton>
            </Title>
           {
            permissions.length ? (
                 <MainTable
                data={permissions}
                columns={columnsPermissions}
                isLoading={isLoading}
                
            />
            ): (
               <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                 <Typography variant="body1">
                    No hay permisos asignados a este rol.
                </Typography>
               </div>
            )
           }
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

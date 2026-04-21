import type { Config } from "../utils/types";
import { useStatus } from "./useStatus";
import { STATUS } from "@/common/const/status";
import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon, ListItemText } from "@mui/material";
import { RefreshCw } from "lucide-react";
import { ConfirmDialog } from "@/components/modal";

export const UpdateStatus: React.FC<{ config: Config; onCloseMenu?: () => void }> = ({ config, onCloseMenu }) => {
    const { handleChangeStatus, isPending, modalConfirmation, setOpenModalConfirmation } = useStatus(config);

    const actualStatus = config.statusConfig?.actualStatus;
    const isActive = actualStatus === STATUS.ACTIVE;

    const color = isActive ? "error.main" : "success.main";
    const text = isActive ? "Inactivar" : "Activar";
    const actionText = isActive ? "desactivar" : "activar";

    const handleClick = () => {
        handleChangeStatus();
    };

    const handleCancel = () => {
        setOpenModalConfirmation(false);
        if (onCloseMenu) onCloseMenu();
    };

    const handleConfirm = async () => {
        await handleChangeStatus(true);
        if (onCloseMenu) onCloseMenu();
    };

    return (
        <>
            <MenuItem onClick={handleClick} disabled={isPending}>
                <ListItemIcon sx={{ color, minWidth: 32 }}>
                    <RefreshCw size={16} />
                </ListItemIcon>
                <ListItemText
                    primary={text}
                    primaryTypographyProps={{ sx: { color, fontWeight: 500 }, variant: 'body2' }}
                />
            </MenuItem>

            <ConfirmDialog
                open={modalConfirmation}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                isLoading={isPending}
                type={isActive ? "warning" : "success"}
                title="Confirmar acción"
                message={`¿Estás seguro de ${actionText} este registro?`}
                confirmText={isActive ? "Desactivar" : "Activar"}
                cancelText="Cancelar"
                confirmColor={isActive ? "error" : "success"}
            />
        </>
    );
};
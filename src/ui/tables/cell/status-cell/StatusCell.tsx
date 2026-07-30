import { useState } from "react";
import { Box } from "@mui/material";
import { ConfirmDialog } from "@/ui/modal";
import { useMutationQuery } from "@/hooks/api/useMutationQuery";
import type { Method } from "@/const/api";

interface Props {
  method?: Method;
  status: number;
  id: string | number;
  nameID: string;
  keyCache: string;
  subProp?: string;
  url?: string;
  nameItem?: string;
  table?: string
}

export const StatusCell: React.FC<Props> = ({
  method = "PATCH",
  status,
  id,
  nameID,
  keyCache,
  subProp,
  url,
  nameItem,
  table
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useMutationQuery({
    method,
    url: url ?? `/status/${id}/${table}`,
    nameID,
    keyCache,
    subProp,
    deleteCell: true,
    id,
  });

  const isActive = status === 1;

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await mutateAsync({});
      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Celda de estado */}
      <Box
        onClick={() => setOpen(true)}
        sx={{
          cursor: "pointer",
          backgroundColor: isActive
            ? "var(--color-success)"
            : "var(--color-error)",
          display: "grid",
          placeItems: "center",
          width: 60,
          color: "var(--color-textOnPrimary)",
          borderRadius: 1,
          padding: "2px 0",
          fontSize: 12,
          fontWeight: "bold",
          userSelect: "none",
          "&:hover": {
            opacity: 0.85,
          },
        }}
      >
        {isActive ? "Activo" : "Inactivo"}
      </Box>


      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        type={isActive ? "warning" : "success"}
        title="Confirmar acción"
        message={
          isActive
            ? `¿Estás seguro de desactivar este ${nameItem ?? "registro"}?`
            : `¿Estás seguro de activar este ${nameItem ?? "registro"}?`
        }
        confirmText={isActive ? "Desactivar" : "Activar"}
        cancelText="Cancelar"
        confirmColor={isActive ? "error" : "success"}
      />
    </>
  );
};
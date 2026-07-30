import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Eye } from "lucide-react";
import { Modal } from "@/ui/modal";

interface DetailsCellProps {
  data: any;
  title?: string;
}

const DetailsCell = ({ data, title }: DetailsCellProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón de la celda */}
      <Button
        size="small"
        onClick={() => setOpen(true)}
        sx={{
          minWidth: 36,
          height: 36,
          borderRadius: "8px",
          backgroundColor: "var(--color-hover)",
          color: "var(--color-text)",
          "&:hover": {
            backgroundColor: "var(--color-primary)",
            color: "white",
          },
        }}
      >
        <Eye size={16} />
      </Button>

      {/* Modal reutilizable */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title ?? "Detalles"}
        maxWidth="md"
        actions={
          <Box sx={{ display: "flex", width: "100%" }}>
            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
              sx={{
                flex: 1,
                borderRadius: "16px",
                textTransform: "none",
                py: 1.2,
                fontWeight: 600,
              }}
            >
              Cerrar
            </Button>
          </Box>
        }
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {Object.entries(data || []).map(([key, value]) => (
            <Box key={key}>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>
                {key}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {String(value)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Modal>
    </>
  );
};

export default DetailsCell;
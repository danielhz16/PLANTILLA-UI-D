import { Box, Typography } from "@mui/material";
import { HeartPulse } from "lucide-react";

const ListPacientesUsers: React.FC = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, py: 8 }}>
    <HeartPulse size={48} style={{ opacity: 0.3 }} />
    <Typography variant="h5" sx={{ fontWeight: 600, color: 'var(--color-text)', opacity: 0.5 }}>
      Usuarios Paciente
    </Typography>
  </Box>
);

export default ListPacientesUsers;

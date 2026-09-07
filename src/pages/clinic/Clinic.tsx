import { Box, Typography } from "@mui/material";
import { Stethoscope } from "lucide-react";

const Clinic: React.FC = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, py: 8 }}>
    <Stethoscope size={48} style={{ opacity: 0.3 }} />
    <Typography variant="h5" sx={{ fontWeight: 600, color: 'var(--color-text)', opacity: 0.5 }}>
      Clínica
    </Typography>
  </Box>
);

export default Clinic;

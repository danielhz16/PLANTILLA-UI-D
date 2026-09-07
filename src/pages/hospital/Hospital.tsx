import { Box, Typography } from "@mui/material";
import { Hospital } from "lucide-react";

const HospitalPage: React.FC = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, py: 8 }}>
    <Hospital size={48} style={{ opacity: 0.3 }} />
    <Typography variant="h5" sx={{ fontWeight: 600, color: 'var(--color-text)', opacity: 0.5 }}>
      Hospital
    </Typography>
  </Box>
);

export default HospitalPage;

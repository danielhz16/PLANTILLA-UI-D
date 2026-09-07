import { MainCard } from "../cards/MainCard";
import { Typography, Box } from "@mui/material";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  height?: number;
}

export const ChartCard = ({ title, children, action, height }: ChartCardProps) => (
  <MainCard sx={{ height: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-text)' }}>
        {title}
      </Typography>
      {action}
    </Box>
    <Box sx={{ width: '100%', height: height ?? 300 }}>
      {children}
    </Box>
  </MainCard>
);

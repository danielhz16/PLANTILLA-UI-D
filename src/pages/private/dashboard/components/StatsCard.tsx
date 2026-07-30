import { MainCard } from "@/common/components/Cards/MainCard";
import { Typography, Box } from "@mui/material";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  colorToken?: string;
  subtitle?: string;
}

export const StatsCard = ({ title, value, icon, colorToken, subtitle }: StatsCardProps) => (
  <MainCard sx={{ height: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
      <Box>
        <Typography variant="body2" sx={{ color: 'var(--color-text)', opacity: 0.7, fontWeight: 500, mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'var(--color-text)', lineHeight: 1.1 }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ color: 'var(--color-text)', opacity: 0.5, mt: 0.5, display: 'block' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colorToken ? `var(--color-${colorToken}Soft)` : 'var(--color-primarySoft)',
          color: colorToken ? `var(--color-${colorToken})` : 'var(--color-primary)',
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
    </Box>
  </MainCard>
);

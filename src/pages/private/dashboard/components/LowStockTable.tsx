import { MainCard } from "@/common/components/Cards/MainCard";
import { Typography, Box } from "@mui/material";
import { AlertTriangle } from "lucide-react";
import type { LowStockItem } from "../hooks/useDashboardData";

interface LowStockTableProps {
  data: LowStockItem[];
}

export const LowStockTable = ({ data }: LowStockTableProps) => (
  <MainCard sx={{ height: '100%' }}>
    <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-text)', mb: 2 }}>
      Stock bajo de inventario
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {data.map((item) => {
        const ratio = item.current / item.minimum;
        const isCritical = ratio <= 0.3;
        return (
          <Box
            key={item.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1.5,
              borderRadius: '10px',
              backgroundColor: isCritical ? 'var(--color-errorBg)' : 'var(--color-hover)',
              border: '1px solid',
              borderColor: isCritical ? 'var(--color-errorSoftHover)' : 'var(--color-border)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {isCritical && <AlertTriangle size={16} color="var(--color-error)" />}
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--color-text)' }}>
                  {item.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--color-text)', opacity: 0.5 }}>
                  {item.current} / {item.minimum} {item.unit}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: '8px',
                backgroundColor: isCritical ? 'var(--color-errorSoft)' : 'var(--color-warningSoft)',
                color: isCritical ? 'var(--color-error)' : 'var(--color-warning)',
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              {Math.round((1 - ratio) * 100)}% por debajo del mínimo
            </Box>
          </Box>
        );
      })}
    </Box>
  </MainCard>
);

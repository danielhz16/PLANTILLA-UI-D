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
              backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.08)' : 'var(--color-hover)',
              border: '1px solid',
              borderColor: isCritical ? 'rgba(239, 68, 68, 0.2)' : 'var(--color-border)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {isCritical && <AlertTriangle size={16} color="#ef4444" />}
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
                backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                color: isCritical ? '#ef4444' : '#f59e0b',
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

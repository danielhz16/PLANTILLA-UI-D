import { Box } from "@mui/material";
import { FlaskConical, Clock, CheckCheck, Activity, AlertTriangle } from "lucide-react";
import { useDashboardData } from "./hooks/useDashboardData";
import { StatsCard, DailyTrendChart, PendingByTypeChart, MonthlyTrendChart, LowStockTable } from "./components";

const Dashboard: React.FC = () => {
  const data = useDashboardData();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
        <Box sx={{ flex: '1 1 180px', minWidth: 180 }}>
          <StatsCard
            title="Total Análisis"
            value={data.stats.totalAnalyses}
            icon={<FlaskConical size={20} />}
          />
        </Box>
        <Box sx={{ flex: '1 1 180px', minWidth: 180 }}>
          <StatsCard
            title="Pendientes"
            value={data.stats.pendingResults}
            icon={<Clock size={20} />}
            colorToken="warning"
          />
        </Box>
        <Box sx={{ flex: '1 1 180px', minWidth: 180 }}>
          <StatsCard
            title="Analizados Hoy"
            value={data.stats.analyzedToday}
            icon={<Activity size={20} />}
            colorToken="primary"
          />
        </Box>
        <Box sx={{ flex: '1 1 180px', minWidth: 180 }}>
          <StatsCard
            title="Notificados Hoy"
            value={data.stats.notifiedToday}
            icon={<CheckCheck size={20} />}
            colorToken="success"
          />
        </Box>
        <Box sx={{ flex: '1 1 180px', minWidth: 180 }}>
          <StatsCard
            title="Stock Bajo"
            value={data.stats.lowStockItems}
            icon={<AlertTriangle size={20} />}
            colorToken="error"
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
        <Box sx={{ flex: '1 1 400px', minWidth: 300 }}>
          <DailyTrendChart data={data.dailyResults} />
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 280 }}>
          <PendingByTypeChart data={data.pendingByType} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
        <Box sx={{ flex: '1 1 400px', minWidth: 300 }}>
          <MonthlyTrendChart data={data.monthlyTrend} />
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 280 }}>
          <LowStockTable data={data.lowStock} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

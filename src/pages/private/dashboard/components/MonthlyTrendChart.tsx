import { ChartCard, LineChart } from "@/common/components/charts";
import type { MonthlyTrend } from "../hooks/useDashboardData";

interface MonthlyTrendChartProps {
  data: MonthlyTrend[];
}

const COLORS = {
  analyses: '#4640c2',
  completed: '#22c55e',
};

export const MonthlyTrendChart = ({ data }: MonthlyTrendChartProps) => (
  <ChartCard title="Tendencia mensual">
    <LineChart
      data={data as unknown as Record<string, unknown>[]}
      xKey="month"
      lines={[
        { key: 'analyses', color: COLORS.analyses, name: 'Análisis' },
        { key: 'completed', color: COLORS.completed, name: 'Completados' },
      ]}
    />
  </ChartCard>
);

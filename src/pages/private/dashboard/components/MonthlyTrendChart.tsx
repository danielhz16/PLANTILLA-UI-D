import { ChartCard, LineChart } from "@/common/components/charts";
import type { MonthlyTrend } from "../hooks/useDashboardData";
import { useTheme } from "@/hooks/useTheme";

interface MonthlyTrendChartProps {
  data: MonthlyTrend[];
}

export const MonthlyTrendChart = ({ data }: MonthlyTrendChartProps) => {
  const { colors } = useTheme();

  return (
    <ChartCard title="Tendencia mensual">
      <LineChart
        data={data as unknown as Record<string, unknown>[]}
        xKey="month"
        lines={[
          { key: 'analyses', color: colors.chartIndigo, name: 'Análisis' },
          { key: 'completed', color: colors.chartGreen, name: 'Completados' },
        ]}
      />
    </ChartCard>
  );
};

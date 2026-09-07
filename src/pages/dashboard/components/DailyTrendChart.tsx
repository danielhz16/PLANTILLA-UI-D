import { ChartCard, BarChart } from "@/components/charts";
import type { DailyResult } from "../hooks/useDashboardData";
import { useTheme } from "@/hooks/useTheme";

interface DailyTrendChartProps {
  data: DailyResult[];
}

export const DailyTrendChart = ({ data }: DailyTrendChartProps) => {
  const { colors } = useTheme();

  return (
    <ChartCard title="Resultados diarios">
      <BarChart
        data={data as unknown as Record<string, unknown>[]}
        xKey="date"
        bars={[
          { key: 'received', color: colors.chartIndigo, name: 'Recibidos' },
          { key: 'analyzed', color: colors.chartBlue, name: 'Analizados' },
          { key: 'notified', color: colors.chartGreen, name: 'Notificados' },
        ]}
      />
    </ChartCard>
  );
};

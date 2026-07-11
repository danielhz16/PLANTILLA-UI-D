import { ChartCard, BarChart } from "@/common/components/charts";
import type { DailyResult } from "../hooks/useDashboardData";

interface DailyTrendChartProps {
  data: DailyResult[];
}

const COLORS = {
  received: '#4640c2',
  analyzed: '#3b82f6',
  notified: '#22c55e',
};

export const DailyTrendChart = ({ data }: DailyTrendChartProps) => (
  <ChartCard title="Resultados diarios">
    <BarChart
      data={data as unknown as Record<string, unknown>[]}
      xKey="date"
      bars={[
        { key: 'received', color: COLORS.received, name: 'Recibidos' },
        { key: 'analyzed', color: COLORS.analyzed, name: 'Analizados' },
        { key: 'notified', color: COLORS.notified, name: 'Notificados' },
      ]}
    />
  </ChartCard>
);

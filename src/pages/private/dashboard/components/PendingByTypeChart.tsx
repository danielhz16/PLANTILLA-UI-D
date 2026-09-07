import { ChartCard, PieChart } from "@/ui/charts";
import type { PendingByType } from "../hooks/useDashboardData";
import { useTheme } from "@/hooks/useTheme";

interface PendingByTypeChartProps {
  data: PendingByType[];
}

export const PendingByTypeChart = ({ data }: PendingByTypeChartProps) => {
  const { colors } = useTheme();

  const chartColors = [
    colors.chartIndigo,
    colors.chartBlue,
    colors.chartAmber,
    colors.chartRed,
    colors.chartGreen,
  ];

  return (
    <ChartCard title="Pendientes por tipo">
      <PieChart data={data} colors={chartColors} innerRadius={50} outerRadius={90} />
    </ChartCard>
  );
};

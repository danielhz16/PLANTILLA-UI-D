import { ChartCard, PieChart } from "@/common/components/charts";
import type { PendingByType } from "../hooks/useDashboardData";

interface PendingByTypeChartProps {
  data: PendingByType[];
}

const COLORS = ['#4640c2', '#3b82f6', '#f59e0b', '#ef4444', '#22c55e'];

export const PendingByTypeChart = ({ data }: PendingByTypeChartProps) => (
  <ChartCard title="Pendientes por tipo">
    <PieChart data={data} colors={COLORS} innerRadius={50} outerRadius={90} />
  </ChartCard>
);

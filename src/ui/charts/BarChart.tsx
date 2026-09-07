import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface BarChartProps {
  data: Record<string, unknown>[];
  bars: { key: string; color: string; name?: string }[];
  xKey: string;
  stacked?: boolean;
}

export const BarChart = ({ data, bars, xKey, stacked }: BarChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <RechartsBarChart data={data} barSize={stacked ? 20 : 28} barGap={4}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
      <XAxis
        dataKey={xKey}
        tick={{ fill: 'var(--color-text)', fontSize: 12, opacity: 0.7 }}
        axisLine={{ stroke: 'var(--color-border)' }}
        tickLine={false}
      />
      <YAxis
        tick={{ fill: 'var(--color-text)', fontSize: 12, opacity: 0.7 }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: 'var(--color-bgCard)',
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          color: 'var(--color-text)',
        }}
      />
      {bars.length > 1 && <Legend />}
      {bars.map((bar) => (
        <Bar
          key={bar.key}
          dataKey={bar.key}
          fill={bar.color}
          name={bar.name ?? bar.key}
          radius={[4, 4, 0, 0]}
          stackId={stacked ? 'stack' : undefined}
        />
      ))}
    </RechartsBarChart>
  </ResponsiveContainer>
);

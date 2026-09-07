import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface LineChartProps {
  data: Record<string, unknown>[];
  lines: { key: string; color: string; name?: string }[];
  xKey: string;
}

export const LineChart = ({ data, lines, xKey }: LineChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <RechartsLineChart data={data}>
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
      {lines.length > 1 && <Legend />}
      {lines.map((line) => (
        <Line
          key={line.key}
          type="monotone"
          dataKey={line.key}
          stroke={line.color}
          name={line.name ?? line.key}
          strokeWidth={2}
          dot={{ r: 4, fill: line.color }}
          activeDot={{ r: 6 }}
        />
      ))}
    </RechartsLineChart>
  </ResponsiveContainer>
);

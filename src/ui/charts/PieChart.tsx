import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PieChartProps {
  data: { name: string; value: number }[];
  colors: string[];
  innerRadius?: number;
  outerRadius?: number;
}

export const PieChart = ({ data, colors, innerRadius = 50, outerRadius = 90 }: PieChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <RechartsPieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        dataKey="value"
        paddingAngle={3}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: 'var(--color-bgCard)',
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          color: 'var(--color-text)',
        }}
      />
      <Legend />
    </RechartsPieChart>
  </ResponsiveContainer>
);

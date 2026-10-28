import type { ReactNode } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export interface PieChartDataPoint {
  value: number;
  fill: string;
  [key: string]: unknown;
}

interface PieChartComponentProps<
  T extends Record<string, unknown> = PieChartDataPoint,
> {
  data: T[];
  valueKey?: keyof T & string;
  nameKey?: keyof T & string;
  centerValue?: ReactNode;
  centerLabel?: ReactNode;
  className?: string;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  width?: number | `${number}%`;
  height?: number;
}

const PieChartComponent = <
  T extends Record<string, unknown> = PieChartDataPoint,
>({
  data,
  valueKey = "value" as keyof T & string,
  nameKey,
  centerValue,
  centerLabel = "out of 100",
  className = "",
  innerRadius = 82,
  outerRadius = 100,
  startAngle = 105,
  endAngle = -255,
  width = "100%",
  height = 250,
}: PieChartComponentProps<T>) => {
  const calculatedCenterValue = data.reduce((sum, item) => {
    const rawValue = item[valueKey];
    const numericValue =
      typeof rawValue === "number" ? rawValue : Number(rawValue);
    return Number.isFinite(numericValue) ? sum + numericValue : sum;
  }, 0);

  const resolvedCenterValue = centerValue ?? calculatedCenterValue;

  return (
    <div
      className={`relative flex h-full w-full min-h-0 items-center justify-center overflow-hidden ${className}`.trim()}
    >
      <ResponsiveContainer width={width} height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={0}
            dataKey={valueKey}
            nameKey={nameKey}
            startAngle={startAngle}
            endAngle={endAngle}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`entry-${entry.name || index}`}
                fill={`var(--chart-${(index % 5) + 1})`}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl font-medium leading-none">
          {resolvedCenterValue}
        </p>
        <p className="text-sm text-text-gray">{centerLabel}</p>
      </div>
    </div>
  );
};

export default PieChartComponent;

import type { CSSProperties } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type AxisDomainValue = number | "auto" | "dataMin" | "dataMax";

export interface BarSeriesConfig {
  dataKey: string;
  label?: string;
  color?: string;
  radius?: [number, number, number, number];
  colorByIndex?: boolean;
}

interface BarChartComponentProps<T extends Record<string, unknown>> {
  data: T[];
  xAxisKey: string;
  series: BarSeriesConfig[];
  className?: string;
  minHeight?: number;
  yAxisDomain?: [AxisDomainValue, AxisDomainValue];
  margin?: { top?: number; right?: number; left?: number; bottom?: number };
  barSize?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  tooltipFormatter?: (...args: unknown[]) => string | [string, string];
  tooltipContentStyle?: CSSProperties;
}

const BarChartComponent = <T extends Record<string, unknown>>({
  data,
  xAxisKey,
  series,
  className = "",
  minHeight = 300,
  yAxisDomain = [0, "auto"],
  margin = {
    top: 0,
    right: 0,
    left:
      yAxisDomain[1].toString().length <= 2
        ? -20
        : yAxisDomain[1].toString().length <= 3
          ? -40
          : -60,
    bottom: 0,
  },
  barSize = 30,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  width = "100%",
  height = 250,
  tooltipFormatter,
  tooltipContentStyle,
}: BarChartComponentProps<T>) => {
  const resolvedTooltipStyles: CSSProperties = {
    backgroundColor: "var(--popover)",
    opacity: 0.9,
    border: "1px solid var(--foreground)",
    borderRadius: "var(--radius)",
    color: "var(--foreground)",
    ...tooltipContentStyle,
  };

  return (
    <div
      className={`h-full w-full min-h-0 [&_*:focus]:outline-none [&_*:focus-visible]:outline-none [&_*]:select-none [&_.recharts-default-legend]:!ml-[40px] [&_.recharts-default-legend]:!flex [&_.recharts-default-legend]:!gap-2 [&_.recharts-legend-item]:!flex [&_.recharts-legend-item]:items-center ${className}`.trim()}
    >
      <ResponsiveContainer width={width} height={height} minHeight={minHeight}>
        <BarChart data={data} margin={margin} barSize={barSize}>
          {showLegend ? (
            <Legend verticalAlign="top" height={50} iconType="square" />
          ) : null}

          {series.map((seriesConfig, index) => (
            <Bar
              key={seriesConfig.dataKey}
              dataKey={seriesConfig.dataKey}
              name={seriesConfig.label ?? seriesConfig.dataKey}
              fill={seriesConfig.color ?? `var(--chart-${(index % 5) + 1})`}
              radius={seriesConfig.radius ?? [4, 4, 0, 0]}
            >
              {seriesConfig.colorByIndex
                ? data.map((entry, barIndex) => (
                    <Cell
                      key={`cell-${seriesConfig.dataKey}-${String(entry[xAxisKey])}-${barIndex}`}
                      fill={`var(--chart-${(barIndex % 5) + 1})`}
                    />
                  ))
                : null}
            </Bar>
          ))}

          {showGrid ? (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
          ) : null}

          <XAxis dataKey={xAxisKey} axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} domain={yAxisDomain} />

          {showTooltip ? (
            <Tooltip
              contentStyle={resolvedTooltipStyles}
              formatter={tooltipFormatter as never}
            />
          ) : null}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;

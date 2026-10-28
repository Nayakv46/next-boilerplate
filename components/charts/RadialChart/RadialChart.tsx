import type { ReactNode } from "react";
import { useId } from "react";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

interface RadialChartProps {
  value: number;
  maxValue?: number;
  centerValue?: ReactNode;
  centerLabel?: ReactNode;
  className?: string;
  innerRadius?: string | number;
  outerRadius?: string | number;
  startAngle?: number;
  endAngle?: number;
  barSize?: number;
  trackColor?: string;
  useGradient?: boolean;
  progressColor?: string;
  gradientFromColor?: string;
  gradientToColor?: string;
  valueClassName?: string;
  labelClassName?: string;
  width?: number | `${number}%`;
  height?: number | `${number}%`;
}

const RadialChart = ({
  value,
  maxValue = 100,
  centerValue,
  centerLabel,
  className = "",
  innerRadius = "80%",
  outerRadius = "100%",
  startAngle = 90,
  endAngle = -270,
  barSize = 15,
  trackColor = "var(--border)",
  useGradient = true,
  progressColor = "var(--secondary-foreground)",
  gradientFromColor = "var(--muted-foreground)",
  gradientToColor = "var(--secondary-foreground)",
  valueClassName = "text-3xl font-semibold leading-none text-[var(--secondary-foreground)]",
  labelClassName = "font-medium leading-none text-[var(--secondary-foreground)]",
  width = "100%",
  height = 250,
}: RadialChartProps) => {
  const gradientId = `radial-progress-${useId().replace(/:/g, "")}`;
  const safeMaxValue = maxValue > 0 ? maxValue : 100;
  const safeValue = Math.min(Math.max(value, 0), safeMaxValue);
  const chartData = [
    {
      value: safeValue,
      fill: useGradient ? `url(#${gradientId})` : progressColor,
    },
  ];

  return (
    <div
      className={`relative flex h-full w-full min-h-0 items-center justify-center overflow-hidden ${className}`.trim()}
    >
      <ResponsiveContainer width={width} height={height}>
        <RadialBarChart
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          barSize={barSize}
        >
          {useGradient ? (
            <defs>
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="15.83%" stopColor={gradientFromColor} />
                <stop offset="70.32%" stopColor={gradientToColor} />
              </linearGradient>
            </defs>
          ) : null}
          <PolarAngleAxis
            type="number"
            domain={[0, safeMaxValue]}
            tick={false}
          />
          <RadialBar
            background={{ fill: trackColor }}
            dataKey="value"
            cornerRadius={999}
            isAnimationActive={true}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center text-center">
        <p className={valueClassName}>{centerValue ?? safeValue}</p>
        {centerLabel ? <p className={labelClassName}>{centerLabel}</p> : null}
      </div>
    </div>
  );
};

export default RadialChart;

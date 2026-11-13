import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { getFunctionGaugeGradientColors } from "@/lib/utils/utils";
import { mapFunctionToLabel } from "@/lib/utils/labelFormat";

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: number;
  functionName?: string;
}

export const ScoreGauge = ({ score, label, size = 90 }: ScoreGaugeProps) => {
  const colors = getFunctionGaugeGradientColors(label);
  const gradientId = `scoreGradient-${label.replace(" ", "-")}-${score}`;

  // Calculate gradient endpoint based on score (0-100 maps to 0° to 360°)
  const angleRad = (score / 100) * Math.PI * 2;
  const x2 = 50 + 50 * Math.cos(angleRad);
  const y2 = 50 + 50 * Math.sin(angleRad);

  const chartData = [
    { name: "Score", value: score, fill: `url(#${gradientId})` },
  ];

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-text-gray font-medium text-center">
        {mapFunctionToLabel(label)}
      </span>
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center"
      >
        <ResponsiveContainer width={size} height={size}>
          <RadialBarChart
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            startAngle={0}
            endAngle={-360}
            barSize={7}
          >
            <defs>
              <linearGradient
                id={gradientId}
                x1="100%"
                y1="50%"
                x2={`${x2}%`}
                y2={`${y2}%`}
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor={colors.primary} stopOpacity={1} />
                <stop
                  offset="100%"
                  stopColor={colors.secondary}
                  stopOpacity={1}
                />
              </linearGradient>
            </defs>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              background={{ fill: "rgba(229, 231, 235, 0.5)" }}
              dataKey="value"
              isAnimationActive={true}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold" style={{ fontSize: size * 0.25 }}>
            {score}
          </span>
        </div>
      </div>
    </div>
  );
};

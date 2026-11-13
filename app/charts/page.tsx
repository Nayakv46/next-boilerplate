import ComponentListElementWrapper from "@/app/components/ComponentListElementWrapper";
import PieChartComponent from "@/components/charts/PieChart/PieChart";
import RadialChart from "@/components/charts/RadialChart/RadialChart";
import BarChartComponent from "@/components/charts/BarChart/BarChart";
import type { BarSeriesConfig } from "@/components/charts/BarChart/BarChart";

const Charts = () => {
  const pieChartData = [
    { name: "Start", value: 66 },
    { name: "Current", value: 100 },
  ];
  const radialChartData = [
    { name: "Start", value: 66 },
    { name: "Current", value: 100 },
  ];

  const barChartData = [
    { month: "Jan", Planned: 3, Delivered: 4 },
    { month: "Feb", Planned: 7, Delivered: 6 },
    { month: "Mar", Planned: 6, Delivered: 4 },
  ];

  // const seriesColors = ["#E91E9F", "#4F46E5", "#0EA5E9", "#10B981", "#F59E0B"];
  const chartSeries: BarSeriesConfig[] = Object.keys(barChartData[0] ?? {})
    .filter((key) => key !== "month")
    .map((key, _index) => ({
      dataKey: key,
      // color: seriesColors[index % seriesColors.length],
      radius: [4, 4, 0, 0],
    }));
  const yAxisDomain: [number, number] = [
    0,
    Math.max(
      ...barChartData.map((item) => Math.max(item.Planned, item.Delivered)),
    ) + 1,
  ];
  return (
    <div className="flex flex-col gap-4 p-4">
      <h4>Charts</h4>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <ComponentListElementWrapper title="Pie Chart">
          <PieChartComponent
            data={pieChartData}
            valueKey="value"
            innerRadius={80}
            outerRadius={95}
            startAngle={90}
            endAngle={-270}
            centerValue={pieChartData[0].value}
            height={300}
          />
        </ComponentListElementWrapper>

        <ComponentListElementWrapper title="Radial Chart">
          <RadialChart
            value={
              (Number(radialChartData[0].value) /
                Number(radialChartData[1].value)) *
              100
            }
            maxValue={Number(radialChartData[1].value)}
            centerValue={Number(radialChartData[0].value)}
            centerLabel={`out of ${Number(radialChartData[1].value)}`}
            height={200}
          />
        </ComponentListElementWrapper>

        <ComponentListElementWrapper title="Bar Chart">
          <BarChartComponent
            data={barChartData}
            minHeight={300}
            xAxisKey="month"
            series={chartSeries}
            yAxisDomain={yAxisDomain}
            height={300}
          />
        </ComponentListElementWrapper>
      </div>
    </div>
  );
};

export default Charts;

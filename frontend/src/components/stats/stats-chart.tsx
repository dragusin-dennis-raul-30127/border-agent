import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

export type StatsChartDataEntry = {
  date: string;
  data1: number;
  data2: number;
};

type Props = {
  title: string;
  data: StatsChartDataEntry[];
  label1: string;
  label2: string;
};

export default function StatsChart(props: Props) {
  const chartConfig = {
    visitors: {
      label: "Total Visitors",
    },
    data1: {
      label: props.label1,
    },
    data2: {
      label: props.label2,
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <AreaChart data={props.data}>
            <defs>
              <linearGradient id="fillData1" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-indigo-500)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-indigo-500)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillData2" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-orange-500)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-orange-500)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value + "angi";
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return "[" + value + "]";
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="data1"
              type="natural"
              fill="url(#fillData2)"
              stroke="var(--color-orange-500)"
              stackId="a"
            />
            <Area
              dataKey="data2"
              type="natural"
              fill="url(#fillData1)"
              stroke="var(--color-indigo-500)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

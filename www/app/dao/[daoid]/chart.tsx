'use client'

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Function to generate a random color
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Define the chart data type
interface ChartData {
  browser: string;
  investors: number;
}

const chartConfig = {
  investors: {
    label: "Investors",
  },
} satisfies ChartConfig;

interface ComponentProps {
  chartData: ChartData[];
}

export function PieCard({ chartData }: ComponentProps) {
  const chartDataWithColors = React.useMemo(() => {
    const uniqueColors = new Map<string, string>();

    return chartData.map((data) => {
      if (!uniqueColors.has(data.browser)) {
        uniqueColors.set(data.browser, generateRandomColor());
      }
      return {
        ...data,
        fill: uniqueColors.get(data.browser) || '#000000',
      };
    });
  }, [chartData]);

  const totalInvestors = React.useMemo(() => {
    return chartDataWithColors.reduce((acc, curr) => acc + curr.investors, 0);
  }, [chartDataWithColors]);

  const statsData = [
    { label: 'Total Pool', value: 43200 },
    { label: 'Total Lenders', value: 430 },
  ];

  return (
    <Card className="flex flex-col">

      <CardContent className="flex items-center justify-between pb-0">
        {/* Container for Total Pool and Total Lenders (side by side) */}
        <div className="flex space-x-8 items-center">
          {statsData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold">{item.value.toLocaleString()}</div>
              <div className="text-lg text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Pie Chart Container */}
        <div className="flex-1 flex items-center justify-end">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] w-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartDataWithColors}
                dataKey="investors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalInvestors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Investors
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

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
  investors: number; // Changed from visitors to investors
}

// Define the chart config type (excluding color)
const chartConfig = {
  investors: {
    label: "Investors", // Changed label from "Visitors" to "Investors"
  },
} satisfies ChartConfig;

interface ComponentProps {
  chartData: ChartData[];
}

export function Component({ chartData }: ComponentProps) {
  // Generate random colors for each category
  const chartDataWithColors = React.useMemo(() => {
    const uniqueColors = new Map<string, string>();

    return chartData.map((data) => {
      if (!uniqueColors.has(data.browser)) {
        uniqueColors.set(data.browser, generateRandomColor());
      }
      return {
        ...data,
        fill: uniqueColors.get(data.browser) || '#000000', // Default color if not found
      };
    });
  }, [chartData]);

  const totalInvestors = React.useMemo(() => {
    return chartDataWithColors.reduce((acc, curr) => acc + curr.investors, 0); // Changed from visitors to investors
  }, [chartDataWithColors]);

  // Example numbers and labels
  const summaryData = [
    { label: 'Total Investments', value: totalInvestors },
    { label: 'Pending Requests', value: 120 },
    { label: 'Approved Propositions', value: 45 },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex">
        {/* Container for the numbers and labels */}
        <div className="flex flex-col justify-between pr-4 w-1/3">
          {summaryData.map((item, index) => (
            <div key={index} className="mb-2 text-md font-medium">
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="text-xl font-bold">{item.value.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* Pie Chart Container */}
        <div className="flex-1 flex items-center justify-end">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] w-[250px]" // Adjust width if needed
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartDataWithColors}
                dataKey="investors" // Changed from visitors to investors
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
                            {totalInvestors.toLocaleString()} {/* Changed from visitors to investors */}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Investors {/* Changed from Visitors to Investors */}
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total investors for the last 6 months {/* Changed from visitors to investors */}
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const chartData = [
  { time: "12 AM", power: 0, surfaceTemp: 22, ambientTemp: 20, voltage: 0 },
  { time: "2 AM", power: 0, surfaceTemp: 21, ambientTemp: 19, voltage: 0 },
  { time: "4 AM", power: 0, surfaceTemp: 20, ambientTemp: 19, voltage: 0 },
  { time: "6 AM", power: 80, surfaceTemp: 25, ambientTemp: 22, voltage: 30 },
  { time: "8 AM", power: 220, surfaceTemp: 35, ambientTemp: 25, voltage: 34 },
  { time: "10 AM", power: 310, surfaceTemp: 45, ambientTemp: 28, voltage: 36 },
  { time: "12 PM", power: 350, surfaceTemp: 55, ambientTemp: 31, voltage: 37 },
  { time: "2 PM", power: 330, surfaceTemp: 52, ambientTemp: 30, voltage: 36 },
  { time: "4 PM", power: 240, surfaceTemp: 42, ambientTemp: 27, voltage: 35 },
  { time: "6 PM", power: 90, surfaceTemp: 32, ambientTemp: 24, voltage: 31 },
  { time: "8 PM", power: 0, surfaceTemp: 26, ambientTemp: 22, voltage: 0 },
  { time: "10 PM", power: 0, surfaceTemp: 24, ambientTemp: 21, voltage: 0 },
];

const powerChartConfig = {
  power: {
    label: "Power (W)",
    color: "hsl(var(--chart-1))",
  },
};

const tempChartConfig = {
  surfaceTemp: {
    label: "Surface Temp (°C)",
    color: "hsl(var(--chart-1))",
  },
  ambientTemp: {
    label: "Ambient Temp (°C)",
    color: "hsl(var(--chart-2))",
  },
};

const voltageChartConfig = {
    voltage: {
        label: "Voltage (V)",
        color: "hsl(var(--chart-1))",
    }
}

type HistoricalChartProps = ComponentProps<typeof Card>;

export function HistoricalChart({ className, ...props }: HistoricalChartProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Historical Data</CardTitle>
        <CardDescription>Trends over the last 24 hours.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="power" className="w-full">
          <TabsList>
            <TabsTrigger value="power">Power</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="voltage">Voltage</TabsTrigger>
          </TabsList>
          <TabsContent value="power">
            <ChartContainer config={powerChartConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="power" fill="var(--color-power)" radius={4} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="temperature">
            <ChartContainer config={tempChartConfig} className="h-[250px] w-full">
              <LineChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="surfaceTemp" stroke="var(--color-surfaceTemp)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ambientTemp" stroke="var(--color-ambientTemp)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="voltage">
            <ChartContainer config={voltageChartConfig} className="h-[250px] w-full">
               <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="voltage" fill="var(--color-voltage)" radius={4} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

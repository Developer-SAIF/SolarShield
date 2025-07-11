import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gauge, Power, Thermometer, ThermometerSun, Waves, Zap } from "lucide-react";

const stats = [
  { name: "Surface Temp.", value: "48.2°C", icon: ThermometerSun, description: "Hotter than ambient" },
  { name: "Ambient Temp.", value: "29.5°C", icon: Thermometer, description: "Warm day" },
  { name: "Voltage", value: "35.8 V", icon: Zap, description: "Nominal range" },
  { name: "Current", value: "8.1 A", icon: Waves, description: "Peak sunlight" },
  { name: "Power Output", value: "290 W", icon: Gauge, description: "Optimal performance" },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.name} className="hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

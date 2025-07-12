"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, Thermometer, ThermometerSun, Waves, Zap } from "lucide-react";

const SPREADSHEET_ID = "1OB4r6sFvEDmC3YMfq-vyNQpsbmzOPbKDnW8eiMs_awU";
const RANGE = "SolarShield00001!A1:I";

interface StatsData {
  surfaceTemp: string;
  ambientTemp: string;
  voltage: string;
  current: string;
  power: string;
}

export default function StatsCards() {
  const [statsData, setStatsData] = useState<StatsData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/sheets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
            action: "read",
          }),
        });
        const data = await res.json();
        if (Array.isArray(data.data) && data.data.length > 1) {
          const latest = data.data[data.data.length - 1];
          setStatsData({
            surfaceTemp: latest[1],
            ambientTemp: latest[2],
            voltage: latest[3],
            current: latest[4],
            power: latest[5],
          });
        }
      } catch {
        setStatsData(null);
      }
    })();
  }, []);

  const stats = [
    {
      name: "Surface Temp.",
      value: statsData ? `${statsData.surfaceTemp}°C` : "-",
      icon: ThermometerSun,
      description: "Latest from sheet",
    },
    {
      name: "Ambient Temp.",
      value: statsData ? `${statsData.ambientTemp}°C` : "-",
      icon: Thermometer,
      description: "Latest from sheet",
    },
    {
      name: "Voltage",
      value: statsData ? `${statsData.voltage} V` : "-",
      icon: Zap,
      description: "Latest from sheet",
    },
    {
      name: "Current",
      value: statsData ? `${statsData.current} A` : "-",
      icon: Waves,
      description: "Latest from sheet",
    },
    {
      name: "Power Output",
      value: statsData ? `${statsData.power} W` : "-",
      icon: Gauge,
      description: "Latest from sheet",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <Card
          key={stat.name}
          className="hover:shadow-md transition-shadow duration-300"
        >
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

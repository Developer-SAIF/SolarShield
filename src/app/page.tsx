import { AnomalyDetector } from "@/components/dashboard/anomaly-detector";
import { Header } from "@/components/dashboard/header";
import { HistoricalChart } from "@/components/dashboard/historical-chart";
import { PumpLog } from "@/components/dashboard/pump-log";
import StatsCards from "@/components/dashboard/stats-cards";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
        <StatsCards />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <HistoricalChart className="lg:col-span-3" />
          <PumpLog className="lg:col-span-2" />
        </div>
        <AnomalyDetector />
      </main>
    </div>
  );
}

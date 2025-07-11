"use client";

import { useState } from "react";
import { Bot, Lightbulb, Loader2, Settings } from "lucide-react";

import {
  suggestTemperatureThresholds,
  type SuggestTemperatureThresholdsOutput,
} from "@/ai/flows/suggest-temperature-thresholds";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const historicalData = [
    { surfaceTemperature: 40, ambientTemperature: 25, power: 300, pumpStatus: 'OFF' },
    { surfaceTemperature: 45, ambientTemperature: 28, power: 310, pumpStatus: 'OFF' },
    { surfaceTemperature: 50, ambientTemperature: 30, power: 295, pumpStatus: 'OFF' },
    { surfaceTemperature: 55, ambientTemperature: 32, power: 280, pumpStatus: 'ON' },
    { surfaceTemperature: 48, ambientTemperature: 32, power: 305, pumpStatus: 'OFF' },
    { surfaceTemperature: 60, ambientTemperature: 35, power: 260, pumpStatus: 'ON' },
    { surfaceTemperature: 52, ambientTemperature: 35, power: 290, pumpStatus: 'OFF' },
];

export function SettingsSheet() {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestTemperatureThresholdsOutput | null>(null);
  const [threshold, setThreshold] = useState(45);
  const { toast } = useToast();

  const handleSuggestion = async () => {
    setLoading(true);
    setSuggestion(null);
    try {
      const response = await suggestTemperatureThresholds({
        historicalData: JSON.stringify(historicalData),
      });
      setSuggestion(response);
      setThreshold(response.suggestedThreshold);
    } catch (error) {
      console.error("Threshold suggestion failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get AI threshold suggestion.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Adjust system parameters and get AI-powered suggestions.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-8 py-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="threshold">Cooling Threshold (°C)</Label>
              <Input id="threshold" type="number" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
              <p className="text-sm text-muted-foreground">The pump will activate when surface temperature exceeds this value.</p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="refresh">Data Refresh Rate (seconds)</Label>
                <Slider defaultValue={[30]} min={5} max={120} step={5} />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Threshold Suggestion
            </h3>
            <p className="text-sm text-muted-foreground">Let AI analyze historical data to recommend an optimal cooling threshold.</p>
            <Button onClick={handleSuggestion} disabled={loading} className="w-full">
              {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                </>
              ) : (
                "Suggest Optimal Threshold"
              )}
            </Button>
            {loading && <Skeleton className="h-24 w-full" />}
            {suggestion && (
                <Alert className="bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800">
                    <Lightbulb className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    <AlertTitle className="text-sky-800 dark:text-sky-300">AI Suggestion: {suggestion.suggestedThreshold}°C</AlertTitle>
                    <AlertDescription className="text-sky-700 dark:text-sky-400">{suggestion.reasoning}</AlertDescription>
                </Alert>
            )}
          </div>
        </div>
        <SheetFooter>
            <Button className="w-full">Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

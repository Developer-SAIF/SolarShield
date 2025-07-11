"use client";

import { useState } from "react";
import { AlertTriangle, Bot, CheckCircle, Loader2 } from "lucide-react";

import {
  detectAnomalies,
  type DetectAnomaliesOutput,
} from "@/ai/flows/detect-anomalies";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export function AnomalyDetector() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectAnomaliesOutput | null>(null);
  const { toast } = useToast();

  const handleDetection = async () => {
    setLoading(true);
    setResult(null);
    try {
      // In a real app, this data would come from a live sensor feed.
      const mockSensorData = {
        surfaceTemperature: 65.5,
        ambientTemperature: 32.1,
        voltage: 34.2,
        current: 7.5,
        power: 256.5,
        timestamp: new Date().toISOString(),
      };
      const response = await detectAnomalies(mockSensorData);
      setResult(response);
    } catch (error) {
      console.error("Anomaly detection failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to perform anomaly detection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <span>AI Anomaly Detection</span>
        </CardTitle>
        <CardDescription>
          Use our AI to analyze the latest data from your solar panels and check
          for potential issues or inefficiencies.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleDetection} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Current Status"
          )}
        </Button>

        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        )}

        {result &&
          (result.isAnomaly ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Anomaly Detected: {result.anomalyType}</AlertTitle>
              <AlertDescription>
                <p className="font-semibold mt-2">Customized Tip:</p>
                {result.customizedTips}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="default" className="bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-300">
                System Operating Normally
              </AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                No anomalies were detected in the latest data analysis.
              </AlertDescription>
            </Alert>
          ))}
      </CardContent>
    </Card>
  );
}

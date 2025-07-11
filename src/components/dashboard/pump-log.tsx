import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

const pumpLogs = [
  { time: "2:05 PM", duration: "60s", tempBefore: 55.2, tempAfter: 48.1 },
  { time: "1:32 PM", duration: "60s", tempBefore: 52.8, tempAfter: 46.5 },
  { time: "12:45 PM", duration: "60s", tempBefore: 56.1, tempAfter: 49.3 },
  { time: "11:58 AM", duration: "45s", tempBefore: 50.5, tempAfter: 45.2 },
  { time: "10:30 AM", duration: "60s", tempBefore: 48.9, tempAfter: 42.0 },
];

type PumpLogProps = ComponentProps<typeof Card>;

export function PumpLog({ className, ...props }: PumpLogProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Pump Activity Log</CardTitle>
        <CardDescription>
          Recent cooling system activation events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead className="text-center">Duration</TableHead>
              <TableHead className="text-right">Temp Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pumpLogs.map((log) => (
              <TableRow key={log.time}>
                <TableCell className="font-medium">{log.time}</TableCell>
                <TableCell className="text-center">{log.duration}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-muted-foreground">{log.tempBefore}°C</span>
                    <ArrowDown className="h-4 w-4 text-primary" />
                    <span>{log.tempAfter}°C</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

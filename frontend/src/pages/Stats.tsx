import Layout from "@/components/account-layout";
import type { ControlDocument } from "../../../backend/src/control/schemas/control.schema";
import { useEffect, useState } from "react";
import StatsChart from "@/components/stats/stats-chart";
import { BorderDocument } from "../../../backend/src/border/border.schema";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DailyStat = {
  count: number;
  id: string;
  entries: ControlDocument[];
};

type DailyChartData = {
  id: string;
  total: number;
  problems: number;
};

export default function Stats() {
  const [dailyStats, setDailyStats] = useState<DailyChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [borders, setBorders] = useState<BorderDocument[]>([]);
  const [borderId, setBorderId] = useState("*");
  const [period, setPeriod] = useState("30d");

  useEffect(() => {
    const getBorders = async () => {
      try {
        const resp = await fetch("http://localhost:3000/border");
        const json = await resp.json();
        setBorders(json);
      } catch (e) {
        console.error("whoops", e);
      }
    };

    getBorders();
  }, []);

  useEffect(() => {
    async function getStats() {
      setLoading(true);
      setIsError(false);

      try {
        const statsResponse = await fetch(
          `http://localhost:3000/control/statistics/daily?borderId=${borderId}&period=${period}`
        );
        const statsJson = (await statsResponse.json()) as DailyStat[];
        setDailyStats(
          statsJson.map((e) => ({
            id: e.id,
            total: e.count,
            problems: e.entries.filter((x) => x.hasProblems).length,
          }))
        );
      } catch (e: any) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }

    getStats();
  }, [borderId, period]);

  return (
    <Layout title="Statistics">
      <Card>
        <CardContent className="flex gap-2">
          <Select value={borderId} onValueChange={setBorderId}>
            <SelectTrigger>
              <SelectValue placeholder="Select border" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*">All borders</SelectItem>
              {borders.map((border) => (
                <SelectItem key={border.id} value={border._id.toString()}>
                  {border.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {["1d", "7d", "30d", "90d", "365d"].map((period) => (
                <SelectItem key={period} value={period}>
                  {"Last " +
                    period.replace("d", "") +
                    " " +
                    (period === "1d" ? "day" : "days")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <StatsChart
        title="My data"
        label1="Controls"
        label2="Problems"
        data={dailyStats.map((s) => ({
          date: s.id,
          data1: s.total,
          data2: s.problems,
        }))}
      />
    </Layout>
  );
}

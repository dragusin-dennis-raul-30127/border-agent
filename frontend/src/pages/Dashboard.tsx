import Layout from "@/components/account-layout";
import MapCard from "@/components/dashboard/map-card";
import StatCard from "@/components/dashboard/stat-card";
import { useEffect, useState } from "react";
import type { ControlStatistics } from "../../../backend/src/control/statistics.types";
import { TestChart } from "@/components/stats/test-chart";
import { DailyChartData, DailyStat } from "./Stats";
import { StatsChart } from "@/components/stats/stats-chart";

export default function Dashboard() {
  const [stats, setStats] = useState<ControlStatistics>();
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dailyStats, setDailyStats] = useState<DailyChartData[]>([]);

  useEffect(() => {
    async function getStats() {
      setLoading(true);
      setIsError(false);

      try {
        const statsResponse = await fetch(
          "http://localhost:3000/control/statistics/summary"
        );
        const statsJson = await statsResponse.json();
        setStats(statsJson);

        const bordersResponse = await fetch("http://localhost:3000/border");
        const bordersJson = await bordersResponse.json();
        setBorders(bordersJson);

        console.log("got borders", bordersJson);
      } catch (e: any) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }

    getStats();
  }, []);

  useEffect(() => {
    async function getStats() {
      try {
        const statsResponse = await fetch(
          `http://localhost:3000/control/statistics/daily?borderId=*&period=30d`
        );
        const statsJson = (await statsResponse.json()) as DailyStat[];
        const t = statsJson.map((e) => ({
          id: e._id,
          total: e.count,
          problems: e.entries.filter((x) => x.hasProblems).length,
        }));

        setDailyStats(t);

        console.log(t);
      } catch (e: any) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }

    getStats();
  }, []);

  return (
    <Layout title="Dashboard">
      {!loading && stats && borders ? (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-4 w-full gap-5">
            <StatCard
              title="Cars"
              desc="Number of cars passed"
              value={stats.numberOfCarsPassed.toString()}
            />
            <StatCard
              title="Trucks"
              desc="Number of trucks passed"
              value={stats.numberOfTrucksPassed.toString()}
            />
            <StatCard
              title="Motorcycles"
              desc="Number of motorcycles passed"
              value={stats.numberOfMotorcyclesPassed.toString()}
            />
            <StatCard
              title="Problems"
              desc="Percent of problems"
              value={Number(stats.problematicPercent * 100).toFixed(2) + "%"}
            />
          </div>

          <StatsChart
            title="Control versus issues"
            description="Shows data per each day"
            label1="Controls"
            label2="Problems"
            data={dailyStats.map((s) => ({
              date: s.id,
              controls: s.total,
              problems: s.problems,
            }))}
          />

          <MapCard borders={borders} />
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </Layout>
  );
}

import Layout from "@/components/account-layout";
import MapCard from "@/components/dashboard/map-card";
import StatCard from "@/components/dashboard/stat-card";
import { useEffect, useState } from "react";
import type { ControlStatistics } from "../../../backend/src/control/statistics.types";

export default function Dashboard() {
  const [stats, setStats] = useState<ControlStatistics>();
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
          <MapCard borders={borders} />
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </Layout>
  );
}

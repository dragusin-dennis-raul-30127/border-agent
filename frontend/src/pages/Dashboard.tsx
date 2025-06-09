import Layout from "@/components/account-layout";
import MapCard from "@/components/dashboard/map-card";
import StatCard from "@/components/dashboard/stat-card";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getStats() {
      setLoading(true);
      setIsError(false);

      try {
        const statsResponse = await fetch(
          "http://localhost:3000/control/statistics"
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
        <div class="flex flex-col gap-6">
          <div className="grid grid-cols-4 w-full gap-5">
            <StatCard
              title="Cars"
              desc="Number of cars passed"
              value={stats.numberOfCarsPassed}
            />
            <StatCard
              title="Trucks"
              desc="Number of trucks passed"
              value={stats.numberOfTrucksPassed}
            />
            <StatCard
              title="Motorcycles"
              desc="Number of motorcycles passed"
              value={stats.numberOfMotorcyclesPassed}
            />
            <StatCard
              title="Problems"
              desc="Percent of problems"
              value={Number(stats.problematicPercent) * 100 + "%"}
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

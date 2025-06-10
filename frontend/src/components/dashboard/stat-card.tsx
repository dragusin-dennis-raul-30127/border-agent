import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Slots = {
  value: string;
  title: string;
  desc: string;
};

export default function StatCard(slots: Slots) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle className="mb-1">{slots.title}</CardTitle>
          <CardDescription>{slots.desc}</CardDescription>
        </div>
        <div className="text-4xl font-bold">{slots.value}</div>
      </CardHeader>
    </Card>
  );
}

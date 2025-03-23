import ClusteredBarChart from "@/components/chart"; // Adjust path if needed

const sampleData = [
  { name: "Match 1", category1: 80, category2: 90 },
  { name: "Match 2", category1: 120, category2: 110 },
  { name: "Match 3", category1: 95, category2: 85 },
  { name: "Match 4", category1: 110, category2: 100 },
  { name: "Match 5", category1: 110, category2: 100 },
];

const teams = ["4613", "4414", "8613", "6941"];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Team Performance Comparison</h1>
      <ClusteredBarChart data={sampleData} teams={teams} />
    </div>
  );
}

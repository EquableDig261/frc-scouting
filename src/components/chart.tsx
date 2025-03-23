"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

// Use the provided MatchResult type
interface MatchResult {
  name: string;
  categoryA?: number;
  categoryB?: number;
  categoryC?: number;
  categoryD?: number;
}

interface ClusteredBarChartProps {
  data: MatchResult[]; // Use the MatchResult type for data
  teams: string[]; // Array of team names
}

export default function ClusteredBarChart({ data, teams }: ClusteredBarChartProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" className="text-sm" />
          <YAxis className="text-sm" />
          <Tooltip />
          <Legend />
          
          {/* Render each bar only if the category exists */}
          {teams.map((team, index) => {
            const categoryKey = `category${String.fromCharCode(65 + index)}`; // 'A', 'B', 'C', 'D' for team categories
            return (
              data.some((item) => item[categoryKey as keyof MatchResult] !== undefined) && (
                <Bar
                  key={team}
                  dataKey={categoryKey as keyof MatchResult} // Use the key as part of dataKey
                  fill={index % 4 === 0 ? "#3b82f6" : (index % 4 === 1 ? "#ef4444": (index % 4 === 2 ? "#fced23" : "#07b151"))} // Alternate colors for different teams
                  name={`Team ${team}`}
                />
              )
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

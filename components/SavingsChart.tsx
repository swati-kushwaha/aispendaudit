"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SavingsChartProps {
  monthlySavings: number;
  annualSavings: number;
}

export default function SavingsChart({
  monthlySavings,
  annualSavings,
}: SavingsChartProps) {

  const data = [
    {
      name: "Monthly",
      savings: monthlySavings,
    },
    {
      name: "Annual",
      savings: annualSavings,
    },
  ];

  return (
    <div className="h-72 w-full">

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>

          <XAxis dataKey="name" />

          <Tooltip />

          <Bar
            dataKey="savings"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}
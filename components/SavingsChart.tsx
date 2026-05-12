"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
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
    <div className="w-full overflow-x-auto">

      <BarChart
        width={500}
        height={300}
        data={data}
      >
        <XAxis dataKey="name" />

        <Tooltip />

        <Bar
          dataKey="savings"
          radius={[10, 10, 0, 0]}
        />

      </BarChart>

    </div>
  );
}
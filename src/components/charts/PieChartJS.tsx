import { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { guild42Theme } from "../../config/theme";
import type { ChartDataPoint } from "../../config/survey-schemas";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartJSProps {
  data: ChartDataPoint[];
  title?: string;
  height?: number;
}

// Color palette for pie chart segments
const colorPalette = [
  "#fbbf24", // Yellow
  "#3b82f6", // Blue
  "#10b981", // Green
  "#d97706", // Orange
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#f59e0b", // Amber
];

export function PieChartJS({ data, title, height = 600 }: PieChartJSProps) {
  const chartData = {
    labels: data.map(d => d.category),
    datasets: [
      {
        label: "Count",
        data: data.map(d => d.value),
        backgroundColor: colorPalette.slice(0, data.length),
        borderColor: "rgba(128, 128, 128, 0.75)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right" as const,
        labels: {
          font: {
            size: 18,
          },
          color: "#374151",
          padding: 20,
          boxWidth: 30,
          boxHeight: 30,
        },
      },
      tooltip: {
        enabled: true,
        bodyFont: {
          size: 18,
        },
        titleFont: {
          size: 20,
        },
        padding: 16,
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const dataset = context.dataset.data;
            const total = dataset.reduce(
              (acc: number, val: number) => acc + val,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-10 border-2 border-gray-400/35 dark:border-gray-600/35">
      {title && (
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
          {title}
        </h3>
      )}
      <div style={{ height: `${height}px`, width: "100%" }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}

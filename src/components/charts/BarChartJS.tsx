import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { guild42Theme } from '../../config/theme';
import type { ChartDataPoint } from '../../config/survey-schemas';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartJSProps {
  data: ChartDataPoint[];
  title?: string;
  color?: string;
  height?: number;
}

export function BarChartJS({
  data,
  title,
  color = guild42Theme.colors.primary,
  height = 800,
}: BarChartJSProps) {
  const chartData = {
    labels: data.map(d => d.category),
    datasets: [
      {
        label: 'Count',
        data: data.map(d => d.value),
        backgroundColor: color,
        borderColor: 'rgba(128, 128, 128, 0.75)',
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 200,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
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
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e7eb',
          lineWidth: 2,
        },
        ticks: {
          font: {
            size: 22,
          },
          color: '#374151',
        },
        title: {
          display: true,
          text: 'Count',
          font: {
            size: 24,
            weight: 'bold' as const,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 18,
          },
          color: '#374151',
          maxRotation: 90,
          minRotation: 90,
          autoSkip: false,
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
      <div style={{ height: `${height}px`, width: '100%', overflow: 'visible' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

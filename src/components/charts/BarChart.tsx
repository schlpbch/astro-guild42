import { ObservablePlot } from './ObservablePlot';
import * as Plot from '@observablehq/plot';
import { guild42Theme } from '../../config/theme';
import type { ChartDataPoint } from '../../config/survey-schemas';

interface BarChartProps {
  data: ChartDataPoint[];
  title?: string;
  color?: string;
  height?: number;
}

export function BarChart({
  data,
  title,
  color = guild42Theme.colors.primary,
  height = 1000,
}: BarChartProps) {
  const options = {
    marks: [
      // Y-Axis grid line at zero
      Plot.ruleY([0], { stroke: '#e5e7eb', strokeWidth: 3 }),

      // Bar chart with EXTRA THICK rounded corners and tooltips
      Plot.barY(data, {
        x: 'category',
        y: 'value',
        fill: color,
        rx: 12,
        tip: true,
        sort: { x: '-y' },
        insetLeft: 4,
        insetRight: 4,
      }),

      // Value labels on top of bars - HUGE
      Plot.text(data, {
        x: 'category',
        y: 'value',
        text: (d: ChartDataPoint) => d.value.toString(),
        dy: -20,
        fill: '#111827',
        fontSize: 28,
        fontWeight: 'bold',
      }),
    ],
    x: {
      label: null,
      tickRotate: data.length > 10 ? -45 : 0,
      fontSize: 20,
      tickSize: 10,
    },
    y: {
      grid: true,
      label: 'Count',
      fontSize: 22,
      tickSize: 10,
      labelFontSize: 24,
    },
    height,
    marginLeft: 120,
    marginBottom: data.length > 10 ? 220 : 120,
    marginTop: 60,
    marginRight: 60,
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-10">
      {title && (
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {title}
        </h3>
      )}
      <div className="w-full" style={{ minHeight: `${height}px` }}>
        <ObservablePlot options={options} />
      </div>
    </div>
  );
}

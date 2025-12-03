import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MetricCardProps {
  title: string;
  value: number | string;
  trend?: string;
  icon?: string;
  animate?: boolean;
}

export function MetricCard({
  title,
  value,
  trend,
  icon,
  animate = true,
}: MetricCardProps) {
  const valueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!valueRef.current || typeof value !== 'number' || !animate) return;

    const obj = { value: 0 };

    gsap.to(obj, {
      value: value,
      duration: 1.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.textContent = Math.round(obj.value).toLocaleString();
        }
      },
    });
  }, [value, animate]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-base font-semibold text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <div
            ref={valueRef}
            className="text-5xl font-bold text-gray-900 dark:text-white mt-3"
          >
            {typeof value === 'number' && animate
              ? '0'
              : typeof value === 'number'
                ? value.toLocaleString()
                : value}
          </div>
          {trend && (
            <div
              className={`mt-3 text-base font-medium ${
                trend.startsWith('+') || trend.includes('up')
                  ? 'text-green-600'
                  : trend.startsWith('-') || trend.includes('down')
                    ? 'text-red-600'
                    : 'text-gray-600'
              }`}
            >
              {trend}
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 text-5xl opacity-20 dark:opacity-10">{icon}</div>
        )}
      </div>
    </div>
  );
}

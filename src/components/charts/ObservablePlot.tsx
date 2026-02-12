import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import type { PlotOptions } from "@observablehq/plot";

interface ObservablePlotProps {
  options: PlotOptions;
  className?: string;
}

export function ObservablePlot({
  options,
  className = "",
}: ObservablePlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = "";

    // Wait for container to be rendered, then measure
    setTimeout(() => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      console.log("Container width:", containerWidth);

      // Create plot with dynamic width
      const plot = Plot.plot({
        ...options,
        width: Math.max(containerWidth - 40, 1200), // Minimum 1200px width
        style: {
          background: "transparent",
          fontSize: "18px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          maxWidth: "100%",
          ...options.style,
        },
      });

      containerRef.current.append(plot);
    }, 100);
  }, [options]);

  return (
    <div ref={containerRef} className={`${className} w-full min-h-[600px]`} />
  );
}

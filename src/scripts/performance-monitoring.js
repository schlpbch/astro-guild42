/**
 * Performance Monitoring - Web Vitals tracking
 * Monitors key performance metrics: FCP, LCP, CLS, INP
 */

if ("PerformanceObserver" in window) {
  // First Contentful Paint (FCP)
  const paintEntries = performance.getEntriesByType("paint");
  const fcp = paintEntries.find(
    entry => entry.name === "first-contentful-paint"
  );

  if (fcp) {
    const fcpTime = Math.round(fcp.startTime);
    console.log(`[Performance] FCP: ${fcpTime}ms`);

    // Send to analytics if available (Google Analytics, etc.)
    if (window.gtag) {
      gtag("event", "page_view", {
        fcp: fcpTime,
      });
    }
  }

  // Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver(list => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    const lcp = Math.round(lastEntry.renderTime || lastEntry.loadTime);
    console.log(`[Performance] LCP: ${lcp}ms`);
  });

  try {
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    // LCP observer not supported
  }

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
    console.log(`[Performance] CLS: ${clsValue.toFixed(3)}`);
  });

  try {
    clsObserver.observe({ type: "layout-shift", buffered: true });
  } catch {
    // CLS observer not supported
  }

  // Interaction to Next Paint (INP)
  const inpObserver = new PerformanceObserver(list => {
    let inp = 0;
    for (const entry of list.getEntries()) {
      inp = Math.max(inp, entry.duration);
    }
    console.log(`[Performance] INP: ${Math.round(inp)}ms`);
  });

  try {
    inpObserver.observe({ type: "event", buffered: true });
  } catch {
    // INP observer not supported
  }

  // Navigation Timing
  window.addEventListener("load", () => {
    const perfData = performance.getEntriesByType("navigation")[0];
    if (perfData) {
      const timing = {
        dns: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
        tcp: Math.round(perfData.connectEnd - perfData.connectStart),
        ttfb: Math.round(perfData.responseStart - perfData.fetchStart),
        download: Math.round(perfData.responseEnd - perfData.responseStart),
        dom: Math.round(perfData.domInteractive - perfData.domLoading),
        domcontent: Math.round(
          perfData.domContentLoadedEventEnd -
            perfData.domContentLoadedEventStart
        ),
        load: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
        total: Math.round(perfData.loadEventEnd - perfData.fetchStart),
      };
      console.log("[Performance] Navigation Timing:", timing);
    }
  });
}

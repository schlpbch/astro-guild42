// Guild42 Theme Configuration for Observable Plot
export const guild42Theme = {
  colors: {
    primary: '#fbbf24', // Yellow
    secondary: '#d97706', // Orange
    accent: '#3b82f6', // Blue
    cyan: '#06b6d4', // Cyan
    success: '#10b981', // Green
    warning: '#f59e0b', // Amber
    danger: '#ef4444', // Red
    neutral: '#6b7280', // Gray
  },

  // Observable Plot default configuration
  plotDefaults: {
    style: {
      fontSize: '14px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: 'transparent',
    },
    grid: true,
    inset: 10,
    marginLeft: 60,
    marginBottom: 40,
    marginTop: 20,
    marginRight: 20,
  },

  // Chart color schemes
  chartColors: {
    sequential: ['#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309'],
    categorical: ['#fbbf24', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
    diverging: ['#ef4444', '#f59e0b', '#fbbf24', '#fef3c7', '#d1fae5', '#6ee7b7', '#10b981'],
  },

  // Animation settings
  animations: {
    duration: 800,
    easing: 'cubicOut',
    stagger: 50,
  },
};

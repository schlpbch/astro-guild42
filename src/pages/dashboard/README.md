# Guild42 Survey Dashboards

Interactive survey result visualizations built with Observable Plot and Astro.

## 📊 Available Dashboards

- **[Survey 2026](/dashboard/survey-2026)** - Member feedback on topics, speakers, and event formats

## 🚀 Quick Start

```bash
# Start dev server
pnpm run dev

# Visit dashboards
open http://localhost:4321/dashboard
```

## 📁 Project Structure

```
src/
├── pages/dashboard/
│   ├── index.astro              # Dashboard overview
│   └── survey-2026.astro        # 2026 Survey results
│
├── components/
│   ├── charts/
│   │   ├── ObservablePlot.tsx   # Plot wrapper
│   │   └── BarChart.tsx         # Bar chart component
│   └── metrics/
│       └── MetricCard.tsx       # KPI cards
│
├── config/
│   ├── theme.ts                 # Guild42 theme
│   └── survey-schemas.ts        # TypeScript types
│
├── data/surveys/
│   └── guild42-survey-2026.json # Aggregated data
│
└── utils/survey/
    └── csvParser.ts             # CSV parser utilities
```

## 🎨 Features

- **Observable Plot** - Modern, declarative charting library
- **Animated Metrics** - GSAP-powered number animations
- **Responsive Design** - Mobile-friendly layouts
- **Guild42 Branding** - Custom color scheme
- **TypeScript** - Fully typed components

## 📝 Adding New Surveys

1. **Export CSV from Findmind**

   ```bash
   # Place in: src/data/surveys/your-survey.csv
   ```

2. **Convert to JSON**

   ```typescript
   import { parseCSV, aggregateSurveyData } from "./utils/survey/csvParser";

   const csv = await fs.readFile("your-survey.csv", "utf-8");
   const rows = parseCSV(csv);
   const data = aggregateSurveyData(rows);
   ```

3. **Create Dashboard Page**

   ```astro
   ---
   // src/pages/dashboard/your-survey.astro
   import surveyData from "../../data/surveys/your-survey.json";
   // ... use BarChart, MetricCard components
   ---
   ```

4. **Update Index**
   Add entry to `src/pages/dashboard/index.astro`

## 🎯 Chart Types

Currently implemented:

- **BarChart** - Horizontal/vertical bars with tooltips
- **MetricCard** - Animated KPI cards

Can be added (Observable Plot supports):

- **LineChart** - Time series data
- **PieChart** - Percentage distributions
- **DotPlot** - Scatter plots
- **AreaChart** - Filled areas

## 🛠 Tech Stack

- **Astro 5.16** - Static site generator
- **Observable Plot 0.6** - Data visualization
- **React 19** - Component islands
- **GSAP 3** - Animations
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## 📖 Documentation

- [Observable Plot Docs](https://observablehq.com/plot/)
- [Astro Docs](https://docs.astro.build/)
- [Strategy Doc](/code/plaintext-graphics/docs/survey-presentation-strategies/)

---

Built with ❤️ for Guild42

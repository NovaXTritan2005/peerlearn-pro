# Cosmic Research Lab — Deep Research Analysis

A production-grade, static website showcasing behavioral finance research with advanced data visualization. Built with **React + Vite + TailwindCSS + Three.js + Plotly.js** and ready for **GitHub Pages**.

## ✨ Highlights

- **Warp-speed cosmic background** with Three.js star-streak shaders and graceful WebGL fallbacks
- **Einstein intro video** with localStorage gating and accessibility controls  
- **Interactive research index** with pill filters, virtualized data tables, and CSV export
- **Advanced dashboard** with Plotly.js charts (no CDN), risk analysis, and contextual examples
- **Fully accessible** WCAG AA compliant with prefers-reduced-motion support
- **Production-ready** with bundle budgets, code splitting, and performance optimization

## 🚀 Local Development

```bash
npm install
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🌐 Deploy to GitHub Pages

1. Create a public repository named `peerlearn-pro` (or update the `base` in `vite.config.js`)
2. Push all files to the `main` branch
3. In GitHub → Settings → Pages → set **Source = GitHub Actions**
4. The site will deploy automatically on every push

## 📊 Data Management

### Updating Research Data

Replace the HTML data files with your own research:

- `/data/index.html` → Research index with leaderboard and per-file reports
- `/data/dashboard.html` → Dashboard data with rankings and contextual examples

The app uses `DOMParser` to extract data at runtime, so maintain the HTML structure:

**For index.html:**
```html
<div class="pills">
  <span class="pill" data-bank="Bank Name" data-score="8.7">Bank Name (8.7)</span>
</div>
<table class="reports-table">
  <tbody>
    <tr><td>1</td><td>Bank</td><td>2023</td><td>8.7</td><td>94%</td><td>0.82</td><td><a href="...">Report</a></td></tr>
  </tbody>
</table>
```

**For dashboard.html:**
```html
<table class="rankings-table">
  <tbody>
    <tr><td>Bank</td><td>8.7</td><td>82%</td><td>94%</td><td>Mechanisms</td><td>Effects</td></tr>
  </tbody>
</table>
<div class="example">
  <h3>Bank Name</h3>
  <p><strong>Mechanism:</strong> Type</p>
  <p><strong>Micro-reason:</strong> Explanation</p>
  <p><strong>Excerpt:</strong> "Quote..."</p>
</div>
```

### Updating Video Assets

Replace `/assets/einstein.mp4` with your intro video. The component includes:
- Autoplay detection and fallback
- Accessibility controls (skip, mute, replay)
- localStorage gating (shows only once)
- Responsive poster image support

## 🛠️ Technical Architecture

### Core Technologies
- **React 18** - Component framework
- **Vite** - Build tool with HMR
- **TailwindCSS** - Utility-first styling
- **Three.js** - 3D cosmic backgrounds with shaders
- **Plotly.js** - Data visualization (bundled, no CDN)
- **Framer Motion** - Page transitions and micro-interactions

### Performance Features
- **Code splitting** - Pages and heavy libraries loaded on demand  
- **Bundle budgets** - Automatic warnings for large chunks
- **WebGL fallbacks** - CSS gradients when hardware acceleration unavailable
- **Virtualized tables** - Handle large datasets with react-window
- **Responsive images** - Optimized assets with proper sizing

### Accessibility
- **WCAG AA compliant** - Semantic HTML, proper ARIA labels, keyboard navigation
- **Reduced motion support** - Respects user preferences
- **Skip links** - Quick navigation for screen readers
- **Focus management** - Proper tab order and visible focus indicators

## 🎨 Customization

### Theme & Branding
Edit `/src/content.js` for all user-facing text and copy. The cosmic theme uses:

- **Colors:** Deep space indigo/blue/black with purple accents
- **Typography:** Inter for UI, serif for headings  
- **Motion:** Subtle parallax, magnetic buttons, gentle transitions

### Component Library
- `<CosmicBackground />` - Configurable Three.js star field
- `<EinsteinIntro />` - Video overlay with controls
- `<DataTable />` - Virtualized, sortable, filterable tables
- `<RiskChart />` - Plotly.js visualizations
- `<PillFilter />` - Interactive filter chips
- `<ExamplesList />` - Expandable contextual cards

## 📈 Performance Monitoring

The build includes warnings for:
- Bundle sizes > 500KB
- Unoptimized images
- Missing accessibility attributes
- Code splitting opportunities

Monitor Lighthouse scores:
- **Desktop:** Target 90+ overall
- **Mobile:** Target 80+ overall

## 🔧 Development Notes

- **HashRouter** used for GitHub Pages compatibility
- **Dynamic imports** for Three.js and Plotly.js reduce initial bundle size
- **Error boundaries** handle API failures gracefully
- **Progressive enhancement** ensures core functionality without JavaScript

---

Built with ❤️ for the research community. MIT Licensed.

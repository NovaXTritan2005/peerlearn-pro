# PeerLearn Pro — Cosmos Edition

A redesigned, production-ready, cosmos‑themed site. Built with **React + Vite + Tailwind + three.js + Recharts**. Ready for **GitHub Pages**.

## ✨ Highlights
- Real‑time 3D **black hole** background (three.js) with stars & accretion disk
- Clean, consistent **glassmorphism** UI
- **HashRouter** for zero 404s on Pages
- GitHub **Actions** workflow included
- Dashboard charts (Recharts), elegant cards, and responsive layout

## 🚀 Local Dev
```bash
npm ci
npm run dev
```

## 🏗️ Build
```bash
npm run build
```

## 🌐 Deploy to GitHub Pages
1. Create a public repo named `peerlearn-pro` (or any name you prefer).
2. Upload all files to the repo and push to `main`.
3. In GitHub ➜ Settings ➜ Pages ➜ set **Source = GitHub Actions**.
4. Done. Pages will deploy automatically.

> If your repo name is NOT `peerlearn-pro`, open `vite.config.js` and change `base: '/<your-repo>/'` accordingly.

## 🔧 Tech decisions
- **HashRouter** chosen for simplicity on Pages. (If you prefer BrowserRouter, keep `404.html` and set up a SPA fallback.)
- **Tailwind** for quick iteration + consistent design tokens.
- **three.js** scene is optimized and auto‑disposes on route change.
- **Recharts** for lightweight analytics panels.

---

MIT © You

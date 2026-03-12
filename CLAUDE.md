# CLAUDE.md — Academic Integrity Toolkit (FPT University)

## Project Overview
**Academic Integrity Toolkit** is a web application for new students at FPT University. It helps students understand academic integrity, avoid plagiarism, use AI ethically, and cite sources properly.

### Core Objectives
1. Raise awareness of academic integrity among freshmen
2. Reduce plagiarism and AI abuse
3. Provide tools for proper citation and plagiarism checking

## Tech Stack
| Layer       | Technology                                  |
|-------------|---------------------------------------------|
| Framework   | React 19 + Vite 7                           |
| Routing     | React Router DOM v7                         |
| Styling     | **Tailwind CSS v4** — npm installed with `@tailwindcss/vite` plugin |
| Fonts       | Inter (body), Outfit (headings), Plus Jakarta Sans (display) — Google Fonts |
| Language    | JavaScript (JSX)                            |

> **IMPORTANT**: Tailwind is installed via npm (`tailwindcss` + `@tailwindcss/vite`). The Vite plugin is registered in `vite.config.js`. Custom theme (colors, fonts) is defined via `@theme` directive in `src/index.css`.

## How to Run
```bash
cd "d:\Quoc Khanh\CODING-PROJECT\TOOLKIT-newStudent"
npm run dev          # starts Vite dev server at http://localhost:5173
npm run build        # production build
npm run preview      # preview production build
```

## Project Structure
```
TOOLKIT-newStudent/
├── index.html                # Entry HTML — Google Fonts, SEO meta tags
├── vite.config.js            # Vite configuration
├── package.json
├── public/                   # Static assets (favicon, etc.)
├── src/
│   ├── main.jsx              # React entry — BrowserRouter wrapper
│   ├── App.jsx               # Root component — Routes
│   ├── index.css             # Tailwind import, @theme config, global CSS
│   ├── pages/                # Page-level components
│   │   └── Home.jsx          # Landing page
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, Sidebar
│   │   ├── ui/               # Reusable UI (Button, Card, Modal, ProgressBar...)
│   │   └── sections/         # Page sections (Hero, Features, Quiz, etc.)
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Helper functions
│   └── assets/
│       ├── images/
│       └── videos/
└── CLAUDE.md                 # This file
```

## Design System (Custom Tailwind Theme)
Defined in `src/index.css` via `@theme` directive:

### Colors
- **Primary** (Deep Navy/Royal Blue): `primary-50` through `primary-950` — trust, academic, intelligence
- **Accent** (Vibrant Orange): `accent-50` through `accent-950` — energy, FPT branding, CTAs
- **Surface** (Neutral grays): `surface-50` through `surface-950` — backgrounds, text
- **Semantic**: `success` (#22c55e), `error` (#ef4444), `warning` (#f59e0b)

### Typography
- `font-sans` → Inter (body text, UI)
- `font-heading` → Outfit (h1-h6, titles)
- `font-display` → Plus Jakarta Sans (hero text, display)

### Usage Examples
```jsx
<h1 className="font-(family-name:--font-heading) text-primary-950">Title</h1>
<p className="text-surface-600">Body text</p>
<button className="bg-accent-500 hover:bg-accent-600 text-white">CTA</button>
```

## Key Features (4 Phases)
### Phase 1: Survey & Awareness
- On-campus survey event with QR codes, mini-games, check-in gifts
- Introduces the toolkit website to new students

### Phase 2: Assessment Quiz (Gamified)
- One-question-per-screen interactive quiz
- Tests: plagiarism identification, citation knowledge, AI usage rules, paraphrasing
- Results categorize students by knowledge level
- UI: progress bar, large clickable cards, micro-animations (green glow/red shake)

### Phase 3: Training Videos (LearnLab)
- Instructor-led videos on citation (APA, Harvard), paraphrasing, ethical AI use
- Interview-style content with university faculty
- Progress tracking per video

### Phase 4: Web Tools (Dashboard)
1. **Plagiarism & AI Checker** — Upload/paste text, get plagiarism % and AI-detection score (split-screen UI)
2. **Citation Generator** — Step-by-step form: source type → citation style → auto-generate (1-click copy)
3. **LearnLab** — Video hub with masonry grid, progress indicators, tags
4. **1vs1 Support** — Short courses + link to Facebook fanpage for direct help

## UI/UX Art Direction
- **Style**: Clean Modern SaaS × Gamified EdTech (Notion meets Duolingo)
- **Background**: Off-white `surface-50` (#F9FAFB) with Dark Mode option
- **Landing Page**: Bold hero → Bento-box features grid → WebGL/animated background
- **Quiz**: Step-by-step cards, progress bar, immediate feedback with micro-interactions
- **Dashboard**: Sidebar navigation + main content area

## Important Links
- **Plagiarism Checker reference**: https://www.scribbr.com/plagiarism-checker/
- **Citation Generator reference**: https://www.scribbr.com/citation/generator/apa/
- **Facebook Fanpage**: https://www.facebook.com/profile.php?id=61583706310530

## Coding Conventions
- Use functional components with hooks
- File names: PascalCase for components (`NavBar.jsx`), camelCase for utils (`formatDate.js`)
- Use Tailwind utility classes for ALL styling (no separate CSS modules per component)
- Keep components small and composable
- Use React Router `<Link>` for navigation, never `<a href>`

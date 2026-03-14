# AGENTS.md — Academic Integrity Toolkit (FPT University)

## Project Overview

**Academic Integrity Toolkit** is a full-stack web application for new students at FPT University. It helps students understand academic integrity, avoid plagiarism, use AI ethically, and cite sources properly.

### Core Objectives

1. Raise awareness of academic integrity among freshmen
2. Reduce plagiarism and AI abuse
3. Provide tools for proper citation and plagiarism checking

## Tech Stack

| Layer      | Technology                                                                  |
| ---------- | --------------------------------------------------------------------------- |
| Frontend   | React 19 + Vite 7                                                           |
| Routing    | React Router DOM v7                                                         |
| Styling    | **Tailwind CSS v4** — `@tailwindcss/vite` plugin                            |
| Animations | GSAP (ScrollTrigger), Motion (Framer Motion)                                |
| Icons      | React Icons (Go icon set)                                                   |
| Fonts      | Inter (body), Outfit (headings), Plus Jakarta Sans (display) — Google Fonts |
| Backend    | **Express 5** (Node.js 22+)                                                 |
| Database   | **MongoDB Atlas** via Mongoose 9                                            |
| Auth       | JWT (jsonwebtoken) + bcryptjs                                               |
| AI         | Groq API (llama-3.3-70b-versatile)                                          |
| Deployment | **Railway** (Nixpacks builder)                                              |

> **IMPORTANT**: Tailwind is installed via npm. Custom theme (colors, fonts) is defined via `@theme` directive in `src/index.css`.

## How to Run

```bash
cd "d:\Quoc Khanh\CODING-PROJECT\TOOLKIT-newStudent"

# Development (frontend + backend)
npm run dev:all      # Vite (5173) + Express (5000) concurrently

# Individual
npm run dev          # Vite only at http://localhost:5173
npm run server       # Express only at http://localhost:5000

# Production
npm run build        # Vite production build → dist/
npm start            # Express serves dist/ + API
```

## Environment Variables (.env)

```
MONGODB_URI=mongodb+srv://...          # MongoDB Atlas connection
JWT_SECRET=your_secret_key             # JWT signing secret
VITE_GROQ_API_KEY=gsk_...             # Groq AI API key (exposed to frontend)
```

## Project Structure

```
TOOLKIT-newStudent/
├── index.html                   # Entry HTML — Google Fonts, SEO meta
├── vite.config.js               # Vite config + API proxy (/api → :5000)
├── railway.json                 # Railway deployment config (Nixpacks)
├── package.json                 # Scripts, engines (Node >=22)
│
├── server/                      # ── BACKEND ──
│   ├── index.js                 # Express app, MongoDB connect, serves dist/
│   ├── models/
│   │   ├── User.js              # User schema (name, email, mssv, password)
│   │   ├── Activity.js          # Activity log (userId, type, details)
│   │   ├── Survey.js            # Survey responses
│   │   ├── GameResult.js        # Mini game results
│   │   ├── CheckIn.js           # Check-in records
│   │   └── Video.js             # Video metadata
│   └── routes/
│       ├── auth.js              # POST /register, /login, GET /me
│       ├── activity.js          # POST /, GET /, GET /stats
│       ├── api.js               # Survey, game, check-in endpoints
│       └── videos.js            # Video CRUD
│
├── src/                         # ── FRONTEND ──
│   ├── main.jsx                 # React entry — BrowserRouter
│   ├── App.jsx                  # Routes + AuthProvider wrapper
│   ├── index.css                # Tailwind @theme config, global CSS
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx      # Auth state, login/logout, logActivity helper
│   │
│   ├── pages/
│   │   ├── Home.jsx             # Landing page (assembles sections)
│   │   ├── Login.jsx            # Login (MSSV or Email)
│   │   ├── Register.jsx         # Registration
│   │   ├── Dashboard.jsx        # User dashboard (stats, activity history)
│   │   ├── PlagiarismChecker.jsx # AI-powered plagiarism analysis
│   │   ├── CitationGenerator.jsx # APA/Harvard citation generator
│   │   ├── Quiz.jsx             # Gamified knowledge quiz
│   │   ├── Survey.jsx           # Academic integrity survey
│   │   ├── MiniGame.jsx         # True/False speed game
│   │   ├── CheckIn.jsx          # Event check-in
│   │   ├── LearnLab.jsx         # Video learning hub
│   │   └── Support.jsx          # 1vs1 support + courses
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── CardNav.jsx      # Glassmorphism navbar (auth-aware)
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx         # Video bg, BlurText, TargetCursor
│   │   │   ├── Features.jsx     # Bento grid with ScrollReveal
│   │   │   ├── QuizCTA.jsx      # Quiz call-to-action section
│   │   │   └── Fanpage.jsx      # Facebook fanpage section
│   │   └── ui/
│   │       ├── BlurText.jsx     # Word-by-word blur/fade animation
│   │       ├── ScrollReveal.jsx # GSAP scroll-driven text reveal
│   │       └── TargetCursor.jsx # Spinning corner cursor (desktop only)
│   │
│   ├── services/
│   │   ├── groqService.js       # Groq AI API for plagiarism analysis
│   │   └── apiService.js        # Backend API calls (survey, game, checkin)
│   │
│   └── assets/
│       ├── images/
│       └── videos/
│
└── AGENTS.md                    # This file
```

## Authentication System

- **Login**: MSSV (e.g. `DE123456`) or Email + password
- **Registration**: Name, MSSV, Email, Password
- **JWT tokens** stored in `localStorage`
- **AuthContext** provides: `user`, `token`, `login()`, `logout()`, `authFetch()`, `logActivity()`
- **Navbar**: Shows "Đăng ký ngay" when logged out → user avatar circle when logged in (→ Dashboard)

## Activity Tracking

Every tool logs activity via `logActivity(type, details)`:

| Type                | Trigger Page      |
| ------------------- | ----------------- |
| `plagiarism_check`  | PlagiarismChecker |
| `citation_generate` | CitationGenerator |
| `quiz_complete`     | Quiz              |
| `survey_complete`   | Survey            |
| `game_complete`     | MiniGame          |
| `checkin`           | CheckIn           |
| `video_watch`       | LearnLab          |
| `course_read`       | Support           |

Dashboard displays stats counters and activity timeline from `/api/activity/stats` and `/api/activity`.

## Custom UI Components

### BlurText (`src/components/ui/BlurText.jsx`)

- Word-by-word or character-by-character blur/fade entrance animation
- Props: `highlightWords`, `highlightClassName` for coloring specific words
- Used in: Hero headlines, QuizCTA heading

### ScrollReveal (`src/components/ui/ScrollReveal.jsx`)

- GSAP ScrollTrigger-based word reveal animation
- Animates opacity, blur, and rotation on scroll
- Used in: Features descriptions, QuizCTA paragraph

### TargetCursor (`src/components/ui/TargetCursor.jsx`)

- Custom spinning corner bracket cursor following mouse
- Snaps to `.cursor-target` elements on hover
- **Desktop only** — uses `matchMedia('(hover: hover) and (pointer: fine)')`
- Hidden default cursor in Hero section, restored on scroll past
- Used in: Hero section only

## Design System (Custom Tailwind Theme)

Defined in `src/index.css` via `@theme` directive:

### Colors

- **Primary** (Deep Navy/Royal Blue): `primary-50` → `primary-950`
- **Accent** (FPT Orange): `accent-50` → `accent-950`
- **Surface** (Neutral grays): `surface-50` → `surface-950`
- **Semantic**: `success` (#22c55e), `error` (#ef4444), `warning` (#f59e0b)

### Typography

- `--font-sans` → Inter (body text)
- `--font-heading` → Outfit (headings)
- `--font-display` → Plus Jakarta Sans (hero/display)

```jsx
<h1 className="font-(family-name:--font-heading) text-primary-950">Title</h1>
<button className="bg-accent-500 text-white">CTA</button>
```

## Deployment (Railway)

- **Builder**: Nixpacks (configured in `railway.json`)
- **Build**: `npm run build` (Vite → `dist/`)
- **Start**: `npm start` (Express serves `dist/` + API)
- **Node**: ≥22 (set in `package.json` engines)
- **Env vars on Railway**: `MONGODB_URI`, `JWT_SECRET`, `VITE_GROQ_API_KEY`
- Express 5 SPA fallback: `app.get("/{*path}", ...)` serves `index.html`

## API Routes

| Method | Endpoint              | Auth | Description              |
| ------ | --------------------- | ---- | ------------------------ |
| POST   | `/api/auth/register`  | No   | Register new user        |
| POST   | `/api/auth/login`     | No   | Login, returns JWT       |
| GET    | `/api/auth/me`        | Yes  | Get current user profile |
| POST   | `/api/activity`       | Yes  | Log an activity          |
| GET    | `/api/activity`       | Yes  | Get activity history     |
| GET    | `/api/activity/stats` | Yes  | Get activity summary     |
| POST   | `/api/survey`         | No   | Submit survey            |
| POST   | `/api/game-result`    | No   | Submit game result       |
| POST   | `/api/checkin`        | No   | Check-in                 |
| GET    | `/api/health`         | No   | Health check             |

## Coding Conventions

- Functional components with hooks
- File names: PascalCase for components (`NavBar.jsx`), camelCase for utils
- Tailwind utility classes for ALL styling (no CSS modules)
- React Router `<Link>` for navigation, never `<a href>`
- Express 5 syntax (wildcard: `/{*path}`, no `next` in async middleware)
- Mongoose 7+ patterns (async pre-save hooks without `next`)

## Important Links

- **Plagiarism Checker reference**: https://www.scribbr.com/plagiarism-checker/
- **Citation Generator reference**: https://www.scribbr.com/citation/generator/apa/
- **Facebook Fanpage**: https://www.facebook.com/profile.php?id=61583706310530

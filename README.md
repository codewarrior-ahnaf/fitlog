# FitLog — Dark Gym Companion & Workout Library

> **"TRAIN WITH INTENT. LOG EVERY SET."**  
> FitLog is a high-performance, dark-themed workout library and daily training companion. Pick a lift, lock it into today's plan, and track your metrics in real-time across all screen sizes.

---

## 📌 Project Overview

FitLog is designed based on the Figma design system to deliver a dark, no-nonsense gym companion experience. Users can explore major lifts covering all major muscle groups, inspect comprehensive exercise specifications with step-by-step instructions, organize their workout schedule into "Today's Plan" (with a maximum cap of 5 lifts) or "Saved for Later", and track cumulative exercises, minutes, and calories in real time.

---

## ⚡ Live API Endpoints

- **All Exercises**: [https://api.abcz.workers.dev/api/fitlog](https://api.abcz.workers.dev/api/fitlog)
- **Single Exercise Details**: [https://api.abcz.workers.dev/api/fitlog/:id](https://api.abcz.workers.dev/api/fitlog/1)
- Built with an offline-resilient fallback mechanism to guarantee zero runtime failures after deployment.

---

## 🛠️ Technologies Used

- **Framework**: [Next.js 16 (App Router & Turbopack)](https://nextjs.org/)
- **Core Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Typography**: Google Fonts [Oswald](https://fonts.google.com/specimen/Oswald) (Display headings) & [Geist](https://vercel.com/font) / [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Icons**: Custom SVG Icons (Clock, Fire, Star, Checkmark, Chevron, Plus, Trash)
- **State & Storage**: Client-side `localStorage` with reactive custom event dispatching (`fitlog-state-change`) for instant cross-component synchronization.

---

## ✨ 5+ Key Features

### 1. 🏋️ Pixel-Perfect Workout Library & 3x4 Grid
- Displays 12 major lifts covering every muscle group (Chest, Arms, Legs, Core, Back, Full Body) in a 3x4 responsive grid on desktop.
- Each workout card presents an illustration, neon lime category badges (`#ccff00`), uppercase title in Oswald font, equipment line, and stats row (duration, calories, rating).

### 2. 🎯 Interactive Workout Details with Full Specs & Instructions
- Two-column responsive layout: large workout image on the left, detailed specs on the right.
- Complete **Key Specs** table showing equipment, difficulty level, sets, reps, duration, calories burned, and community rating.
- Ordered 4-step workout instructions with numbered badge indicators.
- Instant actions to "Add to today's plan" and "Save for later" with real-time feedback.

### 3. 📊 Real-Time "My Plan" Dashboard & Metrics Summary
- Live cumulative stat cards for **Exercises** (highlighted in `#ccff00`), **Minutes**, and **Calories** that dynamically compute totals.
- Seamless tab switching between **Today's Plan** and **Saved**.
- Dedicated empty-state view with "NOTHING HERE YET" messaging and direct CTA linking back to the library.

### 4. 🔝 Real-Time Navbar Badges & Active Highlighting
- Dynamic **Plan** badge (filled pill with `#ccff00` accent) and **Saved** badge (border outline pill) that update live as workouts are added or removed.
- Both badges directly link to `/my-plan`.
- Distinct highlighted active page link indicators matching the Figma design.

### 5. ✅ Completion Tracking ("Mark as Done") & Daily 5-Lift Cap
- Workouts in Today's Plan can be marked as completed with a green checkmark toggle ("Mark as Done" / "Done ✓").
- Built-in enforcement of the 5-lift daily cap: prevents adding more than five exercises, alerting the user to finish current lifts before loading more.
- Workouts can easily be removed (X) or moved between Saved and Today's Plan.

### 6. 🔄 Multi-Metric Sorting & Instant Search (Challenge Feature)
- Dynamic "Sort By" dropdown on both Home and My Plan pages supporting **Duration**, **Calories**, and **Rating** with custom chevron icon.
- Interactive search bar filtering lifts by workout name, equipment, or muscle group tag.

### 7. 💾 LocalStorage Persistence & Zero-Error Deployment
- All state survives hard page refreshes and browser restarts.
- Resilient API architecture with embedded offline fallback data ensuring reliable static page generation and error-free reloads upon deployment.
- Custom 404 page for unknown routes.

---

## 📱 Responsive Design

Tested and optimized across all viewports:
- **Mobile (< 640px)**: Single-column grid, stacked hero banner, compact mobile menu.
- **Tablet (640px – 1024px)**: 2-column grid, responsive tables, flexible header metrics.
- **Desktop (1024px+)**: 3-column library grid, side-by-side hero banner, two-column detail page layout.

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd fitlog
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📂 Project Architecture

```
fitlog/
├── app/
│   ├── components/
│   │   ├── exercises/
│   │   │   ├── ExerciseCard.tsx     # Library card component
│   │   │   └── ExerciseDetail.tsx   # Two-column detail page component
│   │   ├── shared/
│   │   │   ├── Footer.tsx           # Dark theme footer
│   │   │   └── Navbar.tsx           # Navbar with active states & counters
│   │   └── ui/
│   │       └── ToastProvider.tsx    # Toast notification system
│   ├── exercises/
│   │   └── [id]/
│   │       └── page.tsx             # Dynamic workout detail route
│   ├── workout/
│   │   └── [id]/
│   │       └── page.tsx             # Workout route alias
│   ├── my-plan/
│   │   └── page.tsx                 # My Plan & Saved dashboard
│   ├── globals.css                  # Tailwind v4, Oswald typography & theme
│   ├── layout.tsx                   # Root layout with fonts & metadata
│   ├── not-found.tsx                # Custom 404 page
│   └── page.tsx                     # Home page (Hero banner + The Library)
├── lib/
│   ├── fitlog.ts                    # API fetcher with resilient fallback data
│   └── fitlog-storage.ts            # LocalStorage state management
├── public/
│   ├── banner.png                   # Hero illustration
│   └── logo.png                     # FITLOG neon dumbbell logo
├── README.md                        # Documentation
├── package.json
└── tsconfig.json
```

---

## 📄 License

This project is licensed under the MIT License — feel free to use and modify for learning.

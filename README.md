# FitLog

FitLog is a dark-themed fitness workout library built with Next.js. It lets users browse exercises from a live API, save workouts for later, build a daily plan, and track their selected training routine without leaving the app.

## Technologies Used

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- DaisyUI
- LocalStorage for persistent plan/saved state

## Key Features

1. Responsive workout library with live API data
2. Workout detail page with instructions, specs, and CTA actions
3. Today's Plan and Saved tracking with badge counters
4. Toast notifications for plan/saved actions
5. LocalStorage persistence so data survives reloads
6. Loading state and empty-state UX for better experience
7. Dynamic sort options by duration, calories, and rating

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Project Structure

- `app/` — pages, layout, and UI views
- `lib/` — API helpers and local storage logic
- `public/` — static assets such as the logo

## Notes

This app uses the provided FitLog API:

- https://api.abcz.workers.dev/api/fitlog
- https://api.abcz.workers.dev/api/fitlog/:id

It is designed to work across mobile, tablet, and desktop layouts with a dark gym-focused design inspired by the provided mockup.

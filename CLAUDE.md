# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server (http://localhost:4200)
ng serve

# Build for production
npm run build       # or: ng build --prod

# Run unit tests (Karma/Jasmine, opens Chrome)
npm test

# Run linter (TSLint)
npm run lint

# Run a single test file (use --include pattern)
ng test --include='**/app.component.spec.ts'

# E2E tests
npm run e2e

# Production server (serves dist/FreshHell/)
npm start
```

## Architecture

**FreshHell** is a single-page Angular 8 app for logging personal "hellish experiences." All data is persisted in browser `localStorage` — there is no backend API.

### Key files

- `src/app/app.component.ts` — Main component; owns all form logic, localStorage read/write, and stats tracking
- `src/app/app.module.ts` — Root module; imports BrowserModule, BrowserAnimationsModule, ReactiveFormsModule
- `src/app/angular-footer/` — Simple presentational footer component
- `server.js` — Express server used in production (Heroku); serves `dist/FreshHell/` and redirects all routes to `index.html`

### Data model (localStorage)

| Key | Shape | Description |
|-----|-------|-------------|
| `hells` | `{description: string, observed: Date}[]` | Most recent 9 entries |
| `stats` | `{count: number, histogram: object[]}` | Total count across all sessions |
| `optIn` | `boolean` | Cloud-reporting opt-in flag (feature not yet implemented) |

### Notes on known issues

- `app.component.spec.ts` tests reference a `title` property and "Welcome to FreshHell!" text that do not exist — tests will fail unless updated.
- The opt-in checkbox in `app.component.html` is not bound to the component's `optIn` property.
- Histogram tracking exists in the data model but is not populated.
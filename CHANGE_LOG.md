# Change Log

## [1.0.0] — React Version

### Added
- **`ReactVersion/`** — Recreated FreshHell as a modern React app with Vite, TypeScript, and React 19.
  Identical functionality and visual design to the Angular version.
- **Vite + TypeScript** build tooling with `vite.config.ts` and strict `tsconfig.json`.
- **Vitest + React Testing Library** test suite (`vitest.config.ts`, 9 tests across 2 files).
- **`src/hooks/useLocalStorage.ts`** — Custom `useHellStorage()` hook with functional state updaters
  to prevent stale closure bugs. Reads/writes `hells` and `stats` to localStorage.
- **`src/App.tsx`** — Main component with controlled textarea form, hell list, and stats bar.
  Same CSS class names as Angular version for visual parity.
- **`src/components/ReactFooter/`** — Footer component with React logo (replaces Angular logo).
- **`server.js`** — Express 5 production server for Vite's flat `dist/` output.

### Changed
- Moved Angular app to `AngularVersion/` directory.

### Removed
- **Opt-in checkbox** — was unbound/dead in the Angular version; not carried over to React.
- **Dead `message` property** from footer component; not carried over to React.

## [Unreleased]

### Changed
- **`app.component.html`** — Redesigned template with a clean, centered layout. Replaced the plain
  text input with a styled `<textarea>` using JetBrains Mono font. Added semantic sections for
  header, form, recent misfortunes list, and stats bar. Migrated from deprecated `*ngIf`/`*ngFor`
  directives to modern Angular `@if`/`@for` control flow blocks. Fixed form submission to use
  `(ngSubmit)` instead of `(click)`.
- **`app.component.css`** — Complete visual overhaul with modern styling: gradient background,
  glassmorphic card for the form, Playfair Display serif headings, Inter sans-serif body text,
  JetBrains Mono monospace textarea, gradient submit button with hover effects, and card-style
  list items with hover animations.
- **`index.html`** — Replaced Roboto font import with Inter, Playfair Display, and JetBrains Mono
  from Google Fonts.
- **`styles.css`** — Updated global styles to use Inter as the base font with font smoothing.
- **`app.component.ts`** — Removed unused `NgFor` import (no longer needed with `@for` block).
- **`app.component.spec.ts`** — Rewrote tests to fix all known issues: replaced deprecated `async`
  with native `async/await`, added `ReactiveFormsModule` import, mocked `localStorage`, removed
  stale `title` property test, added tests for form validation, submission, and stats display.
- **`angular-footer.component.spec.ts`** — Replaced deprecated `async` with native `async/await`,
  updated TestBed config to use standalone component imports.

### Fixed
- **`app.component.ts`** — Defined `Hell` and `Stats` TypeScript interfaces; replaced `object[]`
  and untyped stats literal with strongly-typed properties, enabling full compile-time checks.
- **`app.component.ts`** — Removed `histogram` from `Stats`; the field was declared but never
  populated (the histogram code block was permanently commented out).
- **`app.component.ts`** — Moved all `localStorage` reads out of the constructor into a private
  `loadFromStorage()` method called from `ngOnInit()`. The constructor now only handles dependency
  injection, making the component safe for SSR and unit testing.
- **`app.component.ts`** — Eliminated double `localStorage.getItem` calls per key; each value is
  now read once into a `const` before the truthiness check and `JSON.parse`.
- **`app.component.ts`** — Wrapped each `JSON.parse` in a `try/catch` so corrupted localStorage
  data falls back to safe defaults instead of throwing an uncaught `SyntaxError`.
- **`app.component.ts`** — Applied `.slice(0, 9)` directly to the in-memory `hells` array after
  prepending, keeping in-memory and persisted state consistent and preventing unbounded growth.
- **`app.component.ts`** — Fixed comma-operator misuse (`count = count + 1, localStorage.setItem(…)`)
  by separating the two statements with a proper semicolon.
- **`app.component.ts`** — Removed the unimplemented `optIn` dead-code branch (property declaration,
  localStorage read, and empty `if` block) until the cloud-reporting feature is ready to be built.

## [0.1.0] — Angular 21 Upgrade

### Changed
- **Angular framework** upgraded from 8.0.1 to 21.2.0 (13 major versions).
- **TypeScript** upgraded from 3.4 to 5.9.
- **RxJS** upgraded from 6.4 to 7.8.
- **zone.js** upgraded from 0.9 to 0.16; import path updated from `zone.js/dist/zone` to `zone.js`.
- **Express** upgraded from 4.17 to 5.2; wildcard route updated to `/{*splat}` for Express 5
  named-parameter syntax. Static file path updated to `dist/FreshHell/browser/` (application
  builder output structure).
- **Build system** migrated from the deprecated `browser` builder to `@angular-devkit/build-angular:application`.
  Polyfills are now declared inline in `angular.json` instead of via `src/polyfills.ts`.
- **Standalone components**: `AppComponent` and `AngularFooterComponent` converted to standalone
  (Angular 19+ default). `AppModule` removed; `main.ts` updated to use `bootstrapApplication`
  with `provideAnimations()`.
- **tsconfig** targets updated: `target` ES2015→ES2022, `module` ES2020→ES2022,
  `moduleResolution` node→bundler. Added `angularCompilerOptions` with strict template checking.
- **`browserslist`** updated to target evergreen browsers only (Chrome, Firefox, Edge, Safari,
  iOS); removed obsolete entries that caused build warnings.
- **Lint tooling** migrated from deprecated `tslint` + `codelyzer` to ESLint 9 +
  `@angular-eslint`; new `eslint.config.js` (flat config) created.
- **Test coverage reporter** renamed from `karma-coverage-istanbul-reporter` to `karma-coverage`;
  `karma.conf.js` updated accordingly.

### Removed
- `src/app/app.module.ts` — superseded by standalone bootstrap.
- `tslint.json`, `codelyzer` — replaced by `eslint.config.js` and `@angular-eslint`.
- `protractor`, `@types/jasminewd2`, `jasmine-spec-reporter`, `ts-node` — Protractor was removed
  from the Angular ecosystem; e2e target removed from `angular.json`.
- `path` npm package — Node built-in, the npm shim was not needed.
- `enhanced-resolve` — unused transitive devDependency.
- `karma-coverage-istanbul-reporter` — renamed to `karma-coverage`.
- `src/test.ts` references from `tsconfig.spec.json` and `angular.json` — test bootstrap is now
  handled automatically by the karma builder.

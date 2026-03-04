# Change Log

## [Unreleased]

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

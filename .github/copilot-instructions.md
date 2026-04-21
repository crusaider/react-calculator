# React Calculator Copilot Instructions

Use these instructions when working anywhere in this repository.

## Project Goals

- Preserve calculator behavior and UI unless the task explicitly asks for a user-visible change.
- Prefer small, focused edits that fit the existing React, Redux, TypeScript, Vitest, Playwright, and Biome setup.
- Keep this repository easy for both humans and AI tools to validate quickly.

## Architecture Summary

- The application bootstraps in `src/index.tsx` and renders `CalculatorComponent` inside a Redux `Provider`.
- Redux state lives in `src/store` and currently has two slices:
  - `stack`: calculator stack values and key-driven calculator behavior.
  - `about`: visibility state for the About modal.
- The main UI is composed in `src/components/Calculator.component.tsx`.
- Browser service worker behavior is implemented in `src/serviceWorker.ts` and is expected to keep working in production builds.

Read `ARCHITECTURE.md` before making structural changes.

## File and Naming Conventions

- React component files use `PascalCase.component.tsx` naming.
- Redux actions, reducers, and state are organized by slice under `src/store/<slice>/`.
- Container components connect Redux to presentational components.
- Keep new files in the same folder pattern as existing code instead of introducing a parallel structure.

## Testing Expectations

- Every behavior change should include the smallest relevant test coverage.
- Prefer the narrowest test layer that proves the behavior:
  - reducer logic: unit tests under `src/store/**`
  - component rendering/wiring: component tests under `src/components/**`
  - reducer-driven workflows: integration tests under `src/integration/**`
  - real browser behavior: Playwright tests under `e2e/browser/**`
- Do not put reducer or integration tests in `e2e/`; that directory is reserved for Playwright browser tests.
- Read `TESTING.md` before adding or relocating tests.

## Required Commands

- Install dependencies: `npm ci`
- Start local dev server: `npm run dev`
- Run lint, typecheck, and unit/component/integration tests: `npm run verify`
- Run browser end-to-end tests: `npm run test:e2e`
- Build production assets: `npm run build`

Use the existing scripts from `package.json` instead of ad hoc commands when validating work.

## Editing Guidelines

- Keep changes minimal and consistent with the current code style.
- Use Biome-compatible formatting and import organization.
- Avoid broad refactors unless the task explicitly asks for them.
- Do not remove or weaken test coverage, CI checks, or service worker behavior without a clear request.
- Prefer updating documentation when repository workflows, architecture, or developer expectations change.

## Pull Request Expectations

- Summarize what changed and why.
- List the verification commands that were actually run.
- Call out browser-impacting or deployment-impacting changes.
- Note AI assistance when relevant so reviewers know how the change was produced.

See `CONTRIBUTING.md`, `ARCHITECTURE.md`, and `TESTING.md` for the repo’s shared working conventions.
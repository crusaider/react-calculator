# Testing Guide

## Commands

- `npm run verify`: Biome lint, TypeScript typecheck, and Vitest test run
- `npm run test:e2e`: Playwright browser tests
- `npm run test:coverage`: Vitest coverage run
- `npm run build`: production build, useful before browser or deployment-sensitive validation

Run `npm run verify` for normal code changes. Run `npm run test:e2e` whenever browser behavior, service worker behavior, or user interaction flow is affected.

## Test Layers

### Unit Tests

Use unit tests for reducer behavior, action-driven state changes, and service worker logic.

- Location: `src/store/**/*.test.ts`, `src/serviceWorker.test.ts`
- Preferred style: direct state transitions and explicit expectations

### Component Tests

Use component tests for rendering, prop behavior, and Redux-connected composition.

- Location: `src/components/**/*.test.tsx`
- Environment: `@vitest-environment jsdom` when DOM APIs are needed
- Preferred style: render the smallest component needed and assert visible output or dispatch behavior

### Integration Tests

Use integration tests for reducer-driven workflows that span multiple state transitions but do not need a real browser.

- Location: `src/integration/**/*.test.ts`
- Preferred style: start from initial state, dispatch realistic actions, assert final calculator state

### Browser E2E Tests

Use Playwright for browser-true behavior.

- Location: `e2e/browser/**/*.spec.ts`
- Runs against a production preview configured in `playwright.config.ts`
- Use this layer for real DOM interactions, modal behavior, service worker registration, or production-runtime checks

Do not place non-browser tests in `e2e/`.

## Naming and Structure

- Keep `describe` blocks focused on one component, slice, or workflow.
- Prefer behavior-oriented test names such as `renders only the latest three lines in original order`.
- Match the existing style in the repository rather than introducing a new test vocabulary.

## Change Guidance

- If a reducer changes, start with a reducer test.
- If a connected component changes, add or update a component test.
- If a workflow spans multiple actions, prefer an integration test.
- If the change depends on actual browser execution, add or update a Playwright test.

## Review Checklist

Before opening a PR, confirm the relevant commands for the change were run.

- Normal code change: `npm run verify`
- Browser-affecting change: `npm run verify` and `npm run test:e2e`
- Deployment-sensitive or asset-path change: `npm run build`
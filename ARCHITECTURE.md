# Architecture

## Overview

React Calculator is a small React + Redux application that emulates an RPN-style calculator. The current codebase is intentionally simple: state changes flow through Redux reducers, UI components render directly from store-backed props, and browser-only behavior is covered separately through Playwright and service worker tests.

The main runtime entry point is `src/index.tsx`. It creates the Redux store from the root reducer in `src/store/index.ts`, mounts the React tree with `createRoot`, and registers the service worker for production behavior.

## Component Structure

The top-level UI is assembled in `src/components/Calculator.component.tsx`.

- `CalculatorComponent` composes the calculator shell, header, display, keyboard, and about modal.
- `DisplayContainer.component.tsx` connects Redux stack state to presentational display components.
- `KeyboardContainer.component.ts` dispatches key actions into the Redux store.
- `AboutContainer.component.ts` connects the About modal to the `about` slice.

Presentational components live alongside their CSS and should stay dumb when possible. Container components are the preferred place for Redux wiring.

## State Model

Redux state is intentionally small and split into two slices.

- `stack`: stored in `src/store/stack/`
  - owns calculator stack values
  - handles numeric input, decimal input, enter, drop, sign switching, and arithmetic operators
- `about`: stored in `src/store/about/`
  - owns the visibility state for the About modal

The root reducer is created in `src/store/index.ts` with `combineReducers` and exported as the application store shape.

## Data Flow

User interactions originate from keyboard button clicks.

1. A keyboard component dispatches an action.
2. A reducer updates Redux state.
3. Connected container components receive updated props.
4. Presentational components re-render the visible calculator output.

This flow is intentionally direct. Prefer preserving it rather than introducing extra abstraction layers for a small app.

## Test Layers

The repository uses four distinct test layers.

- Unit tests verify reducers and isolated logic in `src/store/**` and `src/serviceWorker.test.ts`.
- Component tests verify rendering and Redux wiring in `src/components/**`.
- Integration tests in `src/integration/**` exercise reducer-driven workflows without a real browser.
- Browser E2E tests in `e2e/browser/**` verify real user behavior with Playwright against a production preview build.

When changing behavior, add the smallest test that proves the change at the appropriate layer. Use browser E2E only for behavior that depends on the DOM, browser APIs, or real navigation/runtime behavior.

## Operational Constraints

- Keep UI and calculator behavior stable unless a task explicitly changes requirements.
- Treat service worker behavior as part of the runtime contract.
- Use the existing scripts in `package.json` and the devcontainer setup as the source of truth for local and CI workflows.
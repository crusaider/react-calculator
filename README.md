# React Calculator

A React / Redux based app mimicking a fictitious HP calculator (RPN).
( Sorry HP if you see this as a copyright infringement, I would rather like
to se it as a tribute to the HP calculators of the 60s, 70s and 80s)

This project uses Vite + React + TypeScript.

## Dev Container

The repository includes a dev container configuration in [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json).

It is configured for Node 20.

For local development, editor configs are in `.editorconfig`, Husky pre-commit hooks run `npm run verify`, and `.gitignore` excludes IDE, OS, and npm artifacts.

When the container is created it runs:

### `npm ci && npx playwright install chromium`

This installs project dependencies and Playwright browser binaries for E2E tests.

After opening the project in the container, run:

### `npm run dev`

The app will be available on port 3000, which is forwarded by the container configuration.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `npm test`

Runs Vitest in watch mode.

### `npm run test:ci`

Runs all unit/component/integration tests once.

### `npm run test:e2e`

Runs Playwright browser E2E tests.

### `npm run verify`

Runs lint, typecheck, and test:ci.

### `npm run lint`

Runs Biome lint checks.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Serves the production build locally.

### `npm run predeploy && npm run deploy`

Builds the app in production mode, commits it to the `gh-pages` branch
and pushes the branch. This updates the app on the GitHub Pages site
of the repo.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

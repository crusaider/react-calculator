# React Calculator

A React / Redux based app mimicking a fictitious HP calculator (RPN).
( Sorry HP if you see this as a copyright infringement, I would rather like
to se it as a tribute to the HP calculators of the 60s, 70s and 80s)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dev Container

The repository includes a dev container configuration in [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json).

It is pinned to Node 16 because the current Create React App toolchain is old enough that newer Node/npm combinations are more likely to fail during install or runtime.

For local non-container development, use Node 16 as well (see `.nvmrc`).

When the container is created it runs:

### `npm ci --legacy-peer-deps`

This keeps the current app installable without changing application behavior.

After opening the project in the container, run:

### `npm start`

The app will be available on port 3000, which is forwarded by the container configuration.

## CI

The repository includes a GitHub Actions workflow at `.github/workflows/ci.yml`.

It runs on push and pull requests, and executes:

- `npm ci --legacy-peer-deps`
- `npm run verify`
- `npm run build`

It also cancels older in-progress runs for the same branch when a newer commit is pushed.
It can also be started manually via GitHub Actions (`workflow_dispatch`).

Dependency updates are automated with Dependabot via `.github/dependabot.yml`.
A dependency review workflow at `.github/workflows/dependency-review.yml` runs on pull requests.
A pull request template at `.github/pull_request_template.md` standardizes verification checklists.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:ci`

Runs tests once in non-interactive mode (CI-friendly).<br />
Use this in automation or when you want a deterministic local test run.

### `npm run typecheck`

Runs TypeScript type checking without emitting output files.<br />
Use this for a fast static safety check during development and in CI.

### `npm run verify`

Runs both typecheck and CI test commands in sequence.<br />
Use this as a quick pre-push confidence check.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run predeploy && npm run deploy`

Builds the app in production mode, commits it to the `gh-pages`branch
and pushes the branch. This updated the app on the github pages site
of the repo.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

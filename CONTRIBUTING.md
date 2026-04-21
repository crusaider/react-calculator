# Contributing to React Calculator

Thanks for your interest in contributing!

## Development Setup

1. Clone the repository
2. Install Node 24+ (see `package.json` engines)
3. Run `npm ci`
4. Create a feature branch from `master`

Read `ARCHITECTURE.md` for the application structure and `TESTING.md` for test-layer expectations before making structural or behavior changes.

## Before Committing

Run `npm run verify` locally to ensure your changes pass all checks:
- Biome lint checks
- TypeScript type checking
- Unit tests

For browser E2E coverage, also run `npm run test:e2e`.

Husky git hooks will automatically run this pre-commit anyway, but running it early saves time.

## Commits

- Keep commits small and focused
- Each commit should be potentially shippable
- Use clear, descriptive commit messages
- Prefix with type: `feat:`, `fix:`, `chore:`, `docs:`, `ci:`, etc.

Example: `feat: add calculator memory stack`

## Pull Requests

- Use the pull request template (auto-filled)
- Verify the PR template checklist:
  - [ ] `npm run verify` passes
  - [ ] `npm run test:e2e` passes
  - [ ] `npm run build` succeeds
- Link related issues if available

## Questions?

See README.md for available scripts and project structure.

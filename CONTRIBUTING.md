# Contributing to React Calculator

Thanks for your interest in contributing!

## Development Setup

1. Clone the repository
2. Install Node 16 (see `.nvmrc`)
3. Run `npm ci --legacy-peer-deps`
4. Create a feature branch from `master`

## Before Committing

Run `npm run verify` locally to ensure your changes pass all checks:
- TypeScript type checking
- Unit tests
- ESLint rules

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
  - [ ] `npm run build` succeeds
- Link related issues if available

## Questions?

See README.md for available scripts and project structure.

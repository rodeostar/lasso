# Contributing to Lasso

## Development setup

```bash
git clone https://github.com/rodeostar/lasso.git
cd lasso
npm install
cd lib && npm run build
cd ../example && npm install
cd ../lib && npm run dev
```

## Scripts

- **lib**: `npm run build`, `npm run dev`, `npm run test`, `npm run lint`
- **Root**: `npm run build`, `npm run test` (workspaces)

## Code style

- **Biome** for format and lint in `lib/`. Run `npm run lint` in `lib`.
- **TypeScript** strict mode; avoid `any`.

## Tests

- Unit and integration tests live next to source (`*.test.ts`, `*.integration.test.ts`).
- Run: `cd lib && npm run test`.

## Pull requests

1. Branch from `main`.
2. Add or update tests as needed.
3. Ensure `npm run build` and `npm run test` pass in `lib`.
4. Update CHANGELOG.md for user-facing changes.

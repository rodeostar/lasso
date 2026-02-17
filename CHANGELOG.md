# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-02-17

### Added

- **Strict TypeScript** – `strict: true`, removed `any`, proper generics across blockdom and framework.
- **Error boundaries** – `setGlobalErrorHandler()`, fallback UI on mount errors, try/catch in mount and patch.
- **Hydration** – `renderToStringWithState()`, `hydrate()`, `window.__LASSO_STATE__`, and `hydrationState` in document options.
- **Context stack** – `VirtualComponentContext` is now a stack (`push`/`pop`) for nested components.
- **Store cleanup** – `Store.unsubscribe()`, components unsubscribe on unmount; `scheduleRendering` used for batched updates.
- **useState** – Sync and async setters with error handling; getter/setter API.
- **map()** – Optional `keyFn` and dev warning for duplicate keys.
- **Source maps** – Enabled in development builds (esbuild).
- **CLI** – `lasso create` alias for `lasso --init`.
- **HMR** – Fixed WebSocket port (3333) in client script.
- **Tests** – Vitest, unit tests (blockdom, store, style), integration tests (render, SSR).
- **Lint/format** – Biome config in `lib/`.
- **Docs** – README with API reference, config, and ODD evaluation in `docs/ODD_EVALUATION.md`.

### Changed

- Monorepo with `package.json` workspaces (lib + example).
- Dependencies updated (esbuild, fastify, jsdom, TypeScript, etc.).
- `lib/package.json` version set to 2.0.0.

### Fixed

- Store subscription memory leak (unsubscribe on unmount).
- PendingRenderings cleanup on component removal.
- Effect cleanup on unmount; effects array cleared in beforeRemove.

## [1.0.6] - 2022

- Initial public release (blockdom, SSR, file-based routing, Store, hooks).

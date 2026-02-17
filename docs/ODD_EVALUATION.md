# Lasso and ODD (Observe Decide Do)

## Fit evaluation

- **Component model**: Functional components with hooks and a Redux-like Store fit dashboard UIs and state-heavy flows. Lasso’s `useState` / `useEffect` and `Store` + `connect()` are enough for local and global state.
- **Real-time / WebSocket**: The framework does not ship a WebSocket hook. For ODD, real-time updates can be handled by:
  - A custom `useEffect` that opens a WebSocket and pushes updates into a `Store` or local `useState`.
  - A small primitive (e.g. `useWebSocket(url, onMessage)`) that could live in an ODD-specific package or in lasso as an optional add-on.
- **SSR + hydration**: `renderToStringWithState` and `hydrate()` with `window.__LASSO_STATE__` support server-rendered HTML and client handoff. Good for SEO and first-load; ODD dashboards can opt out of SSR for private tools.
- **File-based routing and API routes**: Fastify + file-based pages and `api/*` handlers are a good fit for back-office or internal tools (ODD included).

**Conclusion**: Lasso is a good fit for ODD’s frontend. No required ODD-specific primitives in core; a `useWebSocket` (or similar) can be added when an ODD app needs it, either in this repo or in an `odd-ui` / app package.

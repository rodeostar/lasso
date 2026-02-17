# Lasso

A minimal TypeScript framework with [blockdom](https://github.com/ged-odoo/blockdom) virtual DOM, SSR, file-based routing, and React-like hooks.

**Requirements:** Node 18+

## Quick start

```bash
mkdir my-app && cd my-app
npx @rodeostar/lasso --init
npm install
npm run dev
```

Open **http://localhost:8585**. With `--watch`, HMR uses a WebSocket on port **3333** (must be free).

## CLI

| Option   | Description                                      |
|----------|--------------------------------------------------|
| `--init` | Scaffold a new app in the current directory      |
| `--watch`| Start dev server with HMR (WebSocket on 3333)   |

Run the CLI from your **app directory** so `process.cwd()` is the app (e.g. `example/` or an inited project).

## Features

- **Blockdom virtual DOM** – block-based diffing; version-pinned, minimal surface
- **Server-side rendering** – SEO-friendly HTML
- **Client routing** – SPA navigation without full reloads
- **File-based routing** – `src/pages/*.ts` → routes, `src/api/**/*.ts` → API routes
- **Template literals** – `html\`<div>...</div>\`` with Tailwind-style `css()`
- **Hooks** – `useState`, `useEffect`, and a Redux-like `Store`
- **Error boundaries** – optional global handler and fallback UI
- **Hydration** – `window.__LASSO_STATE__` and `hydrate()` for SSR → client handoff

## Project layout

```
lasso.config.json    # App config (required)
src/
  pages/              # One default export per file → route
    index.ts         # GET /
    about.ts         # GET /about
  api/               # One default handler per file → /api/*
    hello.ts         # GET /api/hello
    todos/[id].ts    # GET /api/todos/:id
.lasso/              # Generated (dist, assets); do not edit
```

## Page component

```ts
// src/pages/index.ts
import type { FC } from "@rodeostar/lasso";

const Home: FC = () => {
  return ({ html, css }) =>
    html`<div class=${css("font-serif")}>Hello</div>`;
};

export default Home;

export const __Page = {
  head: { title: "Home" },
};
```

## API route

```ts
// src/api/hello.ts
import type { Handler } from "@rodeostar/lasso";

const handler: Handler = (server, route) => {
  server.get(route, (_, reply) => reply.send({ hello: "world" }));
};
export default handler;
```

## Framework API

### Components and rendering

- **`FC<T>`** – Functional component type. `(props?: T) => (tools: DOMTools<T>) => VNode`.
- **`render(Comp, target)`** – Mount a component on a DOM element (client).
- **`hydrate(Comp, target)`** – Same as render; uses `window.__LASSO_STATE__` when present (e.g. after SSR).
- **`renderToString(Comp)`** – Return HTML string (SSR).
- **`renderToStringWithState(Comp)`** – Return `{ html, state }` for SSR + hydration state.

### Hooks and state

- **`useState<T>(initial)`** – Returns `[getValue, setValue]`. Setter accepts `T` or `() => Promise<T>`.
- **`useEffect(effect, deps[])`** – Run side effects; deps array of getter functions. Cleanup supported.
- **`Store<State, Actions>`** – Global store. `new Store(initialState, { actionName: (state) => newState })`. Use `connect(store)` in render to subscribe; `store.state()`, `store.dispatch("actionName")`.

### Styling and helpers

- **`css(...entries)`** – Class string or conditional object, e.g. `css("p-2", { "text-red": isError })`. Server plugin generates CSS (Twind by default; Tailwind 4 or UnoCSS via custom plugin).
- **`map(list, fn)`** – Render lists with keys.
- **`stateless(Comp)`** – Client-only render helper.
- **`enableJS(Comp)`** – Enable JS for a subtree.

### Error handling

- **`setGlobalErrorHandler(handler)`** – Set `(error, component) => void`. Called when a component throws in mount/patch.
- **`globalErrorHandler`** – Current handler or null.

### Types

- **`Handler`** – `(server: FastifyInstance, route: string) => void`.
- **`LibConfig`** – App config (appDir, routing, css, mode, global.scripts/styles, etc.).
- **`DOMTools<T>`** – `{ html, css, props, vnode, connect }` passed into render functions.

## Configuring Lasso

`lasso.config.json` (created by `--init`):

```json
{
  "appDir": "./src",
  "routing": true,
  "css": null,
  "mode": "development",
  "global": {
    "styles": [],
    "scripts": []
  }
}
```

- **appDir** – Root for `pages/` and `api/` (default `./src`).
- **routing** – Enable client-side SPA routing.
- **css** – Twind config object or null.
- **global.styles / scripts** – Extra stylesheet/script URLs included on every page.

## Monorepo scripts

From repo root:

| Script   | Description |
|----------|--------------|
| `npm run build` | Build the library (`lib/`) |
| `npm run dev`   | Run lasso dev (uses `lib` workspace) |
| `npm run start` | Run lasso once (no watch) |
| `npm run test`  | Run tests in all workspaces |
| `npm run lint`  | Run Biome in all workspaces |

**Run from source (no publish):** build the lib, then from an app directory (e.g. `example/`) run:

```bash
cd lib && npm run build && cd ../example
node ../lib/dist/server/index.js          # HTTP on 8585
node ../lib/dist/server/index.js --watch  # + HMR on 3333
```

## License

MIT

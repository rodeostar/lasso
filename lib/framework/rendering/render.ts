import { VComponent } from "../internal/component";
import type { FC } from "../types";
import type { HydrationState } from "./render.string";

declare global {
  interface Window {
    __LASSO_STATE__?: HydrationState;
  }
}

/**
 * Mount a component on a DOM element. Use for client-side only rendering.
 * @param Comp - Functional component.
 * @param target - Container element.
 */
export async function render<T>(Comp: FC<T>, target: HTMLElement): Promise<void> {
  const vnode = new VComponent(Comp);
  await vnode.mount(target);
}

/**
 * Hydrate a component after SSR. Injects state from window.__LASSO_STATE__ when present.
 * @param Comp - Root component (same as used in renderToStringWithState).
 * @param target - Element that will contain the app (e.g. document.querySelector('app-root')).
 */
export async function hydrate<T>(
  Comp: FC<T>,
  target: HTMLElement
): Promise<void> {
  if (typeof window !== "undefined" && window.__LASSO_STATE__) {
    target.innerHTML = "";
  }
  await render(Comp, target);
}

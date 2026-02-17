import { render } from "./render";
import type { FC } from "../types";

/** Hydration state shape (extend for app-specific state). */
export type HydrationState = Record<string, unknown>;

/** Render a component tree and return HTML plus serializable state for hydration. */
export async function renderToStringWithState<T>(
  Comp: FC<T>
): Promise<{ html: string; state: HydrationState }> {
  await render(Comp, document.body);
  const html = document.body.innerHTML.toString();
  document.body.innerHTML = "";
  /** State can be extended later (e.g. per-component useState snapshot). */
  const state: HydrationState = {};
  return { html, state };
}

/** Render a component tree and give back its string form, for SSR */
export async function renderToString<T>(Comp: FC<T>): Promise<string> {
  const { html } = await renderToStringWithState(Comp);
  return html;
}

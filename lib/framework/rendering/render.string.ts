import { render } from "./render";
import type { FC } from "../types";
import { StylesCache } from "../context";

/** Render a component tree and give back its string form, for SSR */
export async function renderToString<T>(Comp: FC<T>) {
  /** Render the component in the node virtual document */
  await render(Comp, document.body);

  /** Grab the document's html */
  const html = document.body.innerHTML.toString();

  /** Reset the virtual document's html */
  document.body.innerHTML = "";

  /** Return styles and html */
  return {
    html,
    cssCache: StylesCache,
  };
}

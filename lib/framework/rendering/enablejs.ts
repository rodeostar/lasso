import type { FC } from "../types";
import { clientOnly } from "../util";
import { render } from "../rendering";

/** Pages are static by default, this helper enables CSR. */
export function enableJS<T>(component: FC<T>) {
  clientOnly(() => {
    const root = document.querySelector<HTMLElement>("app-root");
    root.innerHTML = "";
    render(component, root);
  });

  /** Return the base component for the server context */
  return component;
}

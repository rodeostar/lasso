import { VComponent } from "../internal/component";
import type { FC } from "../types";

/** Render a Component and mount it to the DOM */
export async function render<T>(Comp: FC<T>, target: HTMLElement) {
  const vnode = new VComponent(Comp);
  await vnode.mount(target);
}

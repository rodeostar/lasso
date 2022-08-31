import type { FC } from "../../types";
import { VComponent } from "../../internal/component/vcomponent";

/** Utility to render a subcomponent in an HTML directive tree */
export function component<T>(C: FC<T>, props?: T) {
  return new VComponent<T>(C, props);
}

export * from "./tools";
export * from "./vcomponent";

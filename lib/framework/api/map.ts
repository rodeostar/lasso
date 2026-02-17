import { list, withKey } from "../../blockdom";
import { component } from "../internal/component";
import type { FC } from "../types";

const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production";

/**
 * Render a list of items as components. In dev, warns on duplicate keys if keyFn is used.
 * @param Component - Component to render for each item.
 * @param values - Array of props per item.
 * @param keyFn - Optional (value, index) => key for list reconciliation. Duplicate keys warn in dev.
 */
export function map<T>(Component: FC<T>, values: T[], keyFn?: (value: T, index: number) => string | number) {
  const arr = values ?? [];
  const nodes = keyFn
    ? arr.map((value, i) => {
        const key = keyFn(value, i);
        if (isDev) {
          const dup = arr.findIndex((v, j) => j !== i && keyFn(v, j) === key);
          if (dup >= 0) {
            console.warn(`[lasso] map: duplicate key "${key}" at indices ${i} and ${dup}`);
          }
        }
        return withKey(component(Component, value), key);
      })
    : arr.map((value) => component(Component, value));
  return list(nodes as import("../../blockdom").VNode[]);
}

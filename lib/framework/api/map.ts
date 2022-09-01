import { list } from "../../blockdom";
import { component } from "../internal/component";
import type { FC } from "../types";

/** Helper to map components to set an array of props */
export function map<T>(Component: FC<T>, values: T[]) {
  return list(
    (values || []).map((value) => {
      return component(Component, value);
    })
  );
}

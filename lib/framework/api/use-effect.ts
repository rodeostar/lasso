import type { SideEffect, Deps } from "../types";
import { Effect } from "../api/effect";
import { clientOnly } from "../util";
import { VirtualComponentContext } from "../context";

/** Push effects to the current virtual component */
export function useEffect<T = SideEffect>(
  effect: SideEffect,
  depsFn: Deps<T>[]
) {
  clientOnly(() => {
    VirtualComponentContext.current.effects.push(new Effect(effect, depsFn));
  });
}

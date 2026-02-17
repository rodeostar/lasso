import type { SideEffect, Deps } from "../types";
import { Effect } from "../api/effect";
import { clientOnly } from "../util";
import { VirtualComponentContext } from "../context";

/**
 * Register a side effect that runs after render. Re-runs when dependency getters change.
 * @param effect - Async or sync function; may return a cleanup function.
 * @param depsFn - Array of getter functions; effect re-runs when their values change.
 * @example
 * useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, [() => props.id]);
 */
export function useEffect<T = SideEffect>(
  effect: SideEffect,
  depsFn: Deps<T>[]
) {
  clientOnly(() => {
    const cur = VirtualComponentContext.current;
    if (cur) cur.effects.push(new Effect(effect, depsFn) as Effect<Record<string, never>>);
  });
}

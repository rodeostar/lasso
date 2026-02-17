import type { StateDispatch } from "../types";
import { VirtualComponentContext, globalErrorHandler } from "../context";
import { clientOnly } from "../util";
import { scheduleRendering } from "../internal";

/**
 * React-like local state for a component.
 * @param initialValue - Initial state value.
 * @returns Tuple of [getter, setter]. Setter accepts a value or () => Promise<T>.
 * @example
 * const [count, setCount] = useState(0);
 * setCount(count() + 1);
 * setCount(async () => fetchCount());
 */
export function useState<T>(initialValue: T): StateDispatch<T> {
  let value = initialValue;
  const vnode = VirtualComponentContext.current;

  const setState = (updater: T | (() => Promise<T>)) => {
    const run = async () => {
      try {
        value = typeof updater === "function" ? await (updater as () => Promise<T>)() : updater;
        clientOnly(() => scheduleRendering(vnode!));
      } catch (err) {
        if (globalErrorHandler && vnode) {
          try {
            globalErrorHandler(err, vnode as import("../types").VComponent<unknown>);
          } catch (_) {
            /* ignore */
          }
        }
      }
    };
    void run();
  };

  return [() => value, setState];
}

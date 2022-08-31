import type { StateDispatch } from "../types";
import { VirtualComponentContext } from "../context";
import { clientOnly } from "../util";
import { scheduleRendering } from "../internal";

/** Utility to manage state within a component */
export function useState<T>(value: T): StateDispatch<T> {
  const vnode = VirtualComponentContext.current;

  /** Sync/Async state */
  const setStateAsync = async (updater: T | (() => Promise<T>)) => {
    /** Check if the value is static or a method */
    value = updater instanceof Function ? await updater() : updater;

    /** On the client, requestAnimationFrames */
    clientOnly(() => scheduleRendering(vnode));
  };

  return [() => value, setStateAsync];
}

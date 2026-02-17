import { describe, it, expect } from "vitest";
import { Store } from "./store";
import { VComponent } from "../internal/component";
import type { FC } from "../types";
import { text } from "../../blockdom/text";

describe("Store", () => {
  it("holds initial state and returns it from state()", () => {
    const store = new Store(42, {});
    expect(store.state()).toBe(42);
  });

  it("updates state when dispatch is called with an action", () => {
    type A = "inc" | "reset";
    const store = new Store<number, A>(0, {
      inc: (s) => s + 1,
      reset: () => 0,
    });
    store.dispatch("inc");
    expect(store.state()).toBe(1);
    store.dispatch("inc");
    expect(store.state()).toBe(2);
    store.dispatch("reset");
    expect(store.state()).toBe(0);
  });

  it("unsubscribe removes component from subscriptions", () => {
    const store = new Store(0, {});
    const Comp: FC = () => () => text("");
    const vnode = new VComponent(Comp);
    const v = vnode as import("../internal/component").VComponent<unknown>;
    store.subscribe(v);
    expect(store.subscriptions).toHaveLength(1);
    store.unsubscribe(v);
    expect(store.subscriptions).toHaveLength(0);
  });
});

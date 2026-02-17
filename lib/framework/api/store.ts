import type { VComponent } from "../internal";
import { FC } from "../types";
import { scheduleRendering } from "../internal/schedule";

export interface Stateful<S, A> {
  state: () => S;
  dispatch: (action: A) => void;
}

export type FCS<T, S, A> = FC<T & Stateful<S, A>>;

type VComponentAny = VComponent<unknown>;

/**
 * Global state store with named actions. Subscribe in components via connect(store).
 * Subscriptions are cleared on component unmount.
 */
export class Store<State, Actions extends string> {
  internalState: State;
  events: Record<string, (state: State) => State> = {};
  subscriptions: VComponentAny[] = [];

  constructor(
    state: State,
    callbacks: Record<Actions, (state: State) => State>
  ) {
    this.internalState = state;
    this.events = callbacks;
  }

  state() {
    return this.internalState;
  }

  dispatch(action: Actions, cb?: (state: State) => State) {
    const compute = cb ?? ((state: State) => state);

    if (action in this.events) {
      this.internalState = this.events[action].call(
        this,
        compute(this.internalState)
      ) as State;

      for (const subscription of this.subscriptions) {
        if (subscription && !subscription.isDestroyed) {
          scheduleRendering(subscription);
        }
      }
    }
  }

  subscribe(vnode: VComponentAny) {
    this.subscriptions.push(vnode);
    return this;
  }

  /** Remove a component from subscriptions (call from component beforeRemove). */
  unsubscribe(vnode: VComponentAny) {
    this.subscriptions = this.subscriptions.filter((s) => s !== vnode);
  }
}

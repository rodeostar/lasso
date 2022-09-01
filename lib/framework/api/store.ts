import { VComponent } from "../internal";
import { FC } from "../types";

export interface Stateful<S, A> {
  state: () => S;
  dispatch: (action: A) => void;
}

export type FCS<T, S, A> = FC<T & Stateful<S, A>>;

export class Store<State, Actions extends string> {
  internalState: State;
  events: Record<string, (state: State) => State> = {};
  subscriptions: VComponent[];

  constructor(
    state: State,
    callbacks: Record<Actions, (state: State) => State>
  ) {
    this.internalState = state;
    this.events = callbacks;
    this.subscriptions = [];
  }

  state() {
    return this.internalState;
  }

  async dispatch(action: Actions, cb?: (state: State) => State) {
    const compute = cb || ((state: State) => state);

    if (action in this.events) {
      this.internalState = await this.events[action].call(
        this,
        compute(this.internalState)
      );

      for (const subscription of this.subscriptions) {
        if (subscription) {
          await subscription.patch();
        }
      }
    }
  }

  subscribe(vnode: VComponent) {
    this.subscriptions.push(vnode);
    return this;
  }
}

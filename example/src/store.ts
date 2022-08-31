import { Store } from "lasso";

export type Actions = "increment" | "decrement";

export const appStorage = new Store<number, Actions>(0, {
  increment(prevState) {
    return prevState + 1;
  },
  decrement(prevState) {
    return prevState - 1;
  },
});

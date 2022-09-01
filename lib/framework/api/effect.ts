import type { SideEffect, Deps, SideEffectResult } from "../types";

/** Fire a user provided callback when a set of dependencies update  */
export class Effect<T> {
  /** Side effect provided by the user */
  fn: SideEffect;

  /** Dependencies provided by the user, an array of methods */
  depsFn: Deps<T>[];

  /** Run the dependencies function */
  getDeps: () => T[];

  /** Stores the return contents of the deps functions */
  deps: (Promise<T> | T)[];

  /** Cleanup after effect completion */
  cleanup: SideEffectResult;

  constructor(effect: SideEffect, depsFn: Deps<T>[]) {
    this.fn = effect;
    this.depsFn = depsFn;
    this.getDeps = () => depsFn.map((fn) => fn());
    this.deps = this.getDeps();
    this.perform();
  }

  checkDirty() {
    /** Get the latest deps */
    const nextDeps = this.getDeps();

    /** Check for mismatches */
    const isDirty = nextDeps.some((val, i) => val !== this.deps[i]);

    /** If mismatch found, update the deps */
    if (isDirty) {
      this.deps = nextDeps;

      /** Cleanup once deps are equal */
      if (typeof this.cleanup === "function") {
        this.cleanup();
      }
    }

    return isDirty;
  }

  /** A user effect returns a cleanup function, if not default to a no_op */
  async perform() {
    this.cleanup = await this.fn();
  }
}

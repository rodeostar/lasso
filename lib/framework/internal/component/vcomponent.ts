import type { VNode, FC, FCInstance, VXNode } from "../../types";
import type { Effect } from "../../api";
import { VirtualComponentContext } from "../../context";
import { getDomTools } from "../../internal/component";

/** Virtual component, that manages the blockdom internals for a component */
export class VComponent<T = {}> {
  /** Component to render */
  C: FC<T>;

  /** Inner function that renders the Virtual node */
  instance: FCInstance<T>;

  /** Props passed in via the user's component type */
  props: T;

  /** Blockdom virtual node instance */
  node: VNode;

  /** Track if the node exists */
  isDestroyed: boolean;

  /** Track if the virtual node is the parent in the dom tree */
  isParent: boolean;

  /** User provided side effects, via useEffect */
  effects: Effect<T>[];

  constructor(C: FC<T>, props?: T) {
    this.C = C;
    this.instance = null;
    this.props = props;
    this.isDestroyed = false;
    this.isParent = false;
    this.effects = [];
  }

  /** Mounts the VNode to the provided parent, and perform side effects. */
  async mount(parent: HTMLElement, afterNode?: HTMLElement) {
    /** Update the global VirtualComponentContext.current state */
    VirtualComponentContext.current = this;

    /** Create a functional component instance */
    this.instance = this.C();

    /** Attach the returned virtual node */
    this.node = this.instance(getDomTools(this));

    /** Mount the node to the parent dom element */
    this.node.mount(parent, afterNode);

    /** Loop through and perform side effects */
    for (const effect of this.effects) {
      await effect.perform();
    }

    /** Check if the target node is the current, if not set isParent */
    this.isParent = VirtualComponentContext.current !== this;
  }

  /** Given two virtual nodes, move one before the other */
  moveBefore(other: VXNode | null, afterNode: Node | null) {
    this.node.moveBefore(other ? other.node : null, afterNode);
  }

  /** Patch the DOM to apply updates, considering side effects */
  async patch(other?: VComponent<T>) {
    const instance = other?.props ? this.C(other.props) : this.instance;
    if (!this.isDestroyed) {
      const current = VirtualComponentContext.current;
      const dirtyEffects = this.effects.filter((e) => e.checkDirty());

      /** Run the effects */
      for (const effect of dirtyEffects) await effect.perform();

      /** Rerun template compilation */
      this.node.patch(instance(getDomTools(other)), this.isParent);

      /** Reset parent status */
      this.isParent =
        this.isParent || current === VirtualComponentContext.current;
    }
  }

  /** Preflight steps for vnode removal */
  beforeRemove() {
    /** Cleanup effects before the removal of virtual node */
    for (const effect of this.effects) {
      if (typeof effect.cleanup === "function") {
        effect.cleanup();
      }
    }

    /** Rerun, shouldn't cause memory leak as the node in question should no longer exist */
    this.node.beforeRemove();

    /** Mark as destroyed */
    this.isDestroyed = true;
  }

  /** Remove the VComponent virtual node */
  remove() {
    this.node.remove();
  }

  /** Retrieve the first child of a virtual node */
  firstNode() {
    return this.node.firstNode();
  }
}

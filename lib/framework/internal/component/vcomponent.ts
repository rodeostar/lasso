import type { VNode, FC, FCInstance, VXNode } from "../../types";
import type { Effect } from "../../api";
import { VirtualComponentContext, globalErrorHandler, PendingRenderings } from "../../context";
import { getDomTools } from "../../internal/component";
import { html } from "../../../blockdom/html";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Virtual component, that manages the blockdom internals for a component */
export class VComponent<T = Record<string, never>> {
  /** Component to render */
  C: FC<T>;

  /** Inner function that renders the Virtual node */
  instance: FCInstance<T> | null;

  /** Props passed in via the user's component type */
  props: T;

  /** Blockdom virtual node instance */
  node: VNode | null;

  /** Track if the node exists */
  isDestroyed: boolean;

  /** Track if the virtual node is the parent in the dom tree */
  isParent: boolean;

  /** User provided side effects, via useEffect */
  effects: Effect<T>[];

  /** Stores this component is connected to (for unsubscribe on unmount). */
  stores: Array<{ unsubscribe: (v: VComponent<unknown>) => void }> = [];

  constructor(C: FC<T>, props?: T) {
    this.C = C;
    this.instance = null;
    this.props = (props ?? {}) as T;
    this.node = null;
    this.isDestroyed = false;
    this.isParent = false;
    this.effects = [];
  }

  /** Mounts the VNode to the provided parent, and perform side effects. */
  async mount(parent: HTMLElement, afterNode?: HTMLElement) {
    VirtualComponentContext.push(this as VComponent<unknown>);
    try {
      this.instance = this.C(this.props);
      this.node = this.instance!(getDomTools(this));
      this.node!.mount(parent, afterNode ?? null);
      for (const effect of this.effects) {
        await effect.perform();
      }
    } catch (err) {
      this.handleError(err);
      const message = err instanceof Error ? err.message : String(err);
      this.node = html(`<div class="lasso-error" data-lasso-error="true">${escapeHtml(message)}</div>`);
      this.node.mount(parent, afterNode ?? null);
    } finally {
      VirtualComponentContext.pop();
    }
    this.isParent = VirtualComponentContext.current !== this;
  }

  private handleError(err: unknown): void {
    if (globalErrorHandler) {
      try {
        globalErrorHandler(err, this as unknown as VComponent<unknown>);
      } catch (_) {
        /* ignore handler errors */
      }
    }
  }

  /** Given two virtual nodes, move one before the other */
  moveBefore(other: VXNode | null, afterNode: Node | null) {
    this.node!.moveBefore(other ? (other as { node: VNode }).node : null, afterNode);
  }

  /** Patch the DOM to apply updates, considering side effects */
  async patch(other?: VComponent<T>) {
    if (this.isDestroyed || !this.node) return;
    VirtualComponentContext.push(this as VComponent<unknown>);
    const current = VirtualComponentContext.current;
    try {
      const instance = other !== undefined ? this.C(other.props) : this.instance!;
      const dirtyEffects = this.effects.filter((e) => e.checkDirty());
      for (const effect of dirtyEffects) await effect.perform();
      const nextNode = instance(getDomTools(other ?? this));
      this.node.patch(nextNode, this.isParent);
    } catch (err) {
      this.handleError(err);
      /* Leave previous frame visible; no fallback UI during patch to avoid type mismatch */
    } finally {
      VirtualComponentContext.pop();
    }
    this.isParent = this.isParent || current === VirtualComponentContext.current;
  }

  /** Preflight steps for vnode removal */
  beforeRemove() {
    for (const effect of this.effects) {
      if (typeof effect.cleanup === "function") {
        effect.cleanup();
      }
    }
    this.effects = [];

    const self = this as unknown as VComponent<unknown>;
    for (const store of this.stores) {
      store.unsubscribe(self);
    }
    this.stores = [];

    PendingRenderings.delete(self);
    this.node!.beforeRemove();
    this.isDestroyed = true;
  }

  /** Remove the VComponent virtual node */
  remove() {
    this.node!.remove();
  }

  /** Retrieve the first child of a virtual node */
  firstNode(): Node | undefined {
    return this.node!.firstNode();
  }
}

export { config } from "./config";

export { toggler } from "./toggler";
export { createBlock } from "./block_compiler";
export { list } from "./list";
export { multi } from "./multi";
export { text, comment } from "./text";
export { html } from "./html";

export interface VNode<T = unknown> {
  mount(parent: HTMLElement, afterNode: Node | null): void;
  moveBefore(other: T | null, afterNode: Node | null): void;
  patch(other: T, withBeforeRemove: boolean): void;
  beforeRemove(): void;
  remove(): void;
  firstNode(): Node | undefined;
  el?: Node | undefined;
  parentEl?: HTMLElement | undefined;
  isOnlyChild?: boolean | undefined;
  key?: string | number | undefined;
  memo?: VNode<T>[];
  node?: VNode<T>;
}

export type BDom = VNode<unknown>;

export function mount(
  vnode: VNode,
  fixture: HTMLElement,
  afterNode: Node | null = null
) {
  vnode.mount(fixture, afterNode);
}

export function patch(
  vnode1: VNode,
  vnode2: VNode,
  withBeforeRemove: boolean = false
) {
  vnode1.patch(vnode2, withBeforeRemove);
}

export function remove(vnode: VNode, withBeforeRemove: boolean = false) {
  if (withBeforeRemove) {
    vnode.beforeRemove();
  }
  vnode.remove();
}

export function withKey(vnode: VNode, key: string | number) {
  vnode.key = key;
  return vnode;
}

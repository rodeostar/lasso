import type { VComponent } from "./internal/component/vcomponent";
import type { TemplateCompiler, ErrorBoundaryHandler } from "./types";

type VComponentAny = VComponent<unknown>;
const contextStack: VComponentAny[] = [];

export type VContext = {
  get current(): VComponentAny | null;
  push(v: VComponentAny): void;
  pop(): void;
};

/** Virtual Component context: stack for nested component initialization. */
export const VirtualComponentContext: VContext = {
  get current(): VComponentAny | null {
    return contextStack[contextStack.length - 1] ?? null;
  },
  push(v: VComponentAny) {
    contextStack.push(v);
  },
  pop() {
    contextStack.pop();
  },
};

/** Optional global error boundary; called when a component throws in mount/patch */
export let globalErrorHandler: ErrorBoundaryHandler | null = null;

export function setGlobalErrorHandler(handler: ErrorBoundaryHandler | null): void {
  globalErrorHandler = handler;
}

/** Template storage and caching */
export const TemplateCache = new WeakMap<
  TemplateStringsArray,
  TemplateCompiler
>();

/** Track pending virtual node renderings */
export const PendingRenderings = new Set<VComponentAny>();

/** Styles cache */
export const StylesCache = new Set<string>();

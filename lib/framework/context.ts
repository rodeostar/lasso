import type { VComponent } from "./internal/component/vcomponent";
import type { TemplateCompiler } from "./types";

export type VContext = {
  current: VComponent | null;
};

/** Virtual Component context */
export let VirtualComponentContext: VContext = {
  current: null,
};

/** Template storage and caching */
export const TemplateCache = new WeakMap<
  TemplateStringsArray,
  TemplateCompiler
>();

/** Track pending virtual node renderings */
export const PendingRenderings = new Set<VComponent>();

/** Styles cache */
export const StylesCache = new Set<string>();

import type { DOMTools } from "../../types";
import type { VComponent } from "../../internal/component";
import type { Store } from "../../api";
import { html } from "../../internal/compilers";
import { css } from "../../internal/style";

export function getDomTools<T>(vnode: VComponent<T>): DOMTools<T> {
  return {
    html: html as DOMTools<T>["html"],
    css,
    props: vnode?.props ?? ({} as T),
    vnode: vnode as DOMTools<T>["vnode"],
    connect<State, Actions extends string>(store: Store<State, Actions>) {
      store.subscribe(vnode as VComponent<unknown>);
      vnode.stores.push(store);
      return store;
    },
  };
}

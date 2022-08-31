import { VComponent } from "../internal/component";
import { PendingRenderings } from "../context";

/** Request a DOM paint upon vnode patching */
export function scheduleRendering(fn: VComponent) {
  if (!PendingRenderings.size) {
    requestAnimationFrame(async () => {
      for (const vnode of PendingRenderings) await vnode.patch();
      PendingRenderings.clear();
    });
  }
  PendingRenderings.add(fn);
}

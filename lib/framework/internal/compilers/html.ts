import type { VXNode } from "../../types";
import { TemplateCache } from "../../context";
import { compileTemplate } from "./block.template";

/** Template literal directive to create a template compiler */
export function html(strings: TemplateStringsArray, ...args: VXNode[]) {
  let template = TemplateCache.get(strings);

  if (!template) {
    template = compileTemplate(strings, args);
    TemplateCache.set(strings, template);
  }

  return template(args);
}

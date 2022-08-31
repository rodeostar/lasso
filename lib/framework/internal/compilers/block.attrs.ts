import type { VXNode } from "../../types";
import { createBlockString } from "./block.string";

export function computeBlockAttrs(
  arg: VXNode,
  str: string,
  dataIdx: number[],
  childrenIdx: number[],
  index: number
) {
  /** Compute attributes */
  if (str.endsWith("=")) {
    const i = dataIdx.push(index) - 1;
    const match: string[] = str.match(/\b(\w+)=$/);
    const attr = match[1];
    const pre = str.slice(0, -match[0].length);

    if (attr.startsWith("on")) {
      return createBlockString(pre, "handler", i, attr.slice(2).toLowerCase());
    } else if (attr === "ref") {
      return createBlockString(pre, "ref", i);
    } else {
      return createBlockString(pre, "attribute", i, attr);
    }
  }

  /** Handle generic objects and empty values */
  if (typeof arg === "object" || arg === null) {
    return `${str}<block-child-${childrenIdx.push(index) - 1}/>`;
  }

  /** Return a text node by default */
  return `${str}<block-text-${dataIdx.push(index) - 1}/>`;
}

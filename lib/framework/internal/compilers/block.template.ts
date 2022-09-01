import { createBlock } from "../../../blockdom";
import type { VXNode, TemplateCompiler } from "../../types";
import { computeBlockAttrs } from "./block.attrs";

/** Given an HTML literal template, map the args to blockdom syntax */
export function compileTemplate(
  strings: TemplateStringsArray,
  args: VXNode[]
): TemplateCompiler {
  const dataIdx: number[] = [];
  const childrenIdx: number[] = [];
  const blockDescription = strings.map((str, index) =>
    args[index] !== undefined
      ? computeBlockAttrs(args[index], str, dataIdx, childrenIdx, index)
      : str
  );
  const block = createBlock(blockDescription.join(""));

  return function template(args: VXNode[]) {
    const data = dataIdx.map((i) => args[i]);
    const children = childrenIdx.map((i) => args[i]);
    return block(data, children);
  };
}

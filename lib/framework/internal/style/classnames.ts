import { StylesCache } from "../../context";
import { CSSConditional, CSSEntry } from "../../types";

/** CSSConditional typeguard */
export function isConditional(entry: CSSEntry): entry is CSSConditional {
  return typeof entry === "object";
}

export function getConditionalStyles(entry: CSSConditional) {
  const additions = [];
  for (const k in entry) {
    StylesCache.add(k);
    if (entry[k] === true) {
      additions.push(k);
    }
  }

  return additions;
}

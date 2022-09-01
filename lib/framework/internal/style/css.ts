import { StylesCache } from "../../context";
import { CSSEntry } from "../../types";
import { getConditionalStyles, isConditional } from "./classnames";

/** Stores CSS in the CSS cache for later unpacking on the server */
export function css(...rawStrings: CSSEntry[]) {
  const strings = rawStrings
    .reduce((completed, entry) => {
      let additions = [];

      /** Handle conditional styles, similar to libraries like 'classnames */
      if (isConditional(entry)) {
        additions = [...additions, ...getConditionalStyles(entry)];
      } else if (typeof entry === "string") {
        /** Handle standard string styles */
        StylesCache.add(entry);
        additions.push(entry.split(" "));
      }

      /** Merge new additions */
      return [...completed, ...additions.flat()];
    }, [])
    .join(" ");

  return strings;
}

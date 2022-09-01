import type { CSSEntry } from "lasso";
export type CSSER = (...rawStrings: CSSEntry[]) => string;
export type MakeCSS = (css: CSSER) => void;
export const mkcss =
  (...strings: CSSEntry[]) =>
  (css: CSSER) =>
    css(...strings);

import { type FC } from "lasso";

export const Nav: FC =
  () =>
  ({ html, css }) =>
    html`<nav
      class=${css("grid grid-cols-3 gap-x-6 px-8 py-2 border-b border-black")}
    >
      <a href="/" routing="true">Home</a>
      <a href="/about" routing="true">About</a>
      <a href="/viz" routing="true">DataViz</a>
    </nav>`;

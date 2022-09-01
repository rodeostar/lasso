import type { FC } from "lasso";

const Test: FC =
  () =>
  ({ html }) =>
    html`<div>test</div>`;

export default Test;

export const __Page = {
  head: {
    title: "test",
  },
};

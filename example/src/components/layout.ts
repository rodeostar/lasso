import { component, type CollectHTML, type FC } from "@rodeostar/lasso";
import { Nav } from "./nav";

const noop: FC =
  () =>
  ({ html }) =>
    html``;

export const layout: FC<{ children: () => CollectHTML }> = () => {
  return ({ html, css, props }) => {
    const child = props?.children || noop;

    return html`
      <div class=${css("max-w-[90%] m-auto py-8 grid gap-4")}>
        ${component(Nav)} ${child()}
      </div>
    `;
  };
};

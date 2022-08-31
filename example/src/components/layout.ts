import { component } from "lasso";
import { CollectHTML, FC } from "lasso/framework/types";
import { Nav } from "./nav";

export const layout: FC<{ children: () => CollectHTML }> = () => {
  return ({ html, css, props }) => {
    const noop: FC =
      () =>
      ({ html }) =>
        html``;
    const child = props?.children || noop;

    return html`
      <div class=${css("max-w-[90%] m-auto py-8 grid gap-4")}>
        ${component(Nav)} ${child()}
      </div>
    `;
  };
};

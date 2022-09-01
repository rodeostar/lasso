import { FC, component, stateless } from "lasso";
import { Visualizer } from "~/components/visualizer";
import { Nav } from "~/components/nav";
import { makeLayout } from "~/components/styles";

const Viz: FC = stateless(
  ({ html, css }) =>
    html`<div>
      ${component(Nav)}
      <main class=${makeLayout(css)}>
        <h1>Unemployment (Illinois)</h1>

        ${component(Visualizer)}
      </main>
    </div>`
);

export default Viz;

export const __Page = {
  head: {
    title: "Unemployment - Illinois",
  },
};

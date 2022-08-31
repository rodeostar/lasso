import { FC, component, stateless } from "lasso";
import { Visualizer } from "~/components/visualizer";
import { Nav } from "~/components/nav";

const Viz: FC = stateless(
  ({ html, css }) =>
    html`<div>
      ${component(Nav)}
      <main class=${css("max-w-[90%] m-auto py-8 grid gap-4")}>
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

import { Nav } from "~/components/nav";
import { component, stateless } from "@rodeostar/lasso";
import { makeLayout } from "~/components/styles";

const AboutUs = stateless(
  ({ html, css }) =>
    html`<div>
      ${component(Nav)}
      <main class=${makeLayout(css)}>
        <h1>about us</h1>
      </main>
    </div>`
);

export default AboutUs;

export const __Page = {
  head: {
    title: "About us",
  },
};

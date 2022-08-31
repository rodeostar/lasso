import { Nav } from "~/components/nav";
import { component, stateless } from "lasso";

const AboutUs = stateless(
  ({ html, css }) =>
    html`<div>
      ${component(Nav)}
      <main class=${css("max-w-[90%] m-auto py-8 grid gap-4")}>
        <h1 class=${css("text-sm text-black")}>about us</h1>
      </main>
    </div>`
);

export default AboutUs;

export const __Page = {
  head: {
    title: "About us",
  },
};

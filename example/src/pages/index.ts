import { FC, component, stateless } from "lasso";

import {
  Context,
  Input,
  Nav,
  HelloWorld,
  Counter,
  StorageCounter,
  Todos,
  LegalDrinkingAge,
} from "~/components";

/** @Home page route */
const Home: FC = stateless(({ html, css }) => {
  const tile = css("p-8 border border-[#eee]");
  const leadingText = css(
    "text-xs font-medium w-full text-center bg-[#eee] py-2 mb-4"
  );

  return html`<div>
    ${component(Nav)}

    <main class=${css("max-w-[90%] m-auto py-8 grid gap-4")}>
      <div class=${css("grid grid-cols-2 gap-4")}>
        <article class=${tile}>
          <h1 class=${leadingText}>Conditional styles</h1>
          ${component(LegalDrinkingAge)}
        </article>

        <article class=${tile}>
          <h1 class=${leadingText}>Renders a component, with provided props</h1>
          ${component(HelloWorld, { message: "props world" })}
        </article>

        <article class=${tile}>
          <h1 class=${leadingText}>Component with local state</h1>
          ${component(Counter)}
        </article>

        <article class=${tile}>
          <h1 class=${leadingText}>Live updates via input element</h1>
          ${component(Input)}
        </article>

        <article class=${tile}>
          <h1 class=${leadingText}>Component with global state (store)</h1>
          ${component(StorageCounter)}
        </article>

        <article class=${tile}>
          <h1 class=${leadingText}>Component connected to store</h1>
          ${component(Context)}
        </article>

        <article class=${tile}>
          <h1 class=${leadingText}>XHR Requests</h1>
          ${component(Todos)}
        </article>
      </div>
    </main>
  </div>`;
});

export default Home;

export const __Page = {
  head: {
    title: "Hello world",
  },
};

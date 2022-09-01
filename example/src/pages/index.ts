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
import { makeLayout } from "~/components/styles";

/** @Home page route */
const Home: FC = stateless(({ html, css }) => {
  const tile = css(
    " p-4 border-[12px] border-[#333] bg-[#222] rounded-md text-white"
  );
  const leadingText = css(
    "text-xs text-white tracking-widest w-full text-center uppercase py-2 mb-4 border-b border-[#666]"
  );

  return html`<div>
    ${component(Nav)}

    <main class=${makeLayout(css)}>
      <div class=${css("grid grid-cols-3 gap-8")}>
        <article class=${tile}>
          <h1 class=${leadingText}>Conditional styles</h1>
          ${component(LegalDrinkingAge)}
        </article>

        <article class=${tile}>
          <h1 class=${leadingText}>Render with props</h1>
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
          <h1 class=${leadingText}>XHR Requests (See network tab)</h1>
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

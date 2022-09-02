import { FC } from "@rodeostar/lasso";
import { appStorage } from "~/store";
import { makeExample, makeButton } from "../styles";
export const StorageCounter: FC = () => {
  return ({ html, css, connect }) => {
    const styles = {
      button: makeButton(css),
      example: makeExample(css),
      textInput: css("border border-[#eee] rounded-md p-2"),
      grid: css("grid grid-cols-1 gap-y-4 max-w-[300px]"),
    };

    const store = connect(appStorage);

    return html`<div class=${styles.example}>
      <p class=${css("mb-2")}>
        Store equals
        <span class=${css("text-2xl")}> ${store.state()}</span>
      </p>

      <button
        class=${styles.button}
        onClick=${() => store.dispatch("increment")}
      >
        + (${store.state()})
      </button>

      <button
        class=${styles.button}
        onClick=${() => store.dispatch("decrement")}
      >
        - (${store.state()})
      </button>
    </div>`;
  };
};

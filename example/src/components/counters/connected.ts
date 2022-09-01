import { FC } from "lasso";
import { appStorage } from "~/store";

export const StorageCounter: FC = () => {
  return ({ html, css, connect }) => {
    const styles = {
      button: css("text-xs font-medium bg-[#00a3ff] rounded-md px-6 py-2"),
      textInput: css("border border-[#eee] rounded-md p-2"),
      grid: css("grid grid-cols-1 gap-y-4 max-w-[300px]"),
    };

    const store = connect(appStorage);

    return html`<div class=${styles.grid}>
      <p>store: ${store.state()}</p>

      <button
        class=${styles.button}
        onClick=${() => store.dispatch("increment")}
      >
        Increment store ${store.state()}
      </button>

      <button
        class=${styles.button}
        onClick=${() => store.dispatch("decrement")}
      >
        Decrement store ${store.state()}
      </button>
    </div>`;
  };
};

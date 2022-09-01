import { useState, FC } from "lasso";

export const Counter: FC = () => {
  const [value, setValue] = useState(0);

  return ({ html, css }) => {
    const styles = {
      button: css("text-xs font-medium bg-[#00a3ff] rounded-md px-6 py-2"),
    };

    return html`<div>
      <p>Counter is ${value()}</p>
      <button class=${styles.button} onClick=${() => setValue(value() + 1)}>
        Add one (${value()})
      </button>
    </div>`;
  };
};

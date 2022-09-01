import { useState, FC } from "lasso";
import { makeExample, makeButton } from "../styles";

export const Counter: FC = () => {
  const [value, setValue] = useState(0);

  return ({ html, css }) => {
    return html`<div class=${makeExample(css)}>
      <p>Counter is ${value()}</p>
      <button class=${makeButton(css)} onClick=${() => setValue(value() + 1)}>
        Add
      </button>
    </div>`;
  };
};

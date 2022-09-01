import { useState, FC } from "lasso";

interface KeyEvent extends Event {
  target: HTMLInputElement;
}

export const Input: FC = () => {
  const [message, setMessage] = useState("");

  return ({ html, css }) => {
    const styles = {
      textInput: css("border border-[#eee] rounded-md p-2 mt-2"),
    };

    return html`<div>
      <input
        class=${styles.textInput}
        type="text"
        placeholder="Type to update state"
        onKeyUp=${(e: KeyEvent) => {
          setMessage(e.target.value);
        }}
      />
      <p>${message() === "" ? "" : `Hello ${message()}`}</p>
    </div>`;
  };
};

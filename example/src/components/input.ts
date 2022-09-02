import { useState, type FC } from "@rodeostar/lasso";

interface KeyEvent extends Event {
  target: HTMLInputElement;
}

export const Input: FC = () => {
  const [message, setMessage] = useState("");

  return ({ html, css }) => {
    const styles = {
      textInput: css(
        "bg-[#888] text-black rounded-md p-2 my-2 placeholder-black"
      ),
    };

    return html`<div>
      <label class=${css("flex flex-col")}>
        Binded input:
        <input
          class=${styles.textInput}
          type="text"
          placeholder="Type to update state"
          onKeyUp=${(e: KeyEvent) => {
            setMessage(e.target.value);
          }}
        />
      </label>
      <p class=${css("break-all")}>
        ${message() === "" ? "" : `Hello ${message()}`}
      </p>
    </div>`;
  };
};

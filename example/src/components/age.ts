import { useState, FC } from "lasso";
import { makeExample } from "./styles";

/** Legal drinking age */
const is_legal_age = 21;

export const LegalDrinkingAge: FC = () => {
  const [age, setAge] = useState(18);

  return ({ html, css }) => {
    const underage = age() < is_legal_age;

    const incButton = css(
      "select-none",
      "rounded-full",
      "inline-flex",
      "justify-center",
      "items-center",
      "w-[20px]",
      "h-[20px]",
      "bg-black",
      "text-white",
      "cursor-pointer",
      "first:mr-2",
      "last:ml-2"
    );

    const counterUpdater = css(
      "border-[#333] border rounded-md",
      "px-3 py-2 mx-1"
    );

    return html`<div class=${makeExample(css)}>
      <p>
        user is
        <span class=${counterUpdater}>
          <span class=${incButton} onClick=${() => setAge(age() - 1)}>-</span>
          ${age()}
          <span class=${incButton} onClick=${() => setAge(age() + 1)}
            >+</span
          ></span
        >
        years old
      </p>

      <h1
        class=${css("text-medium mt-4", {
          "font-bold text-red underline uppercase": underage,
          "!text-hotpink font-medium": !underage,
        })}
      >
        ${underage ? "Can't drink!" : "Can drink!!!"}
      </h1>
    </div>`;
  };
};

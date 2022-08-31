import { useState, FC } from "lasso";

/** Legal drinking age */
const is_legal_age = 21;

export const LegalDrinkingAge: FC = () => {
  const [age, setAge] = useState(18);

  return ({ html, css }) => {
    const underage = age() < is_legal_age;

    const incButton = css(
      "select-none px-2 bg-black text-white cursor-pointer first:mr-2 last:ml-2"
    );

    return html`<div class=${css("grid grid-cols-2")}>
      <p>
        user is
        <span class=${incButton} onClick=${() => setAge(age() - 1)}>-</span>
        ${age()}
        <span class=${incButton} onClick=${() => setAge(age() + 1)}>+</span>
        years old
      </p>

      <h1
        class=${css("text-md", {
          "font-bold text-red underline uppercase": underage,
          "!text-hotpink font-medium": !underage,
        })}
      >
        ${underage ? "Can't drink!" : "Can drink!!!"}
      </h1>
    </div>`;
  };
};

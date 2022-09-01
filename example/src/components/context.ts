import type { FC } from "lasso";
import { appStorage } from "~/store";
import { makeExample } from "./styles";

export const Context: FC = () => {
  return ({ html, css, connect }) =>
    html`
      <div class=${makeExample(css)}>
        <h1>This component is connected to the shared store.</h1>
        <p class=${css("text-2xl")}>${connect(appStorage).state()}</p>
      </div>
    `;
};

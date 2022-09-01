import type { FC } from "lasso";
import { appStorage } from "~/store";

export const Context: FC = () => {
  return ({ html, connect }) =>
    html`
      <p>Another component, sharing store: ${connect(appStorage).state()}</p>
    `;
};

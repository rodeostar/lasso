import { stateless } from "lasso";
import { FC } from "lasso/framework/types";

type Props = {
  message?: string;
};

const HelloWorld: FC<Props> = stateless(
  ({ props, html }) => html`<p>hello ${props?.message || "world"}</p>`
);

export { HelloWorld };

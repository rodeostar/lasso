import type { FC } from "@rodeostar/lasso";

const Home: FC = () => {
  return ({ html }) => {
    return html`<p>hello world</p>`;
  };
};

export default Home;

export const __Page = {
  head: {
    title: "Homepage",
  },
};

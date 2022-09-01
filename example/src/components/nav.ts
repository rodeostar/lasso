import { map, type FC } from "lasso";

type NavItemProps = {
  active?: boolean;
  path: string;
  label: string;
  handler?: () => void;
};

const NavItem: FC =
  () =>
  ({ html, css, props: { path, label } }) => {
    return html`<a
      class=${css(
        "uppercase tracking-widest border-r border-[#666] px-4 first:pl-4 last:pl-4 last:border-0"
      )}
      href=${path}
      routing="true"
      >${label}</a
    >`;
  };

const items: NavItemProps[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/viz", label: "Chart" },
];

export const Nav: FC = () => {
  return ({ html, css }) => {
    return html`<header
      class=${css(
        "flex items-center justify-center fixed top-2 left-0 right-0"
      )}
    >
      <nav
        class=${css(
          "rounded-md bg-[#222] text-white grid grid-cols-3 py-2 border-8 border-[#333]"
        )}
      >
        ${map(NavItem, items)}
      </nav>
    </header>`;
  };
};

import { map, type FC } from "@rodeostar/lasso";

type NavItemProps = {
  active?: boolean;
  path: string;
  label: string;
  handler?: () => void;
};

const aStyle =
  "text-sm uppercase tracking-widest border-r border-[#666] px-4 first:pl-4 last:pl-4 last:border-0";

const NavItem: FC =
  () =>
  ({ html, css, props: { path, label } }) => {
    return html`<a class=${css(aStyle)} href=${path} routing="true"
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
        "bg-[#111] py-4 flex items-center justify-center fixed top-0 left-0 right-0"
      )}
    >
      <nav
        class=${css(
          "rounded-md bg-[#222] text-white flex items-center py-2 border-8 border-[#333]"
        )}
      >
        ${map(NavItem, items)}

        <a href="https://github.com/rodeostar/lasso" class=${css(aStyle)}
          ><img
            class=${css("bg-white rounded-full border-2")}
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjYgMC0xMiA1LjM3My0xMiAxMiAwIDUuMzAyIDMuNDM4IDkuOCA4LjIwNyAxMS4zODcuNTk5LjExMS43OTMtLjI2MS43OTMtLjU3N3YtMi4yMzRjLTMuMzM4LjcyNi00LjAzMy0xLjQxNi00LjAzMy0xLjQxNi0uNTQ2LTEuMzg3LTEuMzMzLTEuNzU2LTEuMzMzLTEuNzU2LTEuMDg5LS43NDUuMDgzLS43MjkuMDgzLS43MjkgMS4yMDUuMDg0IDEuODM5IDEuMjM3IDEuODM5IDEuMjM3IDEuMDcgMS44MzQgMi44MDcgMS4zMDQgMy40OTIuOTk3LjEwNy0uNzc1LjQxOC0xLjMwNS43NjItMS42MDQtMi42NjUtLjMwNS01LjQ2Ny0xLjMzNC01LjQ2Ny01LjkzMSAwLTEuMzExLjQ2OS0yLjM4MSAxLjIzNi0zLjIyMS0uMTI0LS4zMDMtLjUzNS0xLjUyNC4xMTctMy4xNzYgMCAwIDEuMDA4LS4zMjIgMy4zMDEgMS4yMy45NTctLjI2NiAxLjk4My0uMzk5IDMuMDAzLS40MDQgMS4wMi4wMDUgMi4wNDcuMTM4IDMuMDA2LjQwNCAyLjI5MS0xLjU1MiAzLjI5Ny0xLjIzIDMuMjk3LTEuMjMuNjUzIDEuNjUzLjI0MiAyLjg3NC4xMTggMy4xNzYuNzcuODQgMS4yMzUgMS45MTEgMS4yMzUgMy4yMjEgMCA0LjYwOS0yLjgwNyA1LjYyNC01LjQ3OSA1LjkyMS40My4zNzIuODIzIDEuMTAyLjgyMyAyLjIyMnYzLjI5M2MwIC4zMTkuMTkyLjY5NC44MDEuNTc2IDQuNzY1LTEuNTg5IDguMTk5LTYuMDg2IDguMTk5LTExLjM4NiAwLTYuNjI3LTUuMzczLTEyLTEyLTEyeiIvPjwvc3ZnPg=="
        /></a>
      </nav>
    </header>`;
  };
};

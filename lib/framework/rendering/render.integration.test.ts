import { describe, it, expect } from "vitest";
import { render } from "./render";
import { renderToStringWithState } from "./render.string";
import { html } from "../internal/compilers/html";
import type { FC } from "../types";

describe("render integration", () => {
  it("mounts a component to a target element", async () => {
    const Comp: FC = () => () => html`<div id="mounted">ok</div>`;
    const target = document.createElement("div");
    await render(Comp, target);
    const el = target.querySelector("#mounted");
    expect(el).not.toBeNull();
    expect(el?.textContent).toBe("ok");
  });

  it("renderToStringWithState returns html and state", async () => {
    const Comp: FC = () => () => html`<span>ssr</span>`;
    const { html: outHtml, state } = await renderToStringWithState(Comp);
    expect(outHtml).toContain("ssr");
    expect(state).toEqual({});
  });
});

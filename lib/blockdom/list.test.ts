import { describe, it, expect } from "vitest";
import { list, text } from "./index";

describe("list", () => {
  it("mounts and returns firstNode", () => {
    const vlist = list([text("a"), text("b")]);
    const fixture = document.createElement("div");
    vlist.mount(fixture, null);
    expect(fixture.childNodes.length).toBeGreaterThan(0);
    const first = vlist.firstNode();
    expect(first).toBeDefined();
    vlist.remove();
  });
});

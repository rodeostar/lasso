import { describe, it, expect } from "vitest";
import { isConditional, getConditionalStyles } from "./classnames";

describe("isConditional", () => {
  it("returns true for plain objects", () => {
    expect(isConditional({})).toBe(true);
    expect(isConditional({ "text-red": true })).toBe(true);
  });

  it("returns false for strings", () => {
    expect(isConditional("p-2")).toBe(false);
  });
});

describe("getConditionalStyles", () => {
  it("returns keys where value is true", () => {
    const result = getConditionalStyles({ "text-red": true, "text-blue": false, "p-2": true });
    expect(result).toContain("text-red");
    expect(result).toContain("p-2");
    expect(result).not.toContain("text-blue");
  });
});

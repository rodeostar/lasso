import { describe, it, expect } from "vitest";
import { toText } from "./text";

describe("toText", () => {
  it("returns string as-is", () => {
    expect(toText("hello")).toBe("hello");
  });
  it("converts number to string", () => {
    expect(toText(42)).toBe("42");
  });
  it("converts boolean to string", () => {
    expect(toText(true)).toBe("true");
    expect(toText(false)).toBe("false");
  });
  it("returns empty string for null/undefined", () => {
    expect(toText(null)).toBe("");
    expect(toText(undefined)).toBe("");
  });
});

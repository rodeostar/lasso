import { describe, it, expect } from "vitest";
import { filterOutModifiersFromData } from "./config";

describe("filterOutModifiersFromData", () => {
  it("splits leading string modifiers from data", () => {
    const result = filterOutModifiersFromData(["a", "b", "c", 1, 2]);
    expect(result.modifiers).toEqual(["a", "b", "c"]);
    expect(result.data).toEqual([1, 2]);
  });

  it("returns empty modifiers when first element is not a string", () => {
    const result = filterOutModifiersFromData([1, 2, 3]);
    expect(result.modifiers).toEqual([]);
    expect(result.data).toEqual([1, 2, 3]);
  });

  it("does not mutate original array", () => {
    const input = ["x", 1];
    filterOutModifiersFromData(input);
    expect(input).toEqual(["x", 1]);
  });
});

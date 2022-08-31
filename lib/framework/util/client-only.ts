/** Helper to run methods on the client only */
export function clientOnly(fn: (w: Window & typeof globalThis) => void) {
  if (typeof window !== "undefined" && typeof fn === "function") {
    fn(window);
  }
}

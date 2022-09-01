import { enableJS } from "../rendering";
import type { FCInstance } from "../types";

export function stateless<T>(c: FCInstance<T>) {
  return enableJS(() => c);
}

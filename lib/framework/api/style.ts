export function style(obj: Record<string, string>) {
  return Object.entries(obj)
    .map(([rule, prop]) => `${rule}: ${prop}`)
    .join("; ");
}

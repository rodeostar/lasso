/** Convert templatestringarray args into blockdom attributes */
export function createBlockString(
  prefix = "",
  type: "handler" | "ref" | "attribute",
  index: number,
  value?: string
) {
  return `${prefix}block-${type}-${index}${value ? `="${value}"` : ``}`;
}

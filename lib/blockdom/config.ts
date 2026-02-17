export function filterOutModifiersFromData(dataList: unknown[]): {
  modifiers: string[];
  data: unknown[];
} {
  dataList = dataList.slice();
  const modifiers: string[] = [];
  let elm: unknown;
  while ((elm = dataList[0]) && typeof elm === "string") {
    modifiers.push(dataList.shift() as string);
  }
  return { modifiers, data: dataList };
}

export const config = {
  // whether or not blockdom should normalize DOM whenever a block is created.
  // Normalizing dom mean removing empty text nodes (or containing only spaces)
  shouldNormalizeDom: true,

  // this is the main event handler. Every event handler registered with blockdom
  // will go through this function, giving it the data registered in the block
  // and the event
  mainEventHandler: (data: unknown, ev: Event, currentTarget?: EventTarget | null): boolean => {
    if (typeof data === "function") {
      data(ev);
    } else if (Array.isArray(data)) {
      const { data: d } = filterOutModifiersFromData(data);
      const fn = d[0];
      if (typeof fn === "function") (fn as (arg: unknown, ev: Event) => void)(d[1], ev);
    }
    return false;
  },
};

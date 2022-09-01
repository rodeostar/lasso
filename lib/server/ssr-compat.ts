import { JSDOM } from "jsdom";
import fetch from "node-fetch";

const jd = new JSDOM();
const {
  Node,
  Element,
  DOMTokenList,
  CharacterData,
  DOMParser,
  document,
  requestAnimationFrame,
  addEventListener,
} = jd.window;

const _importDynamic = new Function("modulePath", "return import(modulePath)");

(globalThis as Record<string, unknown>).fetch = async function fetch<T>(
  ...args: T[]
) {
  const { default: fetch } = await _importDynamic("node-fetch");
  return fetch(...args);
};

globalThis.requestAnimationFrame = requestAnimationFrame;
globalThis.document = document;
globalThis.DOMParser = DOMParser;
globalThis.Node = Node;
globalThis.Element = Element;
globalThis.DOMTokenList = DOMTokenList;
globalThis.CharacterData = CharacterData;
globalThis.addEventListener = addEventListener;

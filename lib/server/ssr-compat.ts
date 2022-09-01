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

(globalThis as Record<string, unknown>).fetch = fetch;
globalThis.requestAnimationFrame = requestAnimationFrame;
globalThis.document = document;
globalThis.DOMParser = DOMParser;
globalThis.Node = Node;
globalThis.Element = Element;
globalThis.DOMTokenList = DOMTokenList;
globalThis.CharacterData = CharacterData;
globalThis.addEventListener = addEventListener;

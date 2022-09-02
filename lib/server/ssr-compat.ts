import { JSDOM } from "jsdom";
import fetch from "cross-fetch";

const {
  Node,
  Element,
  DOMTokenList,
  CharacterData,
  DOMParser,
  document,
  requestAnimationFrame,
  addEventListener,
} = new JSDOM().window;

globalThis.fetch = fetch;
globalThis.requestAnimationFrame = requestAnimationFrame;
globalThis.document = document;
globalThis.DOMParser = DOMParser;
globalThis.Node = Node;
globalThis.Element = Element;
globalThis.DOMTokenList = DOMTokenList;
globalThis.CharacterData = CharacterData;
globalThis.addEventListener = addEventListener;

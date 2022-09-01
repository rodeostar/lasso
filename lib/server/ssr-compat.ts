import { JSDOM } from "jsdom";

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

globalThis.fetch = require("node-fetch");
globalThis.requestAnimationFrame = requestAnimationFrame;
globalThis.document = document;
globalThis.DOMParser = DOMParser;
globalThis.Node = Node;
globalThis.Element = Element;
globalThis.DOMTokenList = DOMTokenList;
globalThis.CharacterData = CharacterData;
globalThis.addEventListener = addEventListener;

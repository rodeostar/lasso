import type { Setter } from "./block_compiler";

const { setAttribute: elemSetAttribute, removeAttribute } = Element.prototype;
const tokenList = DOMTokenList.prototype;
const tokenListAdd = tokenList.add;
const tokenListRemove = tokenList.remove;
const isArray = Array.isArray;
const { split, trim } = String.prototype;
const wordRegexp = /\s+/;

/**
 * We regroup here all code related to updating attributes in a very loose sense:
 * attributes, properties and classs are all managed by the functions in this
 * file.
 */

function setAttribute(this: HTMLElement, key: string, value: unknown): void {
  const v = value as string | boolean | undefined;
  switch (v) {
    case false:
    case undefined:
      removeAttribute.call(this, key);
      break;
    case true:
      elemSetAttribute.call(this, key, "");
      break;
    default:
      elemSetAttribute.call(this, key, String(value));
  }
}

export function createAttrUpdater(attr: string): Setter<HTMLElement> {
  return function (this: HTMLElement, value: unknown) {
    setAttribute.call(this, attr, value);
  };
}

export function attrsSetter(this: HTMLElement, attrs: [string, unknown] | Record<string, unknown>) {
  if (isArray(attrs)) {
    setAttribute.call(this, attrs[0], attrs[1]);
  } else {
    for (const k of Object.keys(attrs)) {
      setAttribute.call(this, k, attrs[k]);
    }
  }
}

export function attrsUpdater(
  this: HTMLElement,
  attrs: [string, unknown] | Record<string, unknown>,
  oldAttrs: [string, unknown] | Record<string, unknown>
) {
  if (isArray(attrs)) {
    const name = attrs[0];
    const val = attrs[1];
    const oldArr = oldAttrs as [string, unknown];
    if (name === oldArr[0]) {
      if (val === oldArr[1]) return;
      setAttribute.call(this, name, val);
    } else {
      removeAttribute.call(this, oldArr[0]);
      setAttribute.call(this, name, val);
    }
  } else {
    const o = oldAttrs as Record<string, unknown>;
    for (const k of Object.keys(o)) {
      if (!(k in attrs)) removeAttribute.call(this, k);
    }
    for (const k of Object.keys(attrs)) {
      const val = attrs[k];
      if (val !== (o as Record<string, unknown>)[k]) setAttribute.call(this, k, val);
    }
  }
}

function toClassObj(expr: string | number | Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  switch (typeof expr) {
    case "string": {
      const str = trim.call(expr);
      if (!str) return {};
      const words = split.call(str, wordRegexp);
      for (let i = 0, l = words.length; i < l; i++) {
        result[words[i]] = true;
      }
      return result;
    }
    case "object":
      if (expr === null) return {};
      for (const key of Object.keys(expr)) {
        const value = expr[key];
        if (value) {
          const words = split.call(key, wordRegexp);
          for (const word of words) {
            result[word] = value;
          }
        }
      }
      return result;
    case "undefined":
      return {};
    case "number":
      return { [String(expr)]: true };
    default:
      return { [String(expr)]: true };
  }
}

export function setClass(this: HTMLElement, val: string | number | Record<string, unknown>) {
  const v = val === "" ? {} : toClassObj(val);
  const cl = this.classList;
  for (const c of Object.keys(v)) {
    tokenListAdd.call(cl, c);
  }
}

export function updateClass(
  this: HTMLElement,
  val: string | number | Record<string, unknown>,
  oldVal: string | number | Record<string, unknown>
) {
  oldVal = oldVal === "" ? {} : toClassObj(oldVal);
  val = val === "" ? {} : toClassObj(val);
  const cl = this.classList;
  // remove classes
  for (let c in oldVal) {
    if (!(c in val)) {
      tokenListRemove.call(cl, c);
    }
  }
  // add classes
  for (let c in val) {
    if (!(c in oldVal)) {
      tokenListAdd.call(cl, c);
    }
  }
}

export function makePropSetter(name: string): Setter<HTMLElement> {
  return function setProp(this: HTMLElement, value: unknown) {
    (this as HTMLElement & Record<string, unknown>)[name] = value;
  };
}

export function isProp(tag: string, key: string): boolean {
  switch (tag) {
    case "input":
      return (
        key === "checked" ||
        key === "indeterminate" ||
        key === "value" ||
        key === "readonly" ||
        key === "disabled"
      );
    case "option":
      return key === "selected" || key === "disabled";
    case "textarea":
      return key === "value" || key === "readonly" || key === "disabled";
    case "select":
      return key === "value" || key === "disabled";
    case "button":
    case "optgroup":
      return key === "disabled";
  }
  return false;
}

import { Configuration } from "twind";
import type { VComponent } from "./internal";
import type { VNode } from "../blockdom";
export type { VNode };
import type { FastifyInstance } from "fastify";
import type { Store } from "./api/store";

/** Provide Request/Response object to lib users */
export type {
  FastifyRequest as Request,
  FastifyReply as Response,
} from "fastify";

/** Generic API handler for api/* directory routes */
export type Handler = (server: FastifyInstance, route: string) => void;

/** User Config */
export type LibConfig = {
  appDir: string;
  routing?: boolean;
  css?: Configuration;
  mode: "production" | "development";
};

/** Middleware type, in case we add functionality to the node. */
export type VXNode<T = any> = VNode<T>;

/** Template compiler, takes virtual nodes and returns a compiled block */
export type TemplateCompiler = (args: VXNode[]) => VNode<any>;

/** HTML parser */
export type CollectHTML = (
  strings: TemplateStringsArray,
  ...args: any[]
) => VNode;

/** API methods provided to the user at render time */
export type DOMTools<T> = {
  html: CollectHTML;
  css: (...rawStrings: CSSEntry[]) => string;
  props: T;
  vnode: VComponent<T>;
  connect<State, Actions extends string>(
    store: Store<State, Actions>
  ): Store<State, Actions>;
};

/** Functional component instance */
export type FCInstance<T = any> = (tools: DOMTools<T>) => VNode;

/** Functional component, returns an FCInstance */
export type FC<T = any> = (props?: T) => FCInstance<T>;

/** State Dispatcher, used for useState hooks */
export type StateDispatch<T> = [() => T, (fn: T | (() => Promise<T>)) => void];

/** Effect cleanup method */
export type Cleanup<T> = () => undefined | T | (() => T) | (T & Function);

/** Conditional style record */
export type CSSConditional = Record<string, boolean>;

/** CSS Rule entry */
export type CSSEntry = string | CSSConditional;

/** Return method of a sideEffect */
export type SideEffectResult = void | (() => void);

/** Side effect provided by the user */
export type SideEffect = () => void | Promise<() => void>;

/** Dependencies to trigger a given effect */
export type Deps<T> = () => T;

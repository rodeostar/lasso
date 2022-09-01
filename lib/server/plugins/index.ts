import { DocumentOptions, __Document } from "../document";
import type { LibConfig } from "../../framework/types";
import { log } from "../logs";
import merge from "ts-deepmerge";

export type PluginResponse = (
  docOpts: DocumentOptions,
  config: LibConfig
) => Promise<DocumentOptions>;

export type Plugin = (config: Validator) => PluginResponse;

export type ValidSingle = (config: LibConfig) => boolean | boolean[];

export type Validator = (
  message: string,
  validator: ValidSingle,
  logic: PluginResponse
) => PluginResponse;

export type PluginValidator = (
  options: DocumentOptions,
  config: LibConfig
) => Validator;

export const validatePlugin: PluginValidator = (options, config) => {
  return (message, validator, logic) => {
    const results = validator(config);
    const isValid = Array.isArray(results)
      ? results.every((item) => !!item)
      : results;

    log.info([message]);

    return isValid ? logic : async () => options;
  };
};

type PluginsOpts = {
  config: LibConfig;
  options: Partial<DocumentOptions>;
  plugins: Plugin[];
};

type PluginsFactory = (options: PluginsOpts) => Promise<string>;

export const ExecutePlugins: PluginsFactory = async ({
  config,
  options,
  plugins,
}) => {
  let reduced = options;

  for (const plugin of plugins) {
    const pluginLogic = validatePlugin(reduced, config);
    const results = await plugin(pluginLogic)(reduced, config);
    reduced = merge(reduced, results);
  }

  log.logs();

  return __Document(reduced);
};

export * from "./plugin.hmr";
export * from "./plugin.resources";
export * from "./plugin.routing";
export * from "./plugin.tailwind";
export * from "./plugin.page";

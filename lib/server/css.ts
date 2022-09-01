import { getStyleTagProperties, virtualSheet } from "twind/server";
import { setup, Configuration, tw } from "twind";

/** Setup the virtual stylesheet */
const sheet = virtualSheet();

export function collectStyles(config: Partial<Configuration>) {
  /** Mount user configuration */
  setup({
    ...config,
    sheet,
  });

  return sheet;
}

/**
 * We store styles in the cache,
 * then backfill via twind on the server side.
 * This avoids the bundler pulling in unnecessary dependencies
 * related to twind's client side functionality.
 */
export function attachStyles(ruleset: Set<string>) {
  /** Reset the stylesheet */
  sheet.reset();

  /**  Run the ruleset through twind */
  for (const rule of ruleset) tw`${rule}`;

  return getStyleTagProperties(sheet).textContent;
}

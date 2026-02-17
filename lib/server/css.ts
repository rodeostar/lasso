import { getStyleTagProperties, virtualSheet } from "twind/server";
import { setup, Configuration, tw } from "twind";

/**
 * Twind (Tailwind-compatible runtime) for server-side class-to-CSS.
 * For new projects, consider Tailwind 4 (PostCSS) or UnoCSS and a custom plugin that reads StylesCache.
 */
const sheet = virtualSheet();

export function collectStyles(config: Partial<Configuration> | undefined) {
  /** Mount user configuration */
  setup({
    ...(config || {}),
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

  /** Run the ruleset through twind */
  tw([...ruleset]);

  return getStyleTagProperties(sheet).textContent;
}

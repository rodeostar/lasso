export type DocumentHead = {
  title?: string;
};

export type DocumentBody = string;

export interface DocumentOptions {
  body?: DocumentBody;
  head?: DocumentHead;
  scripts?: string[];
  stylesheets?: string[];
  name?: string;
  page?: string;
  mode?: "production" | "development";
  /** Serialized hydration state for client (JSON string). Injected as window.__LASSO_STATE__. */
  hydrationState?: string;
}

/** Simple HTML minifier */
function naiveMinify(html: string) {
  return html
    .replace(/\n/g, "")
    .replace(/[\t ]+\</g, "<")
    .replace(/\>[\t ]+\</g, "><")
    .replace(/\>[\t ]+$/g, ">");
}

/** Generates the page layout sent from the server */
const __Document = ({
  body,
  head,
  scripts,
  stylesheets,
  mode,
  hydrationState,
}: DocumentOptions) => {
  const stateScript =
    hydrationState != null
      ? `<script>window.__LASSO_STATE__=${hydrationState};</script>`
      : "";
  const template = `
  <!doctype html>
  <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
      ${head?.title ? `<title>${head.title}</title>` : ""}
      ${(stylesheets || [])
        .map(
          (src) => `<link rel="stylesheet" href="/${src.replace(/\\/g, "/")}">`
        )
        .join("\n")}
    </head>
    <body>
      <app-root>${body}</app-root>
      ${stateScript}

      ${(scripts || [])
        .map((src) => `<script src="/${src.replace(/\\/g, "/")}"></script>`)
        .join("\n")}
    </body>
  </html>
`;

  return mode && mode === "production" ? naiveMinify(template) : template;
};

export { __Document };

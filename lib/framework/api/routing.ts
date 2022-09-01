function addOrReplace(src: string, element: Element) {
  const tn = element.tagName.toLowerCase();
  const prop = tn === "script" ? "src" : "href";
  const targetHref = `${tn}[${prop}="${src}"]`;
  const foundNodes = document.querySelectorAll(targetHref);
  const targetNode = tn === "script" ? document.body : document.head;

  if (foundNodes.length > 0) {
    targetNode.append(element);
    foundNodes.forEach((node) => node.remove());
  } else {
    targetNode.append(element);
  }
}

/**
 * Utility to create a script resource
 */
export const createScript = (file: string, callback: () => void) => {
  const script = document.createElement("script");
  const href = `/.lasso/assets/${file}.js`;
  script.src = href;
  script.onload = callback;
  addOrReplace(href, script);
};

export const createStylesheet = (file: string, callback: () => void) => {
  const link = document.createElement("link");
  const href = `/.lasso/assets/${file}.css`;
  link.rel = "stylesheet";
  link.href = href;
  link.onload = callback;
  addOrReplace(href, link);
};

function append(href: string) {
  /** Create a URL object */
  const url = new URL(href);

  /** Grab the final segment of the split URL */
  const filename = url.pathname.split("/").at(-1);

  /** Account for "/", which directs to index page */
  const file = filename === "" ? "index" : filename;

  createStylesheet(file, () => {
    createScript(file, () => {
      history.pushState({ href }, "", href);
    });
  });
}

window.addEventListener("popstate", (event) => {
  if (event?.state && "href" in event.state) {
    append(event.state.href);
  }
});

document.body.addEventListener("click", (e) => {
  if (
    e.target instanceof HTMLAnchorElement &&
    e.target.getAttribute("routing") === "true"
  ) {
    e.preventDefault();
    if (e.target.href !== window.location.href) {
      append(e.target.href);
    }
  }
});

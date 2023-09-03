const zIndexKeys = [
  "button",
  "label",
  "table",
  "tbody",
  "thead",
  "input",
  "span",
  "ol",
  "ul",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "td",
  "th",
  "a",
  "p",
].join(", ");

export const globalStyles = {
  [zIndexKeys]: {
    zIndex: 1,
  },
  html: { scrollBehavior: "smooth" },
  body: {
    bg: "body-bg",
    color: "body-fg",
    fontFamily: "body",
    "*::selection": { backgroundColor: "text-selection-bg", color: "black" },
  },
};

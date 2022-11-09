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
  // See https://github.com/rcbyr/keen-slider/blob/master/src/keen-slider.scss
  ".__slider_container": {
    "&[data-keen-slider-v]": {
      flexWrap: "wrap",
    },
    "&[data-keen-slider-v] &__slider_slide": {
      width: "100%",
    },
    "&[data-keen-slider-moves] *": {
      pointerEvents: "none",
    },
  },
};

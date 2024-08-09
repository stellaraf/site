import { describe, expect, it } from "vitest";

import { is, isEmptyRichText } from "./type-guards";

describe("isEmptyRichText", () => {
  it("should be true", () => {
    const obj1 = {
      raw: {
        children: [
          {
            type: "paragraph",
            children: [
              {
                text: "",
              },
            ],
          },
        ],
      },
    };
    expect(isEmptyRichText(obj1)).toBe(true);

    const obj2 = {
      raw: {
        children: [],
      },
    };
    expect(isEmptyRichText(obj2)).toBe(true);

    const obj3 = {
      raw: {
        children: [
          {
            type: "paragraph",
            children: [],
          },
        ],
      },
    };
    expect(isEmptyRichText(obj3)).toBe(true);
  });

  it("should be false", () => {
    const obj = {
      raw: {
        children: [
          {
            type: "paragraph",
            children: [
              {
                text: "has stuff",
              },
            ],
          },
        ],
      },
    };
    expect(isEmptyRichText(obj)).toBe(false);
    expect(isEmptyRichText({})).toBe(false);
    expect(isEmptyRichText(null)).toBe(false);
    expect(isEmptyRichText([])).toBe(false);
    expect(isEmptyRichText("")).toBe(false);
    expect(isEmptyRichText(0)).toBe(false);
    expect(isEmptyRichText(true)).toBe(false);
    expect(isEmptyRichText({ key: "val" })).toBe(false);
    expect(isEmptyRichText(NaN)).toBe(false);
    expect(isEmptyRichText(Infinity)).toBe(false);
    expect(isEmptyRichText(new Date())).toBe(false);
    expect(isEmptyRichText(undefined)).toBe(false);
  });
});

describe("is", () => {
  it("should be true", () => {
    expect(is({ key: "val" })).toBe(true);
    expect(is("stuff")).toBe(true);
    expect(is(1)).toBe(true);
  });
  it("should be false", () => {
    expect(is({})).toBe(false);
    expect(is(null)).toBe(false);
  });
});

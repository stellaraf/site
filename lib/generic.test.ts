import { describe, expect, test } from "vitest";

import { messageFromResponseOrError } from "./generic";

const ROOT_MESSAGE: string = "Root Error Message";

describe("parse error message", () => {
  test("from error", async () => {
    const err = new Error(ROOT_MESSAGE);
    const result = await messageFromResponseOrError(err);
    expect(result).toBe(ROOT_MESSAGE);
  });
  test("from response - text", async () => {
    const res = new Response(ROOT_MESSAGE, {
      status: 500,
      headers: { "content-type": "text/plain" },
    });
    const result = await messageFromResponseOrError(res);
    expect(result).toBe(ROOT_MESSAGE);
  });
  test("from response - json", async () => {
    const res = new Response(JSON.stringify({ error: ROOT_MESSAGE }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
    const result = await messageFromResponseOrError(res);
    expect(result).toBe(ROOT_MESSAGE);
  });
  test("from response - other json", async () => {
    const res = new Response(JSON.stringify({ something: ROOT_MESSAGE }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
    const result = await messageFromResponseOrError(res);
    expect(result).toContain(ROOT_MESSAGE);
  });
});

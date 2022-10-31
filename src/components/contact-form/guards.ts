import type { NextRouter } from "next/router";

type ParsedURLQuery = NextRouter["query"];

interface ValidFormQuery extends ParsedURLQuery {
  form: string;
}

export function isValidFormQuery(query: ParsedURLQuery): query is ValidFormQuery {
  if (Object.keys(query).includes("form")) {
    return typeof query.form === "string";
  }
  return false;
}

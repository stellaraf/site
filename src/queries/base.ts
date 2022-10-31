import { merge } from "merge-anything";

import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { DocumentNode } from "graphql";

export interface QueryFunctionOptions<TData, TVars> {
  query: string | DocumentNode | TypedDocumentNode<TData, TVars>;
  variables?: TVars;
  init?: Omit<RequestInit, "body" | "url">;
}

export async function queryFn<TData, TVars>(
  options: QueryFunctionOptions<TData, TVars>,
): Promise<NonNullable<TData>> {
  if (typeof process.env.HYGRAPH_API_ENDPOINT === "undefined") {
    throw new Error("No CMS endpoint defined");
  }
  const { query, variables = {}, init = {} } = options;
  const body = JSON.stringify({ query, variables });
  const requestInit = merge<RequestInit, RequestInit[]>(
    {},
    { method: "POST", body, headers: { "content-type": "application/json" } },
    init,
  );

  const res = await fetch(process.env.HYGRAPH_API_ENDPOINT, requestInit);
  const json = (await res.json()) as GraphQLResponse<NonNullable<TData>>;

  if ("errors" in json) {
    const { message } = json.errors[0];
    throw new Error(message);
  }

  return json.data;
}

export async function extract<TData, K extends keyof TData>(
  promise: Promise<TData>,
  key: K,
): Promise<TData[K]> {
  const res = await promise;
  return res[key];
}

export default queryFn;

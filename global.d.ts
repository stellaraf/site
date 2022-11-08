type Dict<T = unknown> = Record<string, T>;

type ReactRef<E extends HTMLElement | SVGElement = HTMLElement | SVGElement> =
  React.MutableRefObject<E>;

type Animated<T> = Omit<T, "transition"> & import("framer-motion").MotionProps;

interface Empty {} // eslint-disable-line

/**
 * Enforce string index type (not `number` or `symbol`).
 */
type StringKeyOf<O extends Dict, K = keyof O> = K extends string ? `${K}` : never;

type ValueOf<T> = T[keyof T];

type Nullable<T> = T | null;

type NoOp = () => void;

type PropOf<T, P extends keyof T> = T[P];

type KeysOf<T, K extends keyof T> = keyof Pick<T, K>;

type RequiredKeys<T, R extends keyof T> = { [K in Exclude<keyof T, R>]: T[K] } & {
  [K in R]-?: NonNullable<T[R]>;
};

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

interface GraphQLResponseError {
  errors: { message: string }[];
  data: { values: null };
}

interface GraphQLResponseSuccess<T> {
  data: T;
}

type GraphQLResponse<T> = GraphQLResponseSuccess<T> | GraphQLResponseError;

declare module "*.gql" {
  import { DocumentNode } from "graphql";
  const Schema: DocumentNode;

  export = Schema;
}

declare namespace NodeJS {
  // eslint-disable-next-line import/no-unused-modules
  export interface ProcessEnv {
    SFDC_ORG_ID: string;
    VERCEL_ENV: string;
    CPM_API_KEY: string;
    CPM_LIST_ID: string;
  }
}

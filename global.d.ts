type Dict<T = unknown> = Record<string, T>;

type Animated<T> = Omit<T, "transition"> & import("framer-motion").MotionProps;

type Nullable<T> = T | null;

type PropOf<T, P extends keyof T> = T[P];

type KeysOf<T, K extends keyof T> = keyof Pick<T, K>;

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
  export interface ProcessEnv {
    CPM_API_KEY: string;
    CPM_LIST_ID: string;
    NEXT_PUBLIC_VERCEL_ENV: string;
    SFDC_ORG_ID: string;
    VERCEL_ENV: string;
    NEXT_PUBLIC_GMAPS_KEY: string;
    BETTER_UPTIME_TOKEN: string;
    HYGRAPH_DRAFT_TOKEN: string;
    MAPBOX_TOKEN: string;
    ALERTHUB_TOKEN: string;
  }
}

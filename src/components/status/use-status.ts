import { type QueryFunction, type QueryFunctionContext, useQuery } from "@tanstack/react-query";
import queryString from "query-string";

import { useBrowserTimezone } from "~/hooks";

const queryFn: QueryFunction<boolean, string[]> = async (
  ctx: QueryFunctionContext,
): Promise<boolean> => {
  const tz = ctx.queryKey[0] as string;
  const url = queryString.stringifyUrl({ url: "/api/status", query: { tz } });
  const res = await fetch(url, { method: "GET" });
  const json = await res.json();
  return json.status as boolean;
};

export function useStatus(override?: boolean): boolean {
  const timezone = useBrowserTimezone();
  let tz = "America/New_York";
  if (timezone !== null) {
    tz = timezone.timezoneId;
  }
  const res = useQuery({ queryKey: [tz], queryFn });
  if (res.isError) {
    console.log(res.error);
  }
  if (typeof override !== "undefined") {
    return override;
  }
  if (res.isError) {
    return true;
  }
  return res.data === true;
}

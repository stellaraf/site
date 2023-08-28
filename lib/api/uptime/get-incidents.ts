import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import queryString from "query-string";

import { objectHasProperty } from "~/lib";

import type { IncidentsResponse } from "./types";

dayjs.extend(timezone);
dayjs.extend(utc);

const TIME_FORMAT: string = "YYYY-MM-DD";

function isIncidentResponse(obj: unknown): obj is IncidentsResponse {
  return objectHasProperty(obj, "data", "pagination");
}

async function getIncidents(timezone: string): Promise<IncidentsResponse> {
  const token = process.env.BETTER_UPTIME_TOKEN;
  if (typeof token === "undefined") {
    throw new Error("token missing from environment");
  }
  const now = dayjs.tz(dayjs(), timezone);
  const then = now.clone().subtract(1, "hour");

  const from = then.format(TIME_FORMAT);
  const to = now.format(TIME_FORMAT);

  const url = queryString.stringifyUrl({
    url: "https://uptime.betterstack.com/api/v2/incidents",
    query: { from, to },
  });
  const headers = new Headers({ Authorization: `Bearer ${process.env.BETTER_UPTIME_TOKEN}` });
  const req = new Request(url, { method: "GET", headers });
  try {
    const res = await fetch(req);
    const text = await res.text();
    const json = JSON.parse(text);
    if (isIncidentResponse(json)) {
      return json;
    }
    throw new Error(`invalid response: '${text}'`);
  } catch (error) {
    throw new Error(`Failed to retrieve incidents: ${error}`);
  }
}

export async function getStatus(timezone: string): Promise<boolean> {
  const inc = await getIncidents(timezone);
  return inc.data.length === 0;
}

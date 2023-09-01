import { objectHasProperty } from "../generic";

export interface LocationTime {
  offset: number;
  timezoneId: string;
  timezoneName: string;
}

interface TimezoneResponse {
  dstOffset: number;
  rawOffset: number;
  status: string;
  timeZoneId: string;
  timeZoneName: string;
}

interface TimezoneError {
  errorMessage: string;
  status: string;
}

function isTimezoneError(obj: unknown): obj is TimezoneError {
  return objectHasProperty(obj, "errorMessage");
}

function isTimezoneResponse(obj: unknown): obj is TimezoneResponse {
  return objectHasProperty(obj, "timeZoneName", "timeZoneId", "rawOffset", "dstOffset");
}

function formatCoordinate(num: number): number {
  return Number(num.toFixed(7));
}

export async function getLocationTime(latitude: number, longitude: number): Promise<LocationTime> {
  const lat = formatCoordinate(latitude);
  const long = formatCoordinate(longitude);

  const timestamp = (Date.now() / 1000).toString();

  const params = new URLSearchParams({
    location: `${lat},${long}`,
    timestamp,
    key: process.env.NEXT_PUBLIC_GMAPS_KEY,
  });

  const url = new URL("https://maps.googleapis.com/maps/api/timezone/json?" + params.toString());
  const req = new Request(url, { method: "GET" });
  const res = await fetch(req);
  const json = await res.json();
  if (isTimezoneError(json)) {
    throw new Error(
      `Failed to get timezone data for location '${latitude},${longitude}'. Error: [${json.status}]: ${json.errorMessage}`,
    );
  }
  if (isTimezoneResponse(json)) {
    let offset = json.rawOffset / 3_600;
    if (json.dstOffset !== 0) {
      const dst = json.dstOffset / 3_600;
      offset = offset + dst;
    }
    return { offset, timezoneId: json.timeZoneId, timezoneName: json.timeZoneName };
  }
  throw new Error(
    `Failed to get timezone data for location '${latitude},${longitude}'. Error: ${JSON.stringify(
      json,
    )}`,
  );
}

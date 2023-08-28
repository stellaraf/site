import { useState, useEffect } from "react";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import type { LocationTime } from "~/lib/server";

dayjs.extend(timezone);
dayjs.extend(utc);

export function useTimezone(start: dayjs.Dayjs, offset: number) {
  const startTime = start.clone().utcOffset(offset);
  const [now, setNow] = useState(startTime);
  useEffect(() => {
    setInterval(() => {
      setNow(dayjs().utcOffset(offset));
    });
  }, []);
  return now;
}

export function useBrowserTimezone() {
  const [time, setTime] = useState<LocationTime | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const browserTz = dayjs.tz.guess();
      const now = dayjs().tz(browserTz);
      const offset = now.utcOffset() / 60;
      setTime({ offset, timezoneId: browserTz, timezoneName: "Your Time" });
    }
  }, []);
  return time;
}

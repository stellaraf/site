import { useCallback, useMemo } from "react";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import type { Holidays } from "~/lib/server";

dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

const TIME_FORMAT: string = "h:mm A z";

interface UseNow {
  openTime: string;
  closeTime: string;
  isOpen: boolean;
  today: string;
  isHoliday: (d: string) => [boolean, string];
}
export function useNow(open: number, close: number, tz: string, holidays: Holidays): UseNow {
  const browserNow = useMemo(() => dayjs(), []);
  const openDay = useMemo(
    () =>
      browserNow
        .clone()
        .tz(tz)
        .set("hour", open)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0),
    [tz, open],
  );
  const today = useMemo(() => browserNow.format("dddd"), []);

  const closeDay = useMemo(() => openDay.clone().set("hour", close), [tz, open, close]);

  const openTime = useMemo(() => openDay.format(TIME_FORMAT), [tz, open]);
  const closeTime = useMemo(() => closeDay.format(TIME_FORMAT), [tz, open, close]);

  const isOpen = useMemo(
    () => browserNow.isBefore(closeDay) && browserNow.isAfter(openDay),
    [tz, open, close],
  );

  const isHoliday = useCallback((day: string): [boolean, string] => {
    for (const holiday of holidays.all) {
      const holidayDay = dayjs
        .tz(holiday.date, tz)
        .set("hour", openDay.hour())
        .set("minute", openDay.minute())
        .set("second", openDay.second());
      if (holidayDay.isSame(openDay, "day") && holidayDay.format("dddd") === day) {
        return [true, holiday.name];
      }
    }
    return [false, ""];
  }, []);

  return { openTime, closeTime, isOpen, today, isHoliday };
}

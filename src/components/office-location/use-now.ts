import { useCallback, useState, useEffect } from "react";

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
  const [browserNow, setBrowserNow] = useState(dayjs);
  const [openDay, setOpenDay] = useState(
    browserNow
      .clone()
      .tz(tz)
      .set("hour", open)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0),
  );

  const [closeDay, setCloseDay] = useState(openDay.clone().set("hour", close));

  const today = browserNow.format("dddd");

  const openTime = openDay.format(TIME_FORMAT);
  const closeTime = closeDay.format(TIME_FORMAT);

  const isOpen = browserNow.isBefore(closeDay) && browserNow.isAfter(openDay);

  const isHoliday = useCallback(
    (day: string): [boolean, string] => {
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
    },
    [openTime],
  );

  useEffect(() => {
    setBrowserNow(dayjs());
    setOpenDay(
      browserNow
        .clone()
        .tz(tz)
        .set("hour", open)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0),
    );
    setCloseDay(openDay.clone().set("hour", close));
  }, []);

  return { openTime, closeTime, isOpen, today, isHoliday };
}

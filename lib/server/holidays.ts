import { Holiday as BaseHoliday, allForYear } from "@18f/us-federal-holidays";
import dayjs from "dayjs";
import advFmt from "dayjs/plugin/advancedFormat";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";

dayjs.extend(advFmt);
dayjs.extend(isBetween);
dayjs.extend(utc);

interface HolidayIn extends BaseHoliday {
  alsoObservedAs?: string;
}

enum EvePosition {
  BEFORE = 0,
  AFTER = 1,
}

export interface Holiday {
  name: string;
  date: string;
  ts: number;
  active: boolean;
  elapsed: boolean;
}

export interface Holidays {
  all: Holiday[];
  next: number;
}

interface EveArgs {
  date: dayjs.Dayjs;
  name: RegExp;
}

const DATE_FORMAT: string = "MMMM DD, YYYY";

const holidayNames = [
  "New Year's Day",
  "Birthday of Martin Luther King, Jr.",
  "Memorial Day",
  "Juneteenth National Independence Day",
  "Independence Day",
  "Indigenous Peoples' Day",
  "Veterans Day",
  "Thanksgiving Day",
  "Christmas Day",
];

const eves: [string, string, EvePosition][] = [
  ["Christmas Day", "Christmas Eve", EvePosition.BEFORE],
  ["Thanksgiving Day", "Black Friday", EvePosition.AFTER],
];

function matchEve(holiday: EveArgs, start: dayjs.Dayjs, end: dayjs.Dayjs): Holiday | undefined {
  for (const [day, eve, pos] of eves) {
    if (holiday.name.test(day)) {
      if (pos === EvePosition.BEFORE) {
        const date = holiday.date.clone().subtract(1, "day");
        return {
          name: eve,
          date: date.format(DATE_FORMAT),
          active: date.isBetween(start, end),
          ts: date.unix(),
          elapsed: date.isBefore(dayjs(), "day"),
        };
      } else if (pos === EvePosition.AFTER) {
        const date = holiday.date.clone().add(1, "day");
        return {
          name: eve,
          date: date.format(DATE_FORMAT),
          active: date.isBetween(start, end),
          ts: date.unix(),
          elapsed: date.isBefore(dayjs(), "day"),
        };
      }
    }
  }
  return;
}

export function getHolidays(): Holidays {
  const now = dayjs().utcOffset(-4);
  const start = now
    .clone()
    .utcOffset(-4)
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const end = start
    .clone()
    .utcOffset(-4)
    .add(3.6e6 - 1);
  const allHolidays: HolidayIn[] = allForYear(now.year());
  let all: Holiday[] = [];

  const holidayPatterns = holidayNames.map(h => new RegExp(h));

  for (const holiday of allHolidays) {
    const out = {} as Holiday;
    let date: dayjs.Dayjs | undefined;
    let name: string | undefined;
    let pattern: RegExp | undefined;
    for (const p of holidayPatterns) {
      const d = dayjs(holiday.date);
      if (holiday.alsoObservedAs && p.test(holiday.alsoObservedAs)) {
        name = holiday.alsoObservedAs;
        date = d;
        pattern = p;
        break;
      } else if (p.test(holiday.name)) {
        name = holiday.name;
        date = d;
        pattern = p;
        break;
      }
    }
    if (typeof name === "string" && typeof date !== "undefined" && typeof pattern !== "undefined") {
      // idx++;
      out.date = date.format(DATE_FORMAT);
      out.ts = date.unix();
      out.active = false;
      out.name = name;
      const eve = matchEve({ name: pattern, date }, start, end);
      if (date.isBefore(now, "day")) {
        out.elapsed = true;
      }
      if (date.isBetween(start, end)) {
        out.active = true;
      }
      if (typeof eve !== "undefined") {
        all = [...all, eve];
      }
      all = [...all, out];
    }
  }
  all = all.sort((a, b) => (a.ts > b.ts ? 1 : -1));
  const next = all.filter(h => h.elapsed).length;
  return { all, next };
}

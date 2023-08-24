import { allForYear, Holiday as BaseHoliday } from "@18f/us-federal-holidays";
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

export interface Holiday {
  name: string;
  date: string;
}

export interface Holidays {
  all: Holiday[];
  active: number | null;
  elapsed: number[];
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
  "Labor Day",
  "Indigenous Peoples' Day",
  "Veterans Day",
  "Thanksgiving Day",
  "Christmas Day",
];

const eves = [["Christmas Day", "Christmas Eve"]];

function matchEve(holiday: EveArgs): Holiday | undefined {
  for (const [day, eve] of eves) {
    if (holiday.name.test(day)) {
      const date = holiday.date.clone().subtract(1, "day");
      return { name: eve, date: date.format(DATE_FORMAT) };
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
  let active: number | null = null;
  let elapsed: number[] = [];
  let idx = -1;

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
      idx++;
      out.date = date.format(DATE_FORMAT);
      out.name = name;
      const eve = matchEve({ name: pattern, date });
      if (date.isBefore(now, "day")) {
        elapsed = [...elapsed, idx];
      }
      if (date.isBetween(start, end)) {
        active = idx;
      }
      if (typeof eve !== "undefined") {
        all = [...all, eve];
      }
      all = [...all, out];
    }
  }
  const next = elapsed.length === 0 ? 0 : elapsed.length;
  const result: Holidays = {
    all,
    active,
    elapsed,
    next,
  };
  return result;
}

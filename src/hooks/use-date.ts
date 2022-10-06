import { useMemo, useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import advFmt from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";

interface UseDateOptions {
  format: string;
}

dayjs.extend(utc);
dayjs.extend(advFmt);
dayjs.extend(timezone);

export function useDate(
  utcTime: string | null,
  options: UseDateOptions = { format: "MMMM DD, YYYY HH:mm:ss z" },
): string {
  if (utcTime === null) {
    return "Unknown";
  }
  const parsed = dayjs(utcTime);

  const [date, setDate] = useState(() => parsed.format(options.format));

  useEffect(() => {
    setDate(parsed.local().format(options.format));
  }, []);

  return useMemo(() => date, [utcTime]);
}

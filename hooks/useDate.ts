import { useMemo, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advFmt from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(advFmt);
dayjs.extend(timezone);

type UseDateOptions = {
  format: string;
};

export function useDate(
  utcTime: string,
  options: UseDateOptions = { format: 'MMMM DD, YYYY HH:mm:ss z' },
) {
  const parsed = dayjs(utcTime);
  let local = parsed;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      local = parsed.local();
    }
  });
  const formatted = local.format(options.format);

  return useMemo(() => formatted, [utcTime]);
}

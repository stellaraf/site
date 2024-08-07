import { useMemo } from "react";

import { Tr, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";

import { Table, Td, Th } from "~/components";
import { useBrowserTimezone, useSSR, useTimezone } from "~/hooks";

import type { LocationTime } from "~/lib/server";
import type { TimezoneProps, TimezonesProps } from "./types";

dayjs.extend(localizedFormat);
dayjs.extend(utc);

const utcTime: LocationTime = {
  offset: 0,
  timezoneId: "Etc/UTC",
  timezoneName: "Coordinated Universal Time",
};

const Timezone = (props: TimezoneProps) => {
  const { isServer, time, start, ...rest } = props;
  const tzTime = useTimezone(start, time.offset);
  if (isServer) {
    return <Td {...rest}></Td>;
  }
  return <Td {...rest}>{tzTime.format("LTS")}</Td>;
};

export const Timezones = (props: TimezonesProps) => {
  const { times, ...rest } = props;
  let sorted = times.sort((a, b) => (a.offset > b.offset ? 1 : -1));
  sorted = [...sorted, utcTime];
  const showMobileVersion = useBreakpointValue(
    { base: true, md: true, lg: true, xl: false },
    { ssr: true },
  );
  const { isServer } = useSSR();
  const now = useMemo(dayjs, []);

  const userTime = useBrowserTimezone();

  if (userTime !== null) {
    sorted = [...sorted, userTime];
    sorted = sorted.sort((a, b) => (a.offset > b.offset ? 1 : -1));
  }

  const userTimeSx = useColorModeValue(
    { color: "primary.500", fontWeight: "bold" },
    { color: "secondary.300", fontWeight: "bold" },
  );

  if (showMobileVersion) {
    return (
      <Table {...rest}>
        {sorted.map((time, idx) => (
          <Tr key={`row-${time.timezoneId}-${idx}`}>
            <Th
              sx={time.timezoneName === userTime?.timezoneName ? userTimeSx : undefined}
              paddingInline={2}
            >
              {time.timezoneName}
            </Th>
            <Timezone
              key={`tz-${time.timezoneId}-${idx}`}
              time={time}
              start={now}
              isServer={isServer}
              paddingInline={2}
              sx={time.timezoneName === userTime?.timezoneName ? userTimeSx : undefined}
            />
          </Tr>
        ))}
      </Table>
    );
  }

  return (
    <Table {...rest}>
      <thead>
        <Tr>
          {sorted.map((time, idx) => {
            return (
              <Th
                key={`row-${time.timezoneId}-${idx}`}
                sx={time.timezoneName === userTime?.timezoneName ? userTimeSx : undefined}
              >
                {time.timezoneName}
              </Th>
            );
          })}
        </Tr>
      </thead>
      <tbody>
        <Tr>
          {sorted.map((time, idx) => (
            <Timezone
              key={`tz-${time.timezoneId}-${idx}`}
              time={time}
              start={now}
              isServer={isServer}
              sx={time.timezoneName === userTime?.timezoneName ? userTimeSx : undefined}
            />
          ))}
        </Tr>
      </tbody>
    </Table>
  );
};

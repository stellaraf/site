import { useCallback } from "react";

import { Tr } from "@chakra-ui/react";

import { Table, Td, Th } from "~/components";

import { DAYS, type HoursProps } from "./types";
import { useNow } from "./use-now";

export const Hours = (props: HoursProps) => {
  const { lat, lng, open, close, timezone, holidays, ...rest } = props;
  const { openTime, closeTime, isOpen, today, isHoliday } = useNow(open, close, timezone, holidays);
  const highlightGreen = useCallback(
    (d: string, h: boolean) => today === d && isOpen && !h,
    [today, isOpen],
  );
  const highlightRed = useCallback(
    (d: string, h: boolean) => (today === d && !isOpen) || (today === d && h),
    [today, isOpen],
  );

  return (
    <Table {...rest}>
      <thead>
        <Tr>
          <Th>Day</Th>
          <Th>Open</Th>
          <Th>Close</Th>
        </Tr>
      </thead>
      <tbody>
        {DAYS.map(([d, weekday]) => {
          const [holiday, holidayName] = isHoliday(d);
          const green = highlightGreen(d, holiday);
          const red = highlightRed(d, holiday);
          return (
            <Tr
              key={d}
              opacity={weekday && !holiday ? 1 : 0.5}
              fontStyle={weekday && !holiday ? undefined : "italic"}
              bg={green ? "green.500" : red ? "red.300" : undefined}
              _dark={{
                bg: green ? "green.700" : red ? "red.600" : undefined,
              }}
            >
              <Td>{d}</Td>
              {weekday && !holiday ? (
                <>
                  <Td>{openTime}</Td>
                  <Td>{closeTime}</Td>
                </>
              ) : (
                <Td colSpan={2}>{holiday ? `Closed for ${holidayName}` : "Closed"}</Td>
              )}
            </Tr>
          );
        })}
      </tbody>
    </Table>
  );
};

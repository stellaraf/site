import type { TableCellProps, TableProps } from "@chakra-ui/react";
import type { Dayjs } from "dayjs";
import type { LocationTime } from "~/lib/server";

export interface TimezonesProps extends TableProps {
  times: LocationTime[];
}

export interface TimezoneProps extends TableCellProps {
  time: LocationTime;
  isServer: boolean;
  start: Dayjs;
}

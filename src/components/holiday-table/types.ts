import { TableProps } from "@chakra-ui/react";

import type { Holidays } from "~/lib/server";

export interface HolidayTableProps extends TableProps {
  holidays: Holidays;
}

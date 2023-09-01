import type { TableProps, StackProps, CardProps } from "@chakra-ui/react";
import type { Holidays } from "~/lib/server";
import type { OfficeLocationWithTimezone } from "~/queries";

export interface OfficeLocationsProps extends StackProps {
  officeLocations: OfficeLocationWithTimezone[];
  orgName: string;
  holidays: Holidays;
}

export interface OfficeLocationProps extends CardProps {
  loc: OfficeLocationWithTimezone;
  orgName: string;
  holidays: Holidays;
}

export interface HoursProps extends TableProps {
  open: number;
  close: number;
  lat: number;
  lng: number;
  timezone: string;
  holidays: Holidays;
}

export const DAYS: [string, boolean][] = [
  ["Sunday", false],
  ["Monday", true],
  ["Tuesday", true],
  ["Wednesday", true],
  ["Thursday", true],
  ["Friday", true],
  ["Saturday", false],
];

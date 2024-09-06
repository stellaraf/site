import { Tr, useColorModeValue } from "@chakra-ui/react";

import { Table, Td, Th } from "~/components";

import type { HolidayTableProps } from "./types";

export const HolidayTable = (props: HolidayTableProps) => {
  const { holidays, ...rest } = props;

  const activeColor = useColorModeValue("green.500", "green.700");
  const elapsedColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const nextColor = useColorModeValue("yellow.300", "yellow.700");

  return (
    <Table {...rest}>
      <thead>
        <tr>
          <Th>Date</Th>
          <Th>Holiday</Th>
        </tr>
      </thead>
      <tbody>
        {holidays.all.map((holiday, idx) => {
          return (
            <Tr
              key={holiday.date}
              opacity={holiday.elapsed ? 0.5 : 1}
              fontStyle={holiday.elapsed ? "italic" : undefined}
              bg={
                holiday.active
                  ? activeColor
                  : holiday.elapsed
                    ? elapsedColor
                    : holidays.next === idx && !holiday.active
                      ? nextColor
                      : undefined
              }
            >
              <Td>{holiday.date}</Td>
              <Td>{holiday.name}</Td>
            </Tr>
          );
        })}
      </tbody>
    </Table>
  );
};

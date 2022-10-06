import { Box } from "@chakra-ui/react";

import { useColorValue } from "~/context";

import { Markdown } from "./markdown";

import type { TableCellProps, TableData } from "./types";
import type { BoxProps } from "@chakra-ui/react";
import type { TTableEntry } from "~/types";

const TableHeader = (props: BoxProps) => {
  const bg = useColorValue("blackAlpha.100", "whiteAlpha.100");
  return <Box as="th" bg={bg} fontWeight="bold" p={2} fontSize="sm" {...props} />;
};

const TableCell = (props: TableCellProps) => {
  const { isHeader = false, children, ...rest } = props;
  const border = useColorValue("gray.100", "whiteAlpha.100");
  return (
    <Box
      p={2}
      fontSize="sm"
      whiteSpace="normal"
      borderTopWidth="1px"
      borderColor={border}
      as={isHeader ? "th" : "td"}
      {...rest}
    >
      <Markdown>{children}</Markdown>
    </Box>
  );
};

const TableMain = (props: BoxProps) => {
  const border = useColorValue("gray.100", "whiteAlpha.100");
  return (
    <Box
      mt={4}
      minWidth="50%"
      overflow="auto"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={border}
      width={{ base: "100%", lg: "max-content" }}
    >
      <Box as="table" textAlign="left" width="100%" overflowX="hidden" {...props} />
    </Box>
  );
};

const TableWithHeader = (props: TableData) => {
  const { tableData } = props;
  const [header, ...rows] = tableData;
  return (
    <>
      <thead>
        <tr>
          {header.map((cell, i) => (
            <TableHeader key={i}>{cell}</TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={`tr${i}`}>
            {row.map((cell, i) => (
              <TableCell key={`cell${i}`}>{cell}</TableCell>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
};

const TableNoHeader = (props: TableData) => {
  const { tableData } = props;
  return (
    <tbody>
      {tableData.map((row, i) => (
        <tr key={`tr${i}`}>
          {row.map((cell, i) => (
            <TableCell key={`cell${i}`}>{cell}</TableCell>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export const Table = (props: TTableEntry) => {
  const { useColumnHeader, tableData } = props.data;

  return (
    <TableMain>
      {useColumnHeader ? (
        <TableWithHeader tableData={tableData} />
      ) : (
        <TableNoHeader tableData={tableData} />
      )}
    </TableMain>
  );
};

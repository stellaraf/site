import { createContext, useContext } from "react";

import {
  Box,
  TableContainer,
  Th as ChakraTh,
  Td as ChakraTd,
  useMultiStyleConfig,
  Table as ChakraTable,
  type TableProps,
  type ThemingProps,
  type TableCellProps,
  type SystemStyleObject,
} from "@chakra-ui/react";

import type { TdProps } from "./types";

type TableThemingProps = Required<Pick<ThemingProps, "colorScheme" | "variant" | "size">>;

interface TableContextType extends Record<string, SystemStyleObject> {
  props: TableThemingProps;
}

const TableContext = createContext<TableContextType>({
  props: { colorScheme: "gray", variant: "simple", size: "sm" },
});

export const Td = (props: TdProps) => {
  return (
    <ChakraTd
      whiteSpace="normal"
      borderTopWidth="1px"
      sx={{ "& div.st-content-p": { m: 0 } }}
      {...props}
    />
  );
};

export const Th = (props: TableCellProps) => {
  const { sx = {}, ...rest } = props;
  const {
    td,
    props: { colorScheme },
  } = useContext(TableContext);

  return (
    <ChakraTh
      py={2}
      sx={{
        bg: `${colorScheme}.100`,
        _dark: { bg: `${colorScheme}.800` },
        color: td.color,
        "& div.st-content-p,& div.st-content-p:first-of-type": { m: 0 },
        ...sx,
      }}
      {...rest}
    />
  );
};

export const Table = (props: TableProps) => {
  const {
    mt = 4,
    size = "sm",
    borderColor,
    width = "100%",
    minWidth = "50%",
    variant = "simple",
    borderRadius = "lg",
    borderWidth = "1px",
    colorScheme = "gray",
    ...rest
  } = props;
  const themeProps: TableThemingProps = { variant, size, colorScheme };

  const styles = useMultiStyleConfig("Table", { ...themeProps });
  return (
    <TableContext.Provider value={{ ...styles, props: themeProps }}>
      <Box overflowX="auto" width={{ base: "100%", lg: "fit-content" }}>
        <TableContainer
          mt={mt}
          zIndex={1}
          minWidth={minWidth}
          borderWidth={borderWidth}
          borderRadius={borderRadius}
          borderColor={borderColor ? borderColor : (styles.td?.borderColor as string)}
          width={width}
        >
          <ChakraTable
            variant="simple"
            size="sm"
            textAlign="left"
            width="100%"
            sx={{ "& tr:last-of-type td": { borderBottom: "unset" } }}
            {...rest}
          />
        </TableContainer>
      </Box>
    </TableContext.Provider>
  );
};

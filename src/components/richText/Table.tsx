import { Box } from '@chakra-ui/react';
import { useColorValue } from '~/context';
import { Markdown } from './Markdown';

import type { BoxProps } from '@chakra-ui/react';
import type { TTableEntry } from '~/types';
import type { ITd, ITableCell, TTableData } from './types';

export const TableHeader: React.FC<BoxProps> = (props: BoxProps) => {
  const bg = useColorValue('blackAlpha.100', 'whiteAlpha.100');
  return <Box as="th" bg={bg} fontWeight="bold" p={2} fontSize="sm" {...props} />;
};

export const TD: React.FC<ITd> = (props: ITd) => {
  const { isHeader = false, children, ...rest } = props;
  const border = useColorValue('gray.100', 'whiteAlpha.100');
  return (
    <Box
      p={2}
      fontSize="sm"
      whiteSpace="normal"
      borderTopWidth="1px"
      borderColor={border}
      as={isHeader ? 'th' : 'td'}
      {...rest}
    >
      {children}
    </Box>
  );
};

export const TableCell: React.FC<ITableCell> = (props: ITableCell) => {
  const { isHeader = false, children, ...rest } = props;
  const border = useColorValue('gray.100', 'whiteAlpha.100');
  return (
    <Box
      p={2}
      fontSize="sm"
      whiteSpace="normal"
      borderTopWidth="1px"
      borderColor={border}
      as={isHeader ? 'th' : 'td'}
      {...rest}
    >
      <Markdown>{children}</Markdown>
    </Box>
  );
};

export const TableMain: React.FC<BoxProps> = (props: BoxProps) => {
  const border = useColorValue('gray.100', 'whiteAlpha.100');
  return (
    <Box
      mt={4}
      minWidth="50%"
      overflow="auto"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={border}
      width={{ base: '100%', lg: 'max-content' }}
    >
      <Box as="table" textAlign="left" width="100%" overflowX="hidden" {...props} />
    </Box>
  );
};

const TableWithHeader: React.FC<TTableData> = (props: TTableData) => {
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

const TableNoHeader: React.FC<TTableData> = (props: TTableData) => {
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

export const Table: React.FC<TTableEntry> = (props: TTableEntry) => {
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

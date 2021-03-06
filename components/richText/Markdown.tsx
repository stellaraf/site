import dynamic from 'next/dynamic';
import { Box } from '@chakra-ui/react';
import { Link, CodeBlock } from '~/components';
import { useColorValue } from '~/context';
import { H1, H2, H3, H4, H5, H6 } from './Headings';
import { Code, BlockQuote, P } from './Texts';
import { Ul, Ol, Li } from './Lists';

const MarkdownToJSX = dynamic(() => import('markdown-to-jsx'));

import type { MarkdownToJSX as TMarkdownToJSX } from 'markdown-to-jsx';
import type { TMarkdownBlock } from '~/types';
import type { IMarkdown, ITd, ITableHeader, ITableMain } from './types';

export const Td: React.FC<ITd> = (props: ITd) => {
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

export const Th: React.FC<ITableHeader> = (props: ITableHeader) => {
  const bg = useColorValue('blackAlpha.100', 'whiteAlpha.100');
  return <Box as="th" bg={bg} fontWeight="bold" p={2} fontSize="sm" {...props} />;
};

export const Table: React.FC<ITableMain> = (props: ITableMain) => {
  const border = useColorValue('gray.100', 'whiteAlpha.100');
  return (
    <Box overflowX="auto" width={{ base: '100%', lg: 'fit-content' }}>
      <Box
        mt={4}
        zIndex={1}
        minWidth="50%"
        borderWidth="1px"
        borderRadius="lg"
        borderColor={border}
        width="100%"
      >
        <Box as="table" textAlign="left" width="100%" {...props} />
      </Box>
    </Box>
  );
};

const options = {
  overrides: {
    p: P,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    ol: Ol,
    ul: Ul,
    li: Li,
    a: Link,
    code: Code,
    td: Td,
    th: Th,
    table: Table,
    blockquote: BlockQuote,
    pre: CodeBlock,
  },
} as TMarkdownToJSX.Options;

export const Markdown: React.FC<IMarkdown> = (props: IMarkdown) => {
  return <MarkdownToJSX options={options} {...props} />;
};

export const MarkdownBlock: React.FC<TMarkdownBlock> = (props: TMarkdownBlock) => {
  const { body } = props;
  return <Markdown>{body}</Markdown>;
};

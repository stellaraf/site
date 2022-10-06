import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box } from "@chakra-ui/react";
import { Link, CodeBlock } from "~/components";
import { useColorValue } from "~/context";
import { H1, H2, H3, H4, H5, H6 } from "./Headings";
import { Code, BlockQuote, P } from "./Texts";
import { Ul, Ol, Li } from "./Lists";

import type { Components } from "react-markdown";
import type { TMarkdownBlock } from "~/types";
import type { IMarkdown, ITd, ITableHeader, ITableMain } from "./types";

export const Td = (props: ITd) => {
  const { isHeader = false, children, ...rest } = props;
  const border = useColorValue("gray.100", "whiteAlpha.100");
  return (
    <Box p={2} fontSize="sm" whiteSpace="normal" borderTopWidth="1px" borderColor={border} as={isHeader ? "th" : "td"} {...rest}>
      {children}
    </Box>
  );
};

export const Th = (props: ITableHeader) => {
  const bg = useColorValue("blackAlpha.100", "whiteAlpha.100");
  return <Box as="th" bg={bg} fontWeight="bold" p={2} fontSize="sm" {...props} />;
};

export const Table = (props: ITableMain) => {
  const border = useColorValue("gray.100", "whiteAlpha.100");
  return (
    <Box overflowX="auto" width={{ base: "100%", lg: "fit-content" }}>
      <Box mt={4} zIndex={1} minWidth="50%" borderWidth="1px" borderRadius="lg" borderColor={border} width="100%">
        <Box as="table" textAlign="left" width="100%" {...props} />
      </Box>
    </Box>
  );
};

const components: Components = {
  p: ({ children }) => <P>{children}</P>,
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ children }) => <H2>{children}</H2>,
  h3: ({ children }) => <H3>{children}</H3>,
  h4: ({ children }) => <H4>{children}</H4>,
  h5: ({ children }) => <H5>{children}</H5>,
  h6: ({ children }) => <H6>{children}</H6>,
  ol: ({ children }) => <Ol>{children}</Ol>,
  ul: ({ children }) => <Ul>{children}</Ul>,
  li: ({ children }) => <Li>{children}</Li>,
  a: ({ children, href }) => <Link href={href}>{children}</Link>,
  code: ({ children }) => <Code>{children}</Code>,
  td: ({ children, isHeader }) => <Td isHeader={isHeader}>{children}</Td>,
  th: ({ children }) => <Th>{children}</Th>,
  table: ({ children }) => <Table>{children}</Table>,
  blockquote: ({ children }) => <BlockQuote>{children}</BlockQuote>,
  pre: ({ children }) => {
    return <CodeBlock>{children}</CodeBlock>;
  },
};

export const Markdown = (props: IMarkdown) => {
  return <ReactMarkdown components={components} remarkPlugins={[remarkGfm]} {...props} />;
};

export const MarkdownBlock = (props: TMarkdownBlock) => {
  const { body } = props;
  return <Markdown>{body}</Markdown>;
};

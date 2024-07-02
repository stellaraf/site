import { RichText as HygraphRichText } from "@graphcms/rich-text-react-renderer";

import { Link, CodeBlock, BlockQuote } from "~/components";
import { is } from "~/lib";

import { Admonition } from "./admonition";
import { ImageAsset, VideoAsset } from "./asset";
import { ContentButton } from "./content-button";
import { Expandable } from "./expandable";
import { H1, H2, H3, H4, H5, H6 } from "./headings";
import { Ul, Ol, Li } from "./lists";
import { Table, Td, Th } from "./table";
import { Code, P } from "./text";
import { Document, DocumentGrid } from "../documents";

import type { NodeRendererType } from "@graphcms/rich-text-react-renderer";
import type { RichTextValue } from "~/types";

interface RichTextProps {
  content?: RichTextValue | null;
  children?: RichTextValue;
  overrides?: Partial<NodeRendererType>;
}

const defaultRenderers: NodeRendererType = {
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ children, ...rest }) => <H2 {...rest}>{children}</H2>,
  h3: ({ children }) => <H3>{children}</H3>,
  h4: ({ children }) => <H4>{children}</H4>,
  h5: ({ children }) => <H5>{children}</H5>,
  h6: ({ children }) => <H6>{children}</H6>,
  ul: ({ children }) => <Ul>{children}</Ul>,
  ol: ({ children }) => <Ol>{children}</Ol>,
  li: ({ children }) => <Li>{children}</Li>,
  a: ({ children, href }) => <Link href={href}>{children}</Link>,
  table: ({ children }) => <Table>{children}</Table>,
  table_cell: ({ children }) => <Td>{children}</Td>,
  table_header_cell: ({ children }) => <Th>{children}</Th>,
  code: ({ children }) => <Code>{children}</Code>,
  p: ({ children }) => <P>{children}</P>,
  blockquote: ({ children }) => <BlockQuote>{children}</BlockQuote>,
  code_block: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  img: props => <ImageAsset {...props} />,
  video: props => <VideoAsset {...props} />,
  embed: {
    Admonition: props => <Admonition {...props} />,
    ContentButton: props => <ContentButton {...props} />,
    Document: props => <Document document={props} />,
    DocumentGroup: props => <DocumentGrid {...props} />,
  },
  class: ({ className, children }) =>
    className === "expandable" ? <Expandable>{children}</Expandable> : <>{children}</>,
};

export const RichText = (props: RichTextProps) => {
  const { content, children, overrides } = props;
  const resolved = content ?? children ?? {};
  const renderers = { ...defaultRenderers, ...overrides };
  const { raw, ...rest } = resolved;
  return <>{is(raw) ? <HygraphRichText content={raw} renderers={renderers} {...rest} /> : null}</>;
};

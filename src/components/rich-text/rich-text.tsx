import {
  RichText as HygraphRichText,
  type RichTextProps as HygraphRichTextProps,
} from "@graphcms/rich-text-react-renderer";

import { Link, CodeBlock } from "~/components";
import { is } from "~/lib";

import { Admonition } from "./admonition";
import { ImageAsset, VideoAsset } from "./asset";
import { ContentButton } from "./content-button";
import { Expandable } from "./expandable";
import { H1, H2, H3, H4, H5, H6 } from "./headings";
import { Ul, Ol, Li } from "./lists";
import { Table, Td, Th } from "./table";
import { Code, BlockQuote, P } from "./text";

import type { NodeRendererType } from "@graphcms/rich-text-react-renderer";
import type { RichTextContent } from "@graphcms/rich-text-types";

interface RichTextProps {
  content?: RichTextContent | null;
  children?: RichTextContent | null;
  references?: HygraphRichTextProps["references"];
}

const renderers: NodeRendererType = {
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ children }) => <H2>{children}</H2>,
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
  embed: { Admonition: props => <Admonition {...props} />, ContentButton },
  class: ({ className, children }) =>
    className === "expandable" ? <Expandable>{children}</Expandable> : <>{children}</>,
};

export const RichText = (props: RichTextProps) => {
  const { content, children, references } = props;
  const resolved = content ?? children;
  return (
    <>
      {is(resolved) ? (
        <HygraphRichText content={resolved} renderers={renderers} references={references} />
      ) : null}
    </>
  );
};

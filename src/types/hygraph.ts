import type { RichTextProps } from "@graphcms/rich-text-react-renderer";
import type { RichTextContent } from "@graphcms/rich-text-types";

export type RichTextValue = {
  raw?: RichTextContent | null;
  references?: RichTextProps["references"];
};

import { Wrap, WrapItem, WrapProps } from "@chakra-ui/react";

import { DocumentPreview } from "./preview";

import type { Document as DocumentType } from "~/types";

interface DocumentGridProps extends WrapProps {
  documents: DocumentType[];
}

export const DocumentGrid = (props: DocumentGridProps) => {
  const { documents, ...rest } = props;
  return (
    <Wrap className="__st-document-grid" spacing={8} justify="center" {...rest}>
      {documents.map(doc => (
        <WrapItem key={doc.id}>
          <DocumentPreview document={doc} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

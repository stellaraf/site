import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { Box, useColorMode, type SystemCSSProperties } from "@chakra-ui/react";
import { Viewer } from "@react-pdf-viewer/core";

import { usePlugins } from "./plugins";

import type { BoxProps } from "@chakra-ui/react";
import type { Document as DocumentType } from "~/types";

interface DocumentProps extends Omit<BoxProps, "id"> {
  document: DocumentType;
}

const pdfStyleProps: Record<string, SystemCSSProperties> = {
  ".rpv-default-layout__body": { borderRadius: "1rem" },
  ".rpv-default-layout__container": { borderRadius: "1rem" },
  ".rpv-default-layout__toolbar": { borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" },
};

export const Document = (props: DocumentProps) => {
  const { document, ...rest } = props;

  const plugins = usePlugins(document);
  const { colorMode } = useColorMode();

  return (
    <Box
      className="__st-document-container"
      maxWidth={{ md: "50%" }}
      height={{ base: "100%", md: "unset" }}
      sx={pdfStyleProps}
      {...rest}
    >
      <Viewer plugins={plugins} fileUrl={document.file.url} theme={colorMode} />
    </Box>
  );
};

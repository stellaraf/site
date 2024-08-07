import { Box, type BoxProps, Tag, Wrap, WrapItem, chakra, useDisclosure } from "@chakra-ui/react";
import { type Plugin, type RenderViewer, Viewer } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";

import { Backdrop, Modal } from "~/components";

import { Document } from "./document";

import type { Document as DocumentType } from "~/types";

import "@react-pdf-viewer/core/lib/styles/index.css";

interface DocumentPreviewProps extends BoxProps {
  document: DocumentType;
}

interface PageThumbnailPluginProps {
  PageThumbnail: React.ReactElement;
}

/**
 *
 * @see [source](https://github.com/react-pdf-viewer/examples/blob/main/display-the-thumbnail-of-a-given-page/pageThumbnailPlugin.tsx)
 */
const pageThumbnailPlugin = (props: PageThumbnailPluginProps): Plugin => {
  const { PageThumbnail } = props;
  return {
    renderViewer: (renderProps: RenderViewer) => {
      const { slot } = renderProps;
      slot.children = PageThumbnail;
      // Reset the sub slot
      if (typeof slot.subSlot !== "undefined") {
        slot.subSlot.attrs = {};
        slot.subSlot.children = <></>;
      }
      return slot;
    },
  };
};

export const DocumentPreview = (props: DocumentPreviewProps) => {
  const { document, ...rest } = props;
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Cover } = thumbnailPluginInstance;
  const PageThumbnail = chakra(Cover);
  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: (
      <PageThumbnail
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        getPageIndex={() => 0}
      />
    ),
  });
  const { isOpen, onClose, onOpen } = useDisclosure();

  let tags: string[] = [];

  if (Array.isArray(document.contentTags)) {
    for (const tag of document.contentTags) {
      tags = [...tags, tag.tag];
    }
  }

  return (
    <>
      <Modal
        isCentered
        size="full"
        body={<Document maxWidth={{ md: "100%" }} document={document} />}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount
        containerProps={{
          pl: 8,
          py: 8,
          pr: 12,
          maxWidth: "2xl",
          height: "80vh",
          minWidth: { lg: "50%" },
        }}
        bodyProps={{
          pt: 2,
          py: "unset",
          px: "unset",
          textAlign: { base: "left", lg: "right" },
        }}
        contentProps={{
          height: { base: "100%", md: "unset" },
        }}
      />
      <Backdrop
        width="100%"
        onClick={onOpen}
        title={document.name}
        borderColor={"blackAlpha.200"}
        _dark={{ borderColor: "whiteAlpha.300" }}
        {...rest}
      >
        <Box
          className="__st-document-preview-container"
          px={1}
          h={{ base: "xs", md: "sm" }}
          w={{ base: "xs", md: "md" }}
          sx={{
            ".rpv-thumbnail__cover-image": {
              pointerEvents: "none",
              userSelect: "none",
              _light: { boxShadow: "md" },
            },
          }}
          {...rest}
        >
          <Box px={1} w="full" h="85%">
            <Viewer
              fileUrl={document.file.url}
              plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
            />
          </Box>
          <Wrap h="15%" display="flex" alignItems="center" justifyContent="center">
            {tags.map(tag => (
              <WrapItem key={tag}>
                <Tag size="sm">{tag}</Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Backdrop>
    </>
  );
};

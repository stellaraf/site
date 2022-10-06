import { memo } from "react";

import { Divider, Heading, Image, VStack, Wrap, WrapItem } from "@chakra-ui/react";

import { Modal } from "~/components";
import { useColorValue } from "~/context";
import { useRender, useScaledText } from "~/hooks";

import type { AvatarDetailProps, AvatarHeaderProps } from "./types";
import { useAvatar } from "./avatar-layout";
import { AvatarPhotoWrapper } from "./avatar-photo";
import { useCurrent } from "./state";

const _Header = (props: AvatarHeaderProps) => {
  const { name, title, photo } = props;
  const [containerRef, headingRef, shouldResize] = useScaledText<HTMLDivElement>([name]);
  const border = useColorValue("blackAlpha.300", "whiteAlpha.300");

  return (
    <Wrap justify={{ base: "center", lg: "space-between" }} align="center" ref={containerRef}>
      <WrapItem>
        <AvatarPhotoWrapper minWidth="unset" boxSize={32}>
          <Image
            alt={name}
            rounded="full"
            boxSize="100%"
            draggable={false}
            objectFit="cover"
            borderWidth="1px"
            borderStyle="solid"
            borderColor={border}
            transition="transform .15s ease 0s"
            fallbackSrc="https://via.placeholder.com/150"
            src={photo?.fields.file.url ?? "https://via.placeholder.com/150"}
          />
        </AvatarPhotoWrapper>
      </WrapItem>
      <WrapItem>
        <VStack align={{ base: "center", lg: "flex-end" }}>
          <Heading as="h2" fontSize={shouldResize ? "lg" : "xl"} ref={headingRef}>
            {name}
          </Heading>
          <Divider bg={border} />
          <Heading as="h3" fontSize="lg" fontWeight="light">
            {title}
          </Heading>
        </VStack>
      </WrapItem>
    </Wrap>
  );
};

const Header = memo(_Header, (prev, next) => prev.name === next.name);

export const Detail = (props: AvatarDetailProps) => {
  const { isOpen, onClose } = props;
  const { bios } = useAvatar();
  const current = useCurrent();
  const body = useRender(bios[current].bio, [current]);
  return (
    <Modal
      isCentered
      size="full"
      body={body}
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      header={<Header {...bios[current]} />}
      headerProps={{ py: "unset", pb: 2, px: "unset" }}
      containerProps={{
        pl: 8,
        py: 8,
        pr: 12,
        maxWidth: "2xl",
        height: "unset",
        minHeight: "unset",
        minWidth: { lg: "xl" },
      }}
      bodyProps={{
        pt: 2,
        py: "unset",
        px: "unset",
        textAlign: { base: "left", lg: "right" },
        css: {
          "& p": {
            marginTop: 0,
            marginBottom: 0,
          },
        },
      }}
    />
  );
};

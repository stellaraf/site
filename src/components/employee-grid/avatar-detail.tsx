import { memo } from "react";

import {
  Divider,
  Flex,
  Heading,
  Image,
  Tag,
  TagLeftIcon,
  TagLabel,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { Modal, RichText } from "~/components";
import { useScaledText } from "~/hooks";
import { LocationPin } from "~/icons";

import { AvatarPhotoWrapper } from "./avatar-photo";
import { useAvatar } from "./employee-grid";
import { useCurrent } from "./state";

import type { AvatarDetailProps } from "./types";
import type { Employee } from "~/queries";

const _Header = (props: Pick<Employee, "name" | "title" | "photo">) => {
  const { name, title, photo } = props;
  const [containerRef, headingRef, shouldResize] = useScaledText<HTMLDivElement>([name]);

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
            borderColor="blackAlpha.300"
            transition="transform .15s ease 0s"
            _dark={{ borderColor: "whiteAlpha.300" }}
            fallbackSrc="https://via.placeholder.com/150"
            src={photo.url ?? "https://via.placeholder.com/150"}
          />
        </AvatarPhotoWrapper>
      </WrapItem>
      <WrapItem>
        <VStack align={{ base: "center", lg: "flex-end" }}>
          <Heading as="h2" fontSize={shouldResize ? "lg" : "xl"} ref={headingRef}>
            {name}
          </Heading>
          <Divider bg="blackAlpha.300" _dark={{ bg: "whiteAlpha.300" }} />
          <Heading as="h3" fontSize="lg" fontWeight="light">
            {title}
          </Heading>
        </VStack>
      </WrapItem>
    </Wrap>
  );
};

const Header = memo(_Header, (prev, next) => prev.name === next.name);

const Footer = (props: Pick<Employee, "location">) => {
  return (
    <Flex alignItems="flex-end" justifyContent="flex-end">
      <Tag>
        <TagLeftIcon as={LocationPin} />
        <TagLabel>{props.location}</TagLabel>
      </Tag>
    </Flex>
  );
};

export const Detail = (props: AvatarDetailProps) => {
  const { isOpen, onClose } = props;
  const { employees } = useAvatar();
  const current = useCurrent();

  return (
    <Modal
      isCentered
      size="full"
      body={<RichText content={employees[current].bio} />}
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      header={<Header {...employees[current]} />}
      headerProps={{ py: "unset", pb: 2, px: "unset" }}
      footer={<Footer location={employees[current].location} />}
      footerProps={{ mb: "unset", px: "unset" }}
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

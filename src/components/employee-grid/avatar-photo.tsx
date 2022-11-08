import { chakra, Image, Button, Text, useBreakpointValue } from "@chakra-ui/react";

import { useColorValue } from "~/context";

import { useAvatar } from "./employee-grid";
import { useSetCurrent } from "./state";

import type { AvatarPhotoProps } from "./types";

export const AvatarPhotoWrapper = chakra("div", {
  baseStyle: {
    minWidth: 40,
    display: "flex",
    maxWidth: "100%",
    flexDir: "column",
    textAlign: "center",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
});

/**
 * Single Avatar Photo
 */
export const Photo = (props: AvatarPhotoProps) => {
  const { index, onOpen, ...rest } = props;
  const photoBorder = useColorValue("whiteAlpha.400", "blackAlpha.400");
  const { employees } = useAvatar();
  const setCurrent = useSetCurrent();
  const hover = useBreakpointValue({
    base: {},
    lg: { transform: "scale(1.25)" },
  });
  const handleClick = () => {
    setCurrent(index);
    onOpen();
  };
  return (
    <AvatarPhotoWrapper {...rest}>
      <Button
        boxSize={32}
        rounded="full"
        overflow="hidden"
        variant="unstyled"
        onClick={handleClick}
      >
        <Image
          width="100%"
          rounded="full"
          minHeight={32}
          _hover={hover}
          draggable={false}
          objectFit="cover"
          borderWidth="1px"
          borderStyle="solid"
          alt={employees[index].name}
          borderColor={photoBorder}
          src={employees[index].photo.url}
          transition="transform .15s ease 0s"
          fallbackSrc="https://via.placeholder.com/150"
        />
      </Button>
      <Text mt={4} fontSize="sm" fontWeight="medium" opacity={0.8}>
        {employees[index].name}
      </Text>
      <Text fontSize="xs" opacity="0.5">
        {employees[index].title}
      </Text>
    </AvatarPhotoWrapper>
  );
};
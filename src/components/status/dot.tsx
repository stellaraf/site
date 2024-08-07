import { type ChakraProps, chakra, useColorModeValue } from "@chakra-ui/react";

interface DotProps extends Omit<ChakraProps, "size"> {
  status: boolean;
  size: ChakraProps["boxSize"];
}

export const Dot = (props: DotProps) => {
  const { status, size, ...rest } = props;
  const up = useColorModeValue("green.500", "green.300");
  const down = useColorModeValue("yellow.500", "yellow.300");
  return (
    <chakra.span
      mr={2}
      boxSize={size}
      borderRadius="full"
      display="inline-flex"
      bg={status ? up : down}
      {...rest}
    />
  );
};

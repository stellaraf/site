import { chakra, useColorModeValue, type ChakraProps } from "@chakra-ui/react";

interface DotProps extends ChakraProps {
  status: boolean;
}

export const Dot = (props: DotProps) => {
  const { status, ...rest } = props;
  const up = useColorModeValue("green.500", "green.300");
  const down = useColorModeValue("yellow.500", "yellow.300");
  return (
    <chakra.span
      mr={2}
      boxSize="8px"
      borderRadius="full"
      display="inline-block"
      bg={status ? up : down}
      {...rest}
    />
  );
};

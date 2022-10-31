import {
  Box,
  useToken,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
} from "@chakra-ui/react";

import { useColorValue } from "~/context";

export const Expandable = (props: React.PropsWithChildren) => {
  const { children } = props;
  const hoverBorder = useColorValue("blackAlpha.400", "whiteAlpha.400");

  return (
    <Accordion allowToggle>
      <AccordionItem
        _hover={{ borderColor: hoverBorder }}
        transition="border-color 0.2s ease"
        maxW={{ lg: "60%" }}
      >
        <AccordionButton mx={1} css={{ "&:focus": { borderRadius: useToken("radii", "md") } }}>
          <Box flex={1} textAlign="left">
            Expand...
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>{children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

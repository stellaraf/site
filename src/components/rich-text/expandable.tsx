import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useToken,
} from "@chakra-ui/react";

export const Expandable = (props: React.PropsWithChildren) => {
  const { children } = props;

  return (
    <Accordion allowToggle>
      <AccordionItem
        _hover={{ borderColor: "blackAlpha.400", _dark: { borderColor: "whiteAlpha.400" } }}
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

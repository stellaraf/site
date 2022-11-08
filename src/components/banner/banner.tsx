import { useMemo } from "react";

import { Button, Flex, IconButton, VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import { DynamicIcon, RichText } from "~/components";
import { useConfig, useColorValue, useColorTokenValue } from "~/context";
import { useOpposingColor, useMobile } from "~/hooks";

import { motionChakra } from "../util/animated";
import { useBanner } from "./use-banner";

import type { BannerContentProps } from "./types";
import type { BoxProps, PropsOf } from "@chakra-ui/react";

const BannerContainer = motionChakra<BoxProps>("div", {
  baseStyle: {
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    width: "100%",
    display: "flex",
    minHeight: "4rem",
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    flexDir: { base: "column", lg: "row" },
  },
});

const MBannerContent = (props: BannerContentProps) => {
  const { body, onClick } = props;
  const bg = useColorValue("secondary.500", "secondary.200");
  const color = useOpposingColor(bg);
  const borderColor = useColorValue("blackAlpha.300", "whiteAlpha.300");
  const linkHover = useColorTokenValue("whiteAlpha.700", "whiteAlpha.700");
  const linkBorder = useColorTokenValue("whiteAlpha.700", "blackAlpha.500");
  return (
    <VStack
      p={4}
      bg={bg}
      color={color}
      boxSize="100%"
      borderTop="1px solid"
      borderTopColor={borderColor}
    >
      <Flex
        pos="relative"
        display="inline-flex"
        fontSize={{ base: "sm", lg: "md" }}
        css={{
          "& p": { margin: "unset" },
          "& > p > a": { borderBottomColor: linkBorder },
          "& > p > a:hover": { "--link-color": linkHover },
        }}
      >
        {body}
      </Flex>
      <Button
        mt={4}
        width="100%"
        variant="outline"
        onClick={onClick}
        colorScheme={color}
        leftIcon={<DynamicIcon icon={{ fa: "FaCheckCircle" }} />}
      >
        No Problem!
      </Button>
    </VStack>
  );
};

const DBannerContent = (props: BannerContentProps) => {
  const { body, onClick } = props;
  const bg = useColorValue("secondary.500", "secondary.200");
  const color = useOpposingColor(bg);
  const selectionColor = useOpposingColor(color);
  const borderColor = useColorValue("blackAlpha.300", "whiteAlpha.300");
  const linkHover = useColorTokenValue("whiteAlpha.700", "whiteAlpha.700");
  const linkBorder = useColorTokenValue("whiteAlpha.700", "blackAlpha.500");
  return (
    <Flex
      bg={bg}
      maxW="80%"
      color={color}
      boxSize="100%"
      borderTopRadius="lg"
      borderTop="1px solid"
      justify="space-between"
      borderTopColor={borderColor}
    >
      <Flex
        p={4}
        pos="relative"
        css={{
          "& p": { margin: "unset" },
          "& > p > a": { borderBottomColor: linkBorder },
          "& > p > a:hover": { "--link-color": linkHover },
          "& p::selection": { backgroundColor: color, color: selectionColor },
        }}
        fontSize="md"
      >
        {body}
      </Flex>
      <Flex>
        <IconButton
          icon={<DynamicIcon icon={{ fa: "FaCheckCircle" }} />}
          onClick={onClick}
          variant="unstyled"
          alignItems="center"
          aria-label="Consent"
          display="inline-flex"
          _hover={{ opacity: 0.8 }}
        />
      </Flex>
    </Flex>
  );
};

export const Banner = (props: PropsOf<typeof BannerContainer>) => {
  const { privacyBanner } = useConfig();

  const isMobile = useMobile();
  const [agreed, setAgreed] = useBanner();

  const body = useMemo(() => <RichText content={privacyBanner} />, []);

  return (
    <AnimatePresence>
      {!agreed && (
        <BannerContainer
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          id="__privacy-banner"
          initial={{ y: "100%" }}
          transition={{ type: "spring", delay: 0.5 }}
          {...props}
        >
          {isMobile ? (
            <MBannerContent body={body} onClick={() => setAgreed(true)} />
          ) : (
            <DBannerContent body={body} onClick={() => setAgreed(true)} />
          )}
        </BannerContainer>
      )}
    </AnimatePresence>
  );
};
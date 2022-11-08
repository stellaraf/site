import {
  Box,
  Flex,
  VStack,
  Grid,
  Heading,
  VisuallyHidden,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { Card, CardBody, GenericForm, RichText } from "~/components";
import { useGradient, useMobile, useResponsiveStyle } from "~/hooks";
import { is, separate } from "~/lib";

import { PartnerContextProvider, usePartnerCtx } from "./context";

import type { PartnerLayoutProps } from "./types";
import type { VendorLogo } from "~/queries";

const TextContent = () => {
  const { title, subtitle, body } = usePartnerCtx();
  const fnTitle = useTitleCase();

  return (
    <Flex flexDir="column" width="100%" justifyContent="center">
      <Heading
        as="h1"
        fontWeight="light"
        fontSize={{ base: "4xl", lg: "5xl" }}
        textAlign={{ base: "center", lg: "left" }}
      >
        {fnTitle(title)}
      </Heading>
      {subtitle && (
        <Heading
          as="h2"
          fontWeight="light"
          fontSize={{ base: "1.5rem", lg: "xl" }}
          textAlign={{ base: "center", lg: "left" }}
        >
          {fnTitle(subtitle)}
        </Heading>
      )}
      {body && (
        <Box
          mt={8}
          fontSize="lg"
          flexDir="column"
          fontWeight="normal"
          display="inline-flex"
          maxW={{ base: "none", md: "none", xl: "75%" }}
          alignSelf={{ base: "center", lg: "flex-start" }}
        >
          <RichText content={body} />
        </Box>
      )}
    </Flex>
  );
};

const PartnerLogo = (props: VendorLogo) => {
  const { name, logo, lightColor, darkColor, pretext, postText } = props;
  const isMobile = useMobile();

  return (
    <VStack w="100%" alignItems={{ base: "center", lg: "flex-start" }} spacing={4}>
      <Heading as="h3" fontSize="sm" opacity={0.8}>
        {pretext}
      </Heading>
      <Flex w="100%" flex="1 0 100%" height={8} justifyContent="flex-start">
        <Box
          display="inline-block"
          boxSize="100%"
          css={{
            maskRepeat: "no-repeat",
            maskImage: `url(${logo.url})`,
            maskPosition: isMobile ? "center" : "left",
          }}
          _dark={{ bg: darkColor.hex }}
          bg={lightColor.hex}
        />
        <VisuallyHidden>{name}</VisuallyHidden>
      </Flex>
      {postText && (
        <Heading as="h3" fontSize="sm" opacity={0.8}>
          {postText}
        </Heading>
      )}
    </VStack>
  );
};

const FormCard = () => {
  const { contents } = usePartnerCtx();

  const [, pageContents] = separate(
    contents,
    "vendorLogo",
    (v: unknown): v is VendorLogo => (v as Record<string, unknown>).__typename === "VendorLogo",
  );

  const form = pageContents.find(c => is(c.form))?.form;

  return (
    <Card minHeight="lg" height="min-content" w={{ base: "20rem", md: "80%", lg: "100%" }}>
      <CardBody>
        {is(form) && (
          <GenericForm
            w="100%"
            name={form.name}
            button={form.button}
            fields={form.fields}
            colorScheme={form.colorScheme}
            buttonProps={{ maxW: undefined }}
          />
        )}
      </CardBody>
    </Card>
  );
};

const MVendorLayout = () => {
  const bg = useGradient();
  const rStyles = useResponsiveStyle();
  const { contents } = usePartnerCtx();

  const [vendorLogo] = separate(
    contents,
    "vendorLogo",
    (v: unknown): v is VendorLogo => (v as Record<string, unknown>).__typename === "VendorLogo",
  );

  return (
    <Box w="100%" minH="40vh" pt={32} {...bg} {...rStyles}>
      <VStack spacing={8}>
        <TextContent />
        <FormCard />
        {is(vendorLogo) && <PartnerLogo {...vendorLogo} />}
      </VStack>
    </Box>
  );
};

const DVendorLayout = () => {
  const bg = useGradient();
  const rStyles = useResponsiveStyle();

  const { contents } = usePartnerCtx();

  const [vendorLogo] = separate(
    contents,
    "vendorLogo",
    (v: unknown): v is VendorLogo => (v as Record<string, unknown>).__typename === "VendorLogo",
  );

  return (
    <Box w="100%" minH="40vh" pt={32} {...bg} {...rStyles}>
      <Grid
        mt={16}
        gridTemplateRows="1fr"
        gridTemplateColumns="1fr 0.33fr"
        gridTemplateAreas={`"content form"`}
      >
        <VStack alignItems="flex-start" gridArea="content">
          <TextContent />
          {is(vendorLogo) && <PartnerLogo {...vendorLogo} />}
        </VStack>
        <VStack alignItems="flex-end" gridArea="form" maxHeight="80%">
          <FormCard />
        </VStack>
      </Grid>
    </Box>
  );
};

export const PartnerLayout = (props: PartnerLayoutProps) => {
  const largeLayout = useBreakpointValue({
    base: false,
    md: false,
    lg: false,
    xl: true,
  });

  return (
    <PartnerContextProvider value={props}>
      {largeLayout ? <DVendorLayout /> : <MVendorLayout />}
    </PartnerContextProvider>
  );
};

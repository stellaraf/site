import {
  Box,
  Flex,
  Grid,
  Heading,
  VStack,
  VisuallyHidden,
  chakra,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { Card, CardBody, GenericForm, RichText } from "~/components";
import { useAlert, useGradient, useMobile } from "~/hooks";
import { is, messageFromResponseOrError, separate } from "~/lib";

import { PartnerContextProvider, usePartnerCtx } from "./context";

import type { VendorLogo } from "~/queries";
import type { PartnerLayoutProps } from "./types";

const LayoutWrapper = chakra("div", {
  baseStyle: { width: "100%", minHeight: "40vh", pt: 32, layerStyle: "container" },
});

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

  const showAlert = useAlert();

  const [, pageContents] = separate(
    contents,
    "vendorLogo",
    (v: unknown): v is VendorLogo => (v as Record<string, unknown>).__typename === "VendorLogo",
  );

  const form = pageContents.find(c => is(c.form))?.form;

  form?.button.alert?.body;

  const onSuccess = () => {
    if (is(form)) {
      showAlert({
        message: <RichText content={form.button.alert?.body} />,
        status: form.button.alert?.level,
      });
    }
  };

  const onFailure = async (result: Response | Error) => {
    const message = await messageFromResponseOrError(result);
    showAlert({ message, status: "error" });
  };

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
            onFailure={onFailure}
            onSuccess={onSuccess}
          />
        )}
      </CardBody>
    </Card>
  );
};

export const PartnerLayout = (props: PartnerLayoutProps) => {
  const largeLayout = useBreakpointValue({
    base: false,
    md: false,
    lg: false,
    xl: true,
  });

  const bg = useGradient();

  const [vendorLogo] = separate(
    props.contents,
    "vendorLogo",
    (v: unknown): v is VendorLogo => (v as Record<string, unknown>).__typename === "VendorLogo",
  );

  return (
    <PartnerContextProvider value={props}>
      {largeLayout ? (
        <LayoutWrapper {...bg}>
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
        </LayoutWrapper>
      ) : (
        <LayoutWrapper {...bg}>
          <VStack spacing={8}>
            <TextContent />
            <FormCard />
            {is(vendorLogo) && <PartnerLogo {...vendorLogo} />}
          </VStack>
        </LayoutWrapper>
      )}
    </PartnerContextProvider>
  );
};

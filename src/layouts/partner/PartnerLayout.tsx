import { Box, Flex, VStack, Grid, Heading, VisuallyHidden, useBreakpointValue } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";
import { Card, CardBody, TrialForm } from "~/components";
import { useColorValue } from "~/context";
import { useGradient, useMobile, useRender, useResponsiveStyle } from "~/hooks";
import { submitTrialForm } from "~/util";
import { PartnerContextProvider, usePartnerCtx } from "./context";

import type { IPartnerLayout, TFormModelTrial } from "./types";

const TextContent: React.FC = () => {
  const { title, subtitle, body } = usePartnerCtx();
  const renderedBody = useRender(body);
  const titleMe = useTitleCase();
  return (
    <Flex flexDir="column" width="100%" justifyContent="center">
      <Heading as="h1" fontWeight="light" fontSize={{ base: "4xl", lg: "5xl" }} textAlign={{ base: "center", lg: "left" }}>
        {titleMe(title)}
      </Heading>
      {subtitle && (
        <Heading as="h2" fontWeight="light" fontSize={{ base: "1.5rem", lg: "xl" }} textAlign={{ base: "center", lg: "left" }}>
          {titleMe(subtitle)}
        </Heading>
      )}
      {body && (
        <Box mt={8} fontSize="lg" flexDir="column" fontWeight="normal" display="inline-flex" maxW={{ base: "none", md: "none", xl: "75%" }} alignSelf={{ base: "center", lg: "flex-start" }}>
          {renderedBody}
        </Box>
      )}
    </Flex>
  );
};

const PartnerLogo: React.FC = () => {
  const { name, logo, logoColorDarkMode, logoColorLightMode } = usePartnerCtx();
  const color = useColorValue(logoColorLightMode, logoColorDarkMode);
  const isMobile = useMobile();
  return (
    <VStack w="100%" alignItems={{ base: "center", lg: "flex-start" }} spacing={4}>
      <Heading as="h3" fontSize="sm" opacity={0.8}>
        Powered By
      </Heading>
      <Flex w="100%" flex="1 0 100%" height={8} justifyContent="flex-start">
        <Box
          display="inline-block"
          boxSize="100%"
          css={{
            maskImage: `url(${logo.fields.file.url})`,
            maskRepeat: "no-repeat",
            maskPosition: isMobile ? "center" : "left",
          }}
          backgroundColor={color}
        />
        <VisuallyHidden>{name}</VisuallyHidden>
      </Flex>
    </VStack>
  );
};

const FormCard: React.FC = () => {
  const { name, fields } = usePartnerCtx();
  return (
    <Card minHeight="lg" height="min-content" w={{ base: "20rem", md: "80%", lg: "100%" }}>
      <CardBody>
        <TrialForm name={name} fields={fields} onSubmit={submitTrialForm} />
      </CardBody>
    </Card>
  );
};

const MVendorLayout: React.FC = () => {
  const bg = useGradient();
  const rStyles = useResponsiveStyle();
  return (
    <Box w="100%" minH="40vh" pt={32} {...bg} {...rStyles}>
      <VStack spacing={8}>
        <TextContent />
        <FormCard />
        <PartnerLogo />
      </VStack>
    </Box>
  );
};

const DVendorLayout: React.FC = () => {
  const bg = useGradient();
  const rStyles = useResponsiveStyle();
  return (
    <Box w="100%" minH="40vh" pt={32} {...bg} {...rStyles}>
      <Grid mt={16} gridTemplateRows="1fr" gridTemplateColumns="1fr 0.33fr" gridTemplateAreas={`"content form"`}>
        <VStack alignItems="flex-start" gridArea="content">
          <TextContent />
          <PartnerLogo />
        </VStack>
        <VStack alignItems="flex-end" gridArea="form" maxHeight="80%">
          <FormCard />
        </VStack>
      </Grid>
    </Box>
  );
};

export const PartnerLayout: React.FC<IPartnerLayout> = (props: IPartnerLayout) => {
  const { trialForm, ...rest } = props;

  const fields = trialForm ?? ({} as TFormModelTrial);
  const largeLayout = useBreakpointValue({
    base: false,
    md: false,
    lg: false,
    xl: true,
  });

  return <PartnerContextProvider value={{ fields, ...rest }}>{largeLayout ? <DVendorLayout /> : <MVendorLayout />}</PartnerContextProvider>;
};

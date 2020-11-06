import { createContext, useContext } from 'react';
import { createState } from '@hookstate/core';
import {
  Box,
  Flex,
  VStack,
  Grid,
  Heading,
  VisuallyHidden,
  useBreakpointValue,
} from '@chakra-ui/core';
import { Card, CardBody } from 'site/components';
import { useColorValue } from 'site/context';
import { useGradient, useMobile, useRender, useTitle } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';
import { Form } from './Form';

import type { IPartnerLayout, IPartnerContext, IFormModelTrial } from './types';

const PartnerContext = createContext<IPartnerContext>(Object());
export const usePartnerCtx = () => useContext(PartnerContext);

const TextContent = () => {
  const { title, subtitle, body } = usePartnerCtx();
  const renderedBody = useRender(body);
  const titleMe = useTitle();
  return (
    <Flex flexDir="column" width="100%" justifyContent="center">
      <Heading
        as="h1"
        fontWeight="light"
        fontSize={{ base: '4xl', lg: '5xl' }}
        textAlign={{ base: 'center', lg: 'left' }}>
        {titleMe(title)}
      </Heading>
      {subtitle && (
        <Heading
          as="h2"
          fontWeight="light"
          fontSize={{ base: '1.5rem', lg: 'xl' }}
          textAlign={{ base: 'center', lg: 'left' }}>
          {titleMe(subtitle)}
        </Heading>
      )}
      {body && (
        <Box
          mt={8}
          fontSize="lg"
          flexDir="column"
          fontWeight="normal"
          display="inline-flex"
          maxW={{ base: 'none', md: 'none', xl: '75%' }}
          alignSelf={{ base: 'center', lg: 'flex-start' }}>
          {renderedBody}
        </Box>
      )}
    </Flex>
  );
};

const PartnerLogo = () => {
  const { name, logo, logoColorDarkMode, logoColorLightMode } = usePartnerCtx();
  const color = useColorValue(logoColorLightMode, logoColorDarkMode);
  const isMobile = useMobile();
  return (
    <VStack w="100%" alignItems={{ base: 'center', lg: 'flex-start' }} spacing={4}>
      <Heading as="h3" fontSize="sm" opacity={0.8}>
        Powered By
      </Heading>
      <Flex w="100%" flex="1 0 100%" height={8} justifyContent="flex-start">
        <Box
          display="inline-block"
          boxSize="100%"
          css={{
            maskImage: `url(${logo.file.url})`,
            maskRepeat: 'no-repeat',
            maskPosition: isMobile ? 'center' : 'left',
          }}
          backgroundColor={color}
        />
        <VisuallyHidden>{name}</VisuallyHidden>
      </Flex>
    </VStack>
  );
};

const FormCard = () => {
  return (
    <Card minHeight="lg" height="min-content" w={{ base: '20rem', md: '80%', lg: '100%' }}>
      <CardBody>
        <Form />
      </CardBody>
    </Card>
  );
};

const MVendorLayout = () => {
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

const DVendorLayout = () => {
  const bg = useGradient();
  const rStyles = useResponsiveStyle();
  return (
    <Box w="100%" minH="40vh" pt={32} {...bg} {...rStyles}>
      <Grid
        mt={16}
        gridTemplateRows="1fr"
        gridTemplateColumns="1fr 0.33fr"
        gridTemplateAreas={`"content form"`}>
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

export const PartnerLayout = (props: IPartnerLayout) => {
  const { trialForm, ...rest } = props;
  const formState = createState<IFormModelTrial>(props.trialForm ?? Object());
  const largeLayout = useBreakpointValue({ base: false, md: false, lg: false, xl: true });
  return (
    <PartnerContext.Provider value={{ trialForm: formState, ...rest }}>
      {largeLayout ? <DVendorLayout /> : <MVendorLayout />}
    </PartnerContext.Provider>
  );
};

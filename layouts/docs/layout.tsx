import { Accordion, Box, VStack, Grid, useBreakpointValue } from '@chakra-ui/core';
import { If, MSubNav } from 'site/components';
import { useColorValue, useConfig } from 'site/context';
import { useResponsiveStyle } from 'site/styles';
import { DMenuGroup } from './menuDesktop';
import { MMenuGroup } from './menuMobile';

import type { IDocsLayout, IResponsiveLayout } from './types';

const DNav = () => {
  const { docsGroups } = useConfig();
  const borderColor = useColorValue('blackAlpha.200', 'whiteAlpha.200');
  return (
    <Box
      p={4}
      as="aside"
      zIndex={1}
      minHeight="80vh"
      height="100%"
      width="280px"
      gridArea="nav"
      borderRightWidth="1px"
      position="sticky"
      top={0}
      borderColor={borderColor}>
      <Accordion allowMultiple allowToggle defaultIndex={[...Array(docsGroups.length).keys()]}>
        {docsGroups.map(group => (
          <DMenuGroup key={group.title} {...group} />
        ))}
      </Accordion>
    </Box>
  );
};

const MLayout = (props: IResponsiveLayout) => {
  const { children, ...rest } = props;
  const { docsGroups } = useConfig();
  return (
    <Box w="100%" minH="40vh" pt={32} {...rest}>
      <MSubNav>
        <Accordion allowMultiple allowToggle>
          {docsGroups.map(group => (
            <MMenuGroup key={group.title} {...group} />
          ))}
        </Accordion>
      </MSubNav>
      <VStack spacing={8}>{children}</VStack>
    </Box>
  );
};

const DLayout = (props: IResponsiveLayout) => {
  const { children, ...rest } = props;
  return (
    <Box w="100%" minH="40vh" pt={32} {...rest}>
      <Grid
        mt={16}
        gridGap={8}
        gridTemplateRows="1fr"
        gridTemplateColumns="0.2fr 1fr"
        gridTemplateAreas={`"nav content"`}>
        <DNav />
        <VStack gridArea="content" spacing={20}>
          {children}
        </VStack>
      </Grid>
    </Box>
  );
};

export const DocsLayout = (props: IDocsLayout) => {
  const { children, ...rest } = props;
  const largeLayout = useBreakpointValue({ base: false, md: false, lg: true, xl: true });
  const rStyles = useResponsiveStyle();
  return (
    <>
      <If condition={largeLayout === true}>
        <DLayout {...rStyles} {...rest}>
          {children}
        </DLayout>
      </If>
      <If condition={largeLayout !== true}>
        <MLayout {...rStyles} {...rest}>
          {children}
        </MLayout>
      </If>
    </>
  );
};

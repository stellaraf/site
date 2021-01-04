import { Accordion, chakra, Box, Flex, VStack, useBreakpointValue } from '@chakra-ui/react';
import { If, MSubNav } from '~/components';
import { useColorValue, useConfig } from '~/context';
import { useResponsiveStyle } from '~/styles';
import { DMenuGroup } from './menuDesktop';
import { MMenuGroup } from './menuMobile';

import type { IDocsLayout, IResponsiveLayout } from './types';

const LayoutContainer = chakra('div', { baseStyle: { w: '100%', minH: '40vh', pt: 32 } });

const MLayout: React.FC<IResponsiveLayout> = (props: IResponsiveLayout) => {
  const { children, ...rest } = props;
  const { docsGroups } = useConfig();
  return (
    <LayoutContainer {...rest}>
      <MSubNav>
        <Accordion allowMultiple allowToggle>
          {docsGroups.map(group => (
            <MMenuGroup key={group.title} {...group} />
          ))}
        </Accordion>
      </MSubNav>
      {children}
    </LayoutContainer>
  );
};

const DLayout: React.FC<IResponsiveLayout> = (props: IResponsiveLayout) => {
  const { children, ...rest } = props;

  return (
    <LayoutContainer {...rest}>
      <Flex flexWrap="nowrap" pos="relative">
        <DNav />
        <Box w="100%">
          <VStack spacing={20} my={{ lg: 16 }} px={{ lg: 4, xl: 16 }}>
            {children}
          </VStack>
        </Box>
      </Flex>
    </LayoutContainer>
  );
};

const DNav: React.FC = () => {
  const { docsGroups } = useConfig();
  const borderColor = useColorValue('blackAlpha.200', 'whiteAlpha.200');
  return (
    <Flex
      p={4}
      top={0}
      as="aside"
      zIndex={1}
      height="100%"
      flexShrink={0}
      minHeight="80vh"
      flexDir="column"
      position="sticky"
      borderRightWidth="1px"
      borderColor={borderColor}
      width={{ lg: '260px', xl: '300px' }}
    >
      <Accordion allowMultiple allowToggle defaultIndex={[...Array(docsGroups.length).keys()]}>
        {docsGroups.map(group => (
          <DMenuGroup key={group.title} {...group} />
        ))}
      </Accordion>
    </Flex>
  );
};

export const DocsLayout: React.FC<IDocsLayout> = (props: IDocsLayout) => {
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

import dynamic from 'next/dynamic';
import { Button, Flex, IconButton, VStack } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useLocalStorage } from 'react-use';
import { AnimatedDiv } from '~/components';
import { useConfig, useColorValue } from '~/context';
import { useOpposingColor, useRender, useMobile } from '~/hooks';

import type { IconBaseProps } from '@meronex/icons';
import type { IBanner, IBannerContent } from './types';

const Check = dynamic<IconBaseProps>(() => import('@meronex/icons/fa').then(i => i.FaCheckCircle));

const MBannerContent: React.FC<IBannerContent> = (props: IBannerContent) => {
  const { body, onClick } = props;
  const bg = useColorValue('secondary.500', 'secondary.200');
  const color = useOpposingColor(bg);
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
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
        fontSize={{ base: 'sm', lg: 'md' }}
        css={{ '& p': { margin: 'unset' } }}
      >
        {body}
      </Flex>
      <Button
        mt={4}
        width="100%"
        variant="outline"
        onClick={onClick}
        colorScheme={color}
        leftIcon={<Check />}
      >
        No Problem!
      </Button>
    </VStack>
  );
};

const DBannerContent: React.FC<IBannerContent> = (props: IBannerContent) => {
  const { body, onClick } = props;
  const bg = useColorValue('secondary.500', 'secondary.200');
  const color = useOpposingColor(bg);
  const selectionColor = useOpposingColor(color);
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
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
          '& p': { margin: 'unset' },
          '& p::selection': { backgroundColor: color, color: selectionColor },
        }}
        fontSize="md"
      >
        {body}
      </Flex>
      <Flex>
        <IconButton
          icon={<Check />}
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

export const Banner: React.FC<IBanner> = (props: IBanner) => {
  const [agreed, setAgreed] = useLocalStorage('stellar-privacy-agreement', false);
  const { privacyBanner } = useConfig();
  const body = useRender(privacyBanner);
  const isMobile = useMobile();
  return (
    <AnimatePresence>
      {!agreed && (
        <AnimatedDiv
          left={0}
          bottom={0}
          zIndex={100}
          width="100%"
          display="flex"
          align="center"
          minHeight="4rem"
          position="fixed"
          justify="center"
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          id="__privacy-banner"
          initial={{ y: '100%' }}
          transition={{ delay: 0.5 }}
          flexDir={{ base: 'column', lg: 'row' }}
          {...props}
        >
          {isMobile ? (
            <MBannerContent body={body} onClick={() => setAgreed(true)} />
          ) : (
            <DBannerContent body={body} onClick={() => setAgreed(true)} />
          )}
        </AnimatedDiv>
      )}
    </AnimatePresence>
  );
};

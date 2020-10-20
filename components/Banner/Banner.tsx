import * as React from 'react';
import dynamic from 'next/dynamic';
import { Button, Flex, IconButton } from '@chakra-ui/core';
import { AnimatePresence } from 'framer-motion';
import { useLocalStorage } from 'react-use';
import { AnimatedBox } from 'site/components';
import { useConfig, useColorValue } from 'site/context';
import { useOpposingColor, useRender, useMobile } from 'site/hooks';

import type { IconBaseProps } from '@meronex/icons';
import type { IBanner, IBannerContent } from './types';

const Check = dynamic<IconBaseProps>(() => import('@meronex/icons/fa').then(i => i.FaCheckCircle));

const MBannerContent = (props: IBannerContent) => {
  const { body, color, onClick } = props;
  return (
    <>
      <Flex
        pos="relative"
        display="inline-flex"
        css={{ '& p': { margin: 'unset' } }}
        fontSize={{ base: 'sm', lg: 'md' }}>
        {body}
      </Flex>
      <Button
        variant="outline"
        width="100%"
        colorScheme={color}
        mt={4}
        leftIcon={<Check />}
        onClick={onClick}>
        No Problem!
      </Button>
    </>
  );
};

const DBannerContent = (props: IBannerContent) => {
  const { body, color, onClick } = props;
  return (
    <>
      <IconButton
        variant="unstyled"
        alignItems="center"
        display="inline-flex"
        aria-label="Consent"
        alignSelf={{ base: 'flex-end', lg: 'center' }}
        color={color}
        onClick={onClick}
        _hover={{ opacity: 0.8 }}
        icon={<Check />}
      />
      <Flex
        pos="relative"
        display="inline-flex"
        css={{ '& p': { margin: 'unset' } }}
        fontSize={{ base: 'sm', lg: 'md' }}>
        {body}
      </Flex>
    </>
  );
};

export const Banner = (props: IBanner) => {
  const bg = useColorValue('original.secondary', 'secondary.200');
  const color = useOpposingColor(bg);
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  const [agreed, setAgreed] = useLocalStorage('stellar-privacy-agreement', false);
  const { privacyBanner } = useConfig();
  const body = useRender(privacyBanner);
  const isMobile = useMobile();
  return (
    <AnimatePresence>
      {!agreed && (
        <AnimatedBox
          p={4}
          bg={bg}
          left={0}
          bottom={0}
          zIndex={1}
          width="100vw"
          minHeight="4rem"
          color={color}
          position="fixed"
          align="center"
          borderTop="1px solid"
          borderTopColor={borderColor}
          flexDir={{ base: 'column', lg: 'row' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
          exit={{ y: '100%' }}
          {...props}>
          {isMobile ? (
            <MBannerContent body={body} color={color} onClick={() => setAgreed(true)} />
          ) : (
            <DBannerContent body={body} color={color} onClick={() => setAgreed(true)} />
          )}
        </AnimatedBox>
      )}
    </AnimatePresence>
  );
};

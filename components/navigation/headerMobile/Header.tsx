import dynamic from 'next/dynamic';
import { Box, Flex, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { Spiral as Hamburger } from 'hamburger-react';
import { Button, Logo, MControls, ModalWrapper } from 'site/components';
import { useColorValue } from 'site/context';
import { Wrapper } from './Wrapper';
import { NavLink } from './NavLink';
import navConfig from '../config';

import type { IconType } from '@meronex/icons';
import type { ButtonProps } from 'site/components';
import type { IHeader } from './types';

const Heart = dynamic<IconType>(() => import('@meronex/icons/fa').then(i => i.FaHeart));

const HEADING_HEIGHT = 56;

const ContactButton = (props: ButtonProps) => (
  <Button
    mr={8}
    w="100%"
    href="/contact"
    variant="outline"
    borderWidth="1px"
    colorScheme="primary"
    leftIcon={<Box as={Heart} />}
    {...props}>
    Talk to Us
  </Button>
);

export const MHeader = (props: IHeader) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const logoColor = useColorValue('primary.500', 'white');
  const navItems = [...navConfig.left, ...navConfig.right];

  return (
    <>
      <Wrapper isOpen={isOpen} onToggle={onToggle} navHeaderHeight={HEADING_HEIGHT} {...props}>
        <Hamburger
          toggled={isOpen}
          toggle={onToggle}
          rounded
          size={isOpen ? HEADING_HEIGHT : undefined}
        />
      </Wrapper>
      <ModalWrapper
        noOverlay
        size="full"
        scrollInside
        isCentered={false}
        isOpen={isOpen}
        hideCloseButton
        onClose={onClose}
        header={
          <Flex align="center" justify="space-between">
            <Logo.Text width="auto" height={HEADING_HEIGHT} mb={2} noAnimate color={logoColor} />
            {isOpen && (
              <Hamburger
                toggled={isOpen}
                toggle={onToggle}
                rounded
                size={isOpen ? HEADING_HEIGHT : undefined}
              />
            )}
          </Flex>
        }
        body={
          <VStack align="flex-start" spacing={6}>
            {navItems.map(i => (
              <NavLink href={i.link} title={i.title} key={i.title} onClick={onClose} />
            ))}
          </VStack>
        }
        footer={
          <HStack w="100%" justify="flex-start">
            <ContactButton />
            <MControls />
          </HStack>
        }
        footerProps={{ mb: 4 }}
        containerProps={{ m: 2, width: '96vw', height: '98vh' }}
      />
    </>
  );
};

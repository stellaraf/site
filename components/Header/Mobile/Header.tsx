import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Flex,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  VStack,
  useDisclosure,
  useStyles,
} from '@chakra-ui/core';
import { merge } from '@chakra-ui/utils';
import { Spiral as Hamburger } from 'hamburger-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Logo, MControls } from 'site/components';
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
  const styles = useStyles();
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  const bg = useColorValue(null, 'blackAlpha.300');
  const logoColor = useColorValue('original.primary', 'white');
  const burger = (
    <Hamburger
      toggled={isOpen}
      toggle={onToggle}
      rounded
      size={isOpen ? HEADING_HEIGHT : undefined}
    />
  );
  const navItems = [...navConfig.left, ...navConfig.right];
  return (
    <>
      <Wrapper
        isOpen={isOpen}
        onToggle={onToggle}
        burger={burger}
        navHeaderHeight={HEADING_HEIGHT}
        {...props}
      />
      <AnimatePresence>
        {isOpen && (
          <Modal isOpen onClose={onClose} size="full" scrollBehavior="inside">
            <ModalOverlay bg="unset">
              <motion.div
                key="modal.mobileHeader"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{
                  duration: 0.2,
                  stiffness: 50,
                  type: 'spring',
                }}>
                <ModalContent
                  my="unset"
                  top="1vh"
                  height="98vh"
                  width="96vw"
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderStyle="solid"
                  boxShadow="lg"
                  sx={merge({}, styles.box, styles.header, {
                    backdropFilter: 'blur(20px)',
                    backgroundColor: bg,
                  })}>
                  <ModalHeader>
                    <Flex align="center" justify="space-between">
                      <Logo.Text
                        width="auto"
                        height={HEADING_HEIGHT}
                        mb={2}
                        noAnimate
                        color={logoColor}
                      />
                      {isOpen && burger}
                    </Flex>
                  </ModalHeader>
                  <ModalBody>
                    <VStack align="flex-start" spacing={12}>
                      {navItems.map(i => (
                        <NavLink href={i.link} title={i.title} key={i.title} onClick={onClose} />
                      ))}
                    </VStack>
                  </ModalBody>
                  <ModalFooter mb={4}>
                    <HStack w="100%" justify="flex-start">
                      <ContactButton />
                      <MControls />
                    </HStack>
                  </ModalFooter>
                </ModalContent>
              </motion.div>
            </ModalOverlay>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
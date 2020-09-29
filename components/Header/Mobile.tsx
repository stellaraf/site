import * as React from 'react';
import {
  Box,
  Heading,
  Flex,
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
import { useRouter } from 'next/router';
import { Spiral as Hamburger } from 'hamburger-react';
import { FaArrowRight as RightArrow } from '@meronex/icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Logo } from 'site/components';
import { useColorValue } from 'site/context';
import navConfig from './config';

import type { FlexProps, IMobileBaseHeader, IMobileNavLink } from './types';
const headingHeight = 56;

const BaseHeader = (props: IMobileBaseHeader) => {
  const { isOpen, onToggle, burger, ...rest } = props;
  const styles = useStyles();
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  const { pathname } = useRouter();
  return (
    <Box
      as="header"
      pos="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="transparent"
      transition={{ transition: 'all 200ms ease-in' }}
      w="100%"
      h={20}
      sx={merge({}, styles.box, styles.header)}>
      <Flex
        px={8}
        h="100%"
        as="nav"
        flexDir="row"
        pos="relative"
        flexWrap="nowrap"
        alignItems="center"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor={borderColor}
        justifyContent={pathname === '/' ? 'flex-end' : 'space-between'}
        {...rest}>
        {!isOpen && pathname !== '/' && (
          <Link href="/">
            <Logo.Text width="auto" height={headingHeight} mb={2} />
          </Link>
        )}
        {!isOpen && burger}
      </Flex>
    </Box>
  );
};

const NavLink = (props: IMobileNavLink) => {
  const { href, title, ...rest } = props;
  return (
    <Link as={Heading} fontSize="2xl" href={href} _hover={{ textDecoration: 'unset' }} {...rest}>
      {title}
      <RightArrow style={{ display: 'inline', marginLeft: '1rem' }} size={24} />
    </Link>
  );
};

export const HeaderMobile = (props: FlexProps) => {
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
      size={isOpen ? headingHeight : undefined}
    />
  );
  const navItems = [...navConfig.left, ...navConfig.right];
  return (
    <>
      <BaseHeader isOpen={isOpen} onToggle={onToggle} burger={burger} {...props} />
      <AnimatePresence>
        {isOpen && (
          <Modal isOpen onClose={onClose} size="full">
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
                        height={headingHeight}
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
                        <NavLink href={i.link} title={i.title} onClick={onClose} />
                      ))}
                    </VStack>
                  </ModalBody>
                  <ModalFooter>Footer</ModalFooter>
                </ModalContent>
              </motion.div>
            </ModalOverlay>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

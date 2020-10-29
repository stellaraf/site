import { useState } from 'react';
import {
  Center,
  Flex,
  IconButton,
  Heading,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useStyles,
} from '@chakra-ui/core';
import { mergeWith } from '@chakra-ui/utils';
import { BisLeftArrow as Back } from '@meronex/icons/bi';
import { motion } from 'framer-motion';
import { useColorValue } from 'site/context';
import { useTitle } from 'site/hooks';
import { useFormState } from '../state';
import { SalesForm, SupportForm } from '../Forms';
import { submitForm } from '../submitters';
import { Success } from '../Success';

import type { MouseEvent } from 'react';
import type { TFormTypes, TFormFields } from '../Forms/types';
import type { IMobileForm } from './types';

export const MobileForm = (props: IMobileForm) => {
  const {
    title,
    body,
    icon,
    accent = 'primary',
    onToggle,
    formRef,
    onSubmit,
    button,
    onClose,
  } = props;
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  const bg = useColorValue(null, 'blackAlpha.300');
  const styles = useStyles();
  const titleMe = useTitle();
  const ctx = useFormState();
  const [showSuccess, setSuccess] = useState(false);
  const goBack = (e: MouseEvent) => {
    e.preventDefault();
    ctx.selectedIndex.value !== null && ctx.merge({ selectedName: null, selectedIndex: null });
    onToggle();
  };
  const handleSubmit = async <F extends TFormTypes, D extends TFormFields<F>>(form: F, data: D) => {
    await submitForm(form, data);
    if (typeof onSubmit === 'function') {
      onSubmit();
    }
    !showSuccess && setSuccess(true);
    setTimeout(() => onToggle(), 1500);
  };
  return (
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
            maxH="82vh"
            sx={mergeWith({}, styles.box, styles.header, {
              backdropFilter: 'blur(20px)',
              backgroundColor: bg,
            })}>
            <ModalBody>
              <Grid
                boxSize="100%"
                templateColumns="30% 1fr 30%"
                templateRows="10% 15% 1fr 10%"
                templateAreas={`"back title icon" "body body body" "form form form" "button button button"`}>
                <Flex p={2} align="flex-start" justify="flex-start" gridArea="back">
                  <IconButton variant="ghost" aria-label="Back" icon={<Back />} onClick={goBack} />
                </Flex>
                <Flex p={2} align="flex-start" justify="flex-end" gridArea="icon">
                  {icon}
                </Flex>
                <Center
                  p={2}
                  gridArea="title"
                  flexDirection="column"
                  textAlign="center"
                  pt={4}
                  fontSize="sm">
                  <Heading as="h3" fontSize="lg">
                    {titleMe(title)}
                  </Heading>
                </Center>
                <Center
                  p={2}
                  gridArea="body"
                  flexDirection="column"
                  textAlign="center"
                  pt={4}
                  fontSize="sm">
                  {body}
                </Center>
                <Center width="100%" gridArea="form" alignItems="flex-start">
                  {!showSuccess && ctx.selectedName.value === 'Support' ? (
                    <SupportForm ref={formRef} accent={accent} onSubmit={handleSubmit} />
                  ) : !showSuccess && ctx.selectedName.value === 'Sales' ? (
                    <SalesForm ref={formRef} accent={accent} onSubmit={handleSubmit} />
                  ) : showSuccess ? (
                    <Success>
                      {ctx.selectedName.value === 'Support'
                        ? ctx.form.Support.successMessage.value
                        : ctx.selectedName.value === 'Sales'
                        ? ctx.form.Sales.successMessage.value
                        : null}
                    </Success>
                  ) : null}
                </Center>
                <Center py={8} gridArea="button">
                  {button}
                </Center>
              </Grid>
            </ModalBody>
          </ModalContent>
        </motion.div>
      </ModalOverlay>
    </Modal>
  );
};

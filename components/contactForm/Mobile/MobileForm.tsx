import { useState } from 'react';
import { Center, Flex, IconButton, Heading, Grid } from '@chakra-ui/react';
import { BisLeftArrow as Back } from '@meronex/icons/bi';
import { useTitleCase } from 'use-title-case';
import { ModalWrapper } from '~/components';
import { useContactForm } from '../state';
import { SalesForm, SupportForm } from '../Forms';
import { submitForm } from '../submitters';
import { Success } from '../Success';

import type { TFormTypes, TFormFields } from '../Forms/types';
import type { IMobileForm } from './types';

export const MobileForm: React.FC<IMobileForm> = (props: IMobileForm) => {
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

  const formState = useContactForm();
  const titleMe = useTitleCase();
  const [showSuccess, setSuccess] = useState(false);

  function goBack(e: React.MouseEvent) {
    e.preventDefault();
    formState.reset();
    onToggle();
  }

  async function handleSubmit<F extends TFormTypes, D extends TFormFields<F>>(form: F, data: D) {
    await submitForm(form, data);
    if (typeof onSubmit === 'function') {
      onSubmit();
    }
    !showSuccess && setSuccess(true);
    setTimeout(() => onToggle(), 1500);
  }

  return (
    <ModalWrapper
      isOpen
      noOverlay
      id={title}
      size="full"
      scrollInside
      hideCloseButton
      onClose={onClose}
      bodyProps={{ overflow: 'unset' }}
      containerProps={{ overflow: 'auto', mt: 0 }}
      body={
        <Grid
          boxSize="100%"
          templateColumns="30% 1fr 30%"
          templateRows="10% 15% 1fr 10%"
          templateAreas={`"back title icon" "body body body" "form form form" "button button button"`}
        >
          <Flex p={2} align="flex-start" justify="flex-start" gridArea="back">
            <IconButton variant="ghost" aria-label="Back" icon={<Back />} onClick={goBack} />
          </Flex>
          <Flex p={2} align="flex-start" justify="flex-end" gridArea="icon">
            {icon}
          </Flex>
          <Center
            p={2}
            pt={4}
            fontSize="sm"
            gridArea="title"
            textAlign="center"
            flexDirection="column"
          >
            <Heading as="h3" fontSize="lg">
              {titleMe(title)}
            </Heading>
          </Center>
          <Center
            p={2}
            pt={4}
            fontSize="sm"
            gridArea="body"
            textAlign="center"
            flexDirection="column"
          >
            {body}
          </Center>
          <Center width="100%" gridArea="form" alignItems="flex-start">
            {formState.shouldRender('Support') ? (
              <SupportForm ref={formRef} accent={accent} onSubmit={handleSubmit} />
            ) : formState.shouldRender('Sales') ? (
              <SalesForm ref={formRef} accent={accent} onSubmit={handleSubmit} />
            ) : showSuccess ? (
              <Success>{formState.successMessage}</Success>
            ) : null}
          </Center>
          <Center py={8} gridArea="button">
            {button}
          </Center>
        </Grid>
      }
    />
  );
};

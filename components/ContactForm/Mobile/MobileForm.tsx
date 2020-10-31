import { useState } from 'react';
import { Center, Flex, IconButton, Heading, Grid } from '@chakra-ui/core';
import { BisLeftArrow as Back } from '@meronex/icons/bi';
import { ModalWrapper } from 'site/components';
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
    <ModalWrapper
      isOpen
      noOverlay
      id={title}
      size="full"
      scrollInside
      hideCloseButton
      onClose={onClose}
      containerProps={{ overflow: 'auto' }}
      body={
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
            pt={4}
            fontSize="sm"
            gridArea="title"
            textAlign="center"
            flexDirection="column">
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
            flexDirection="column">
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
      }
    />
  );
};

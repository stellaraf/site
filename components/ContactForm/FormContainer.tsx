import * as React from 'react';
import { Flex, Center, Heading, IconButton, Grid, Text } from '@chakra-ui/core';
import { BisLeftArrow as Back } from '@meronex/icons/bi';
import { useTitle } from 'site/hooks';
import { useFormState } from './state';
import { SalesForm, SupportForm } from './Forms';

import type { IFormContainer } from './types';
import type { MouseEvent } from 'react';

export const FormContainer = (props: IFormContainer) => {
  const { title, body, icon, accent = 'primary', toggleLayout, formRef } = props;
  const titleMe = useTitle();
  const ctx = useFormState();
  const goBack = (e: MouseEvent) => {
    e.preventDefault();
    ctx.selectedIndex.value !== null && ctx.merge({ selectedName: null, selectedIndex: null });
    toggleLayout();
  };
  return (
    <Grid
      boxSize="100%"
      templateColumns={{ base: '30% 1fr 30%', lg: '20% 1fr 20%' }}
      templateRows={{ base: '10% 15% 1fr', lg: '10% 5% 1fr' }}
      templateAreas={`"back title icon" "body body body" "form form form"`}>
      <Flex p={2} align="flex-start" justify="flex-start" gridArea="back">
        <IconButton variant="ghost" aria-label="Back" icon={<Back />} onClick={goBack} />
      </Flex>
      <Flex p={2} align="flex-start" justify="flex-end" gridArea="icon">
        {icon}
      </Flex>
      <Center p={2} gridArea="title" flexDirection="column" textAlign="center" pt={4} fontSize="sm">
        <Heading as="h3" fontSize="lg">
          {titleMe(title)}
        </Heading>
      </Center>
      <Center p={2} gridArea="body" flexDirection="column" textAlign="center" pt={4} fontSize="sm">
        {body}
      </Center>
      <Center width="100%" gridArea="form" alignItems={{ base: 'flex-start', lg: 'center' }}>
        {ctx.selectedName.value === 'Support' ? (
          <SupportForm ref={formRef} accent={accent} onSubmit={console.table} />
        ) : ctx.selectedName.value === 'Sales' ? (
          <SalesForm ref={formRef} accent={accent} onSubmit={console.table} />
        ) : null}
      </Center>
    </Grid>
  );
};

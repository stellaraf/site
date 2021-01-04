import { Flex, Center, Heading, IconButton, Grid } from '@chakra-ui/react';
import { BisLeftArrow as Back } from '@meronex/icons/bi';
import { useTitle } from '~/hooks';
import { useFormState } from '../state';
import { SalesForm, SupportForm } from '../Forms';
import { submitForm } from '../submitters';
import { Success } from '../Success';

import type { IDesktopForm } from './types';
import type { TFormTypes, TFormFields } from '../Forms/types';

export const DesktopForm: React.FC<IDesktopForm> = (props: IDesktopForm) => {
  const { title, body, icon, accent = 'primary', toggleLayout, formRef, onSubmit } = props;
  const titleMe = useTitle();
  const ctx = useFormState();

  function goBack() {
    ctx.selectedIndex.value !== null && ctx.merge({ selectedName: null, selectedIndex: null });
    ctx.showSuccess.get() && ctx.showSuccess.set(false);
    toggleLayout(0);
  }

  async function handleSubmit<F extends TFormTypes, D extends TFormFields<F>>(form: F, data: D) {
    await submitForm(form, data);
    if (typeof onSubmit === 'function') {
      onSubmit();
    }
    !ctx.showSuccess.get() && ctx.showSuccess.set(true);
  }

  return (
    <Grid
      boxSize="100%"
      templateColumns={{ base: '30% 1fr 30%', lg: '20% 1fr 20%' }}
      templateRows={{ base: '10% 15% 1fr', lg: '10% 5% 1fr' }}
      templateAreas={`"back title icon" "body body body" "form form form"`}
    >
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
        {!ctx.showSuccess.value && ctx.selectedName.value === 'Support' ? (
          <SupportForm ref={formRef} accent={accent} onSubmit={handleSubmit} />
        ) : !ctx.showSuccess.value && ctx.selectedName.value === 'Sales' ? (
          <SalesForm ref={formRef} accent={accent} onSubmit={handleSubmit} />
        ) : ctx.showSuccess.value ? (
          <Success>
            {ctx.selectedName.value === 'Support'
              ? ctx.form.Support.successMessage.value
              : ctx.selectedName.value === 'Sales'
              ? ctx.form.Sales.successMessage.value
              : null}
          </Success>
        ) : null}
      </Center>
    </Grid>
  );
};

import { useCallback } from "react";
import { Flex, Center, Heading, IconButton, Grid } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";
import { DynamicIcon } from "~/components";
import { useContactForm } from "../state";
import { SalesForm, SupportForm } from "../forms";
import { submitForm } from "../submitters";
import { Success } from "../success";

import type { DesktopFormProps } from "./types";
import type { FormType, FormFieldValue } from "../forms/types";

export const DesktopForm = (props: DesktopFormProps) => {
  const { title, body, icon, accent = "primary", toggleLayout, formRef, onSubmit } = props;
  const fnTitle = useTitleCase();
  const formState = useContactForm();

  const goBack = useCallback(() => {
    formState.reset();
    toggleLayout(0);
  }, [toggleLayout, formState]);

  const handleSubmit = useCallback(
    async <F extends FormType, D extends FormFieldValue<F>>(form: F, data: D) => {
      await submitForm(form, data);
      if (typeof onSubmit === "function") {
        onSubmit();
      }
      formState.toggleSuccess(true);
    },
    [onSubmit, formState],
  );

  return (
    <Grid
      boxSize="100%"
      templateColumns={{ base: "30% 1fr 30%", lg: "20% 1fr 20%" }}
      templateRows={{ base: "10% 15% 1fr", lg: "10% 5% 1fr" }}
      templateAreas={`"back title icon" "body body body" "form form form"`}
    >
      <Flex p={2} align="flex-start" justify="flex-start" gridArea="back">
        <IconButton
          variant="ghost"
          aria-label="Back"
          icon={<DynamicIcon icon={{ bi: "BiLeftArrow" }} />}
          onClick={goBack}
        />
      </Flex>
      <Flex p={2} align="flex-start" justify="flex-end" gridArea="icon">
        {icon}
      </Flex>
      <Center p={2} gridArea="title" flexDirection="column" textAlign="center" pt={4} fontSize="sm">
        <Heading as="h3" fontSize="lg">
          {fnTitle(title)}
        </Heading>
      </Center>
      <Center p={2} gridArea="body" flexDirection="column" textAlign="center" pt={4} fontSize="sm">
        {body}
      </Center>
      <Center width="100%" gridArea="form" alignItems={{ base: "flex-start", lg: "center" }}>
        {formState.shouldRender("Support") ? (
          <SupportForm ref={formRef} accent={accent} onSubmit={handleSubmit} />
        ) : formState.shouldRender("Sales") ? (
          <SalesForm ref={formRef} accent={accent} onSubmit={handleSubmit} />
        ) : formState.showSuccess ? (
          <Success>{formState.successMessage}</Success>
        ) : null}
      </Center>
    </Grid>
  );
};

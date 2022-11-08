import { useCallback } from "react";

import { Flex, Center, Heading, IconButton, Grid } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { DynamicIcon, GenericForm, RichText } from "~/components";
import { is } from "~/lib";

import { useContactForm, useSelectedForm } from "../state";
import { Success } from "../success";
import { separateFormFields } from "../util";

import type { DesktopFormProps } from "./types";

export const DesktopForm = (props: DesktopFormProps) => {
  const { title, body, icon, toggleLayout, formRef } = props;
  const fnTitle = useTitleCase();
  const formState = useContactForm();
  const selected = useSelectedForm();

  const goBack = useCallback(() => {
    formState.reset();
    toggleLayout(0);
  }, [toggleLayout, formState]);

  const { button, fields } = separateFormFields(selected);

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
        <RichText content={body} />
      </Center>
      <Center width="100%" gridArea="form" alignItems={{ base: "flex-start", lg: "center" }}>
        {is(selected) && is(button) ? (
          !formState.showSuccess ? (
            <GenericForm
              name={title}
              ref={formRef}
              fields={fields}
              colorScheme={selected.color}
              onSuccess={() => formState.toggleSuccess(true)}
            />
          ) : (
            <Success>
              <RichText content={button.alert?.body} />
            </Success>
          )
        ) : null}
      </Center>
    </Grid>
  );
};

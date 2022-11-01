import { useCallback, useState } from "react";

import { Button as ChakraButton, Center, Flex, IconButton, Heading, Grid } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { DynamicIcon, Modal, RichText, GenericForm } from "~/components";
import { is } from "~/lib";

import { useContactForm } from "../state";
import { Success } from "../success";
import { separateFormFields } from "../util";

import type { MobileFormProps } from "./types";

export const MobileForm = (props: MobileFormProps) => {
  const { title, body, icon, onToggle, formRef, onSubmit, onClose, colorScheme } = props;

  const formState = useContactForm();
  const fnTitle = useTitleCase();
  const [showSuccess, setSuccess] = useState(false);

  const goBack = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      formState.reset();
      onToggle();
    },
    [onToggle, formState],
  );

  // const handleSubmit = useCallback(
  //   async <F extends FormType, D extends FormFieldValue<F>>(form: F, data: D) => {
  //     await submitForm(form, data);
  //     if (typeof onSubmit === "function") {
  //       onSubmit();
  //     }
  //     !showSuccess && setSuccess(true);
  //     setTimeout(() => onToggle(), 1500);
  //   },
  //   [onSubmit, onToggle, showSuccess],
  // );

  const handleSubmit = useCallback(() => {
    if (typeof onSubmit === "function") {
      onSubmit();
    }
    !showSuccess && setSuccess(true);
    setTimeout(() => onToggle(), 1500);
  }, [onSubmit, onToggle, showSuccess]);

  const { button, fields } = separateFormFields(formState.selected);

  return (
    <Modal
      isOpen
      noOverlay
      id={title}
      size="full"
      scrollInside
      hideCloseButton
      onClose={onClose}
      bodyProps={{ overflow: "unset", mb: 8 }}
      containerProps={{ m: 2, width: "96vw", minH: "98vh", pb: 32 }}
      body={
        <Grid
          boxSize="100%"
          templateColumns="30% 1fr 30%"
          templateRows="10% 15% 1fr 10%"
          templateAreas={`"back title icon" "body body body" "form form form" "button button button"`}
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
          <Center
            p={2}
            pt={4}
            fontSize="sm"
            gridArea="title"
            textAlign="center"
            flexDirection="column"
          >
            <Heading as="h3" fontSize="lg">
              {fnTitle(title)}
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
            <RichText>{body}</RichText>
          </Center>
          <Center width="100%" gridArea="form" alignItems="flex-start">
            {is(formState.selected) && is(button) ? (
              !formState.showSuccess ? (
                <GenericForm
                  ref={formRef}
                  fields={fields}
                  onSubmit={handleSubmit}
                  colorScheme={formState.selected.color}
                />
              ) : (
                <Success>
                  <RichText>{button.alert?.body.raw}</RichText>
                </Success>
              )
            ) : null}
          </Center>
          <Center py={8} px={2} gridArea="button">
            <ChakraButton
              w="100%"
              type="submit"
              colorScheme={colorScheme}
              // onClick={handleFormSubmit}
              variant={button?.variant ? button.variant : undefined}
            >
              {fnTitle(button?.text ?? "Submit")}
            </ChakraButton>
          </Center>
        </Grid>
      }
    />
  );
};

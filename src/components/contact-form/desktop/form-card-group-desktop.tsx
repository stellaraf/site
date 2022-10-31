import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";

import { useRouter } from "next/router";

import { Center, Stack, Button as ChakraButton } from "@chakra-ui/react";
import { motion, AnimatePresence, LayoutGroup, useCycle } from "framer-motion";
import { useTitleCase } from "use-title-case";

import { Button, Icon } from "~/components";
import { useGoogleAnalytics } from "~/hooks";

import { useContactFormCtx } from "../context";
import { FormCard, FormCardBody } from "../form-card";
import { FormCardContent } from "../form-card-content";
import { isValidFormQuery } from "../guards";
import { useContactForm } from "../state";
import { separateFormFields } from "../util";
import { DesktopForm } from "./desktop-form";

import type { MotionItems } from "../types";
import type { Variants } from "framer-motion";

// Make Chakra-UI components into Framer-Motion components for fewer components in the tree.
const Container = motion(Stack);
const AnimatedCard = motion(FormCard);
const AnimatedCenter = motion(Center);

export const DFormCardGroup = () => {
  const cards = useContactFormCtx();
  const formState = useContactForm();
  const fnTitle = useTitleCase();
  const { pathname, query } = useRouter();
  const { trackModal } = useGoogleAnalytics();

  // Static desktop sizes for cards layout
  const cardSizes = { width: "20rem", minHeight: "28rem" };
  // Static desktop sizes for form layout
  const formSizes = {
    width: "66rem",
    minHeight: "32rem",
    height: "100%",
    px: 8,
  };

  const [layout, toggleLayout] = useCycle("cards", "form");

  // Each card carries a lifecycle of two states:
  //    - cards: a row of 3 cards displaying each type method of contact/communication.
  //    - form: a single larger card containing a contact form.
  // When clicking a card's button, it should appear that the other cards disappear,
  // and the selected card expands to take over the formerly occupied space.
  const items: Variants = {
    cards: {
      // The cards layout is static - each card should be displayed and look about the same.
      opacity: 1,
      width: cardSizes.width,
      display: "flex",
    },

    /**
     * Each card, via the `custom` prop, sends the array index number of itself and the array
     * index number of the currently selected card (or null, if one hasn't been selected).
     *
     * If the currently selected card index doesn't match the card's index, it disappears via
     * animated changes to opacity (fade out), width (shrink), and display (space) props.
     */
    form: (i: MotionItems) => {
      const { idx, current } = i;
      return {
        opacity: idx === current ? 1 : current === null ? 1 : 0,
        width: idx === current ? formSizes.width : "0rem",
        transition: { duration: 0.25 },
        display: idx === current ? "flex" : "none",
      };
    },
  };

  /**
   * If valid query parameters are passed in the URL, e.g. /contact?form=sales or
   * /contact?form=support, automatically load the corresponding form.
   */
  useEffect(() => {
    if (isValidFormQuery(query)) {
      const match = cards.find(c => c.title.toLowerCase() === query.form.toLowerCase());
      if (typeof match !== "undefined") {
        formState.setSelected(match.title);
        toggleLayout(1);
        trackModal(`${pathname}/form-${match.title.toLowerCase().replace(/\s/gi, "-")}`);
      }
    }
  }, [query]);

  return (
    <Container
      minH="lg"
      zIndex={1}
      spacing={layout === "cards" ? 12 : 0}
      align="stretch"
      direction="row"
      animate={layout}
    >
      <AnimatePresence>
        {cards.map((card, i) => {
          const { icon, color: iconColor, button, title, body, ...cardRest } = card;

          const { button: formButton, fields } = separateFormFields(card);

          // const isForm = layout === "form" && formState.selected?.title === iconName;
          const isForm =
            fields.length > 0 && (typeof button.link === "undefined" || button.link === null);

          // Send the same component to both sub-components (FormCardContent/FormContainer). Since
          // it's the same component and wrapped by a framer component, it will be animated when
          // moved from one location to another.
          const renderedIcon = (
            <motion.div>
              <Icon icon={{ [icon.family]: icon.name }} color={iconColor} />
            </motion.div>
          );

          /**
           * If the card is for a Sales or Support form, the click handler sets the context state
           * to reflect the selected form and toggles the framer layout for animation purposes.
           * The Docs link should just be a standard router link to the /docs route.
           */
          function handleClick(event: MouseEvent): void {
            if (isForm) {
              event.preventDefault();
              formState.setSelected(title);
              toggleLayout();
              trackModal(`${pathname}/form-${title.replace(/\s/gi, "-").toLowerCase()}`);
            }
          }

          // Create a ref object to pass to each form. Because the submit button lives outside the
          // form for layout reasons, it needs to explicitly call the form's submit method.
          const formRef = useRef<{ submit: () => void }>(null);

          function handleFormSubmit(): void {
            formRef.current?.submit();
          }

          // Button component & props need to change based on the form's current lifecycle state
          // ('cards' vs. 'form').
          const cardsButton = (
            <Button
              w="100%"
              colorScheme={iconColor}
              href={isForm ? undefined : button.link!}
              onClick={isForm ? handleClick : undefined}
            >
              {fnTitle(button.text)}
            </Button>
          );
          const renderedFormButton = (
            <ChakraButton
              w="100%"
              maxW="50%"
              type="submit"
              colorScheme={iconColor}
              onClick={handleFormSubmit}
              variant={formButton?.variant ? formButton.variant : undefined}
            >
              {fnTitle(formButton?.text ?? "Submit")}
            </ChakraButton>
          );

          return (
            <motion.div
              // Animate each card from the initial position of offscreen-right to center.
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              // Stagger each card by index x interval.
              transition={{ delay: i * 0.1 }}
              // Animate component unmount by moving it offscreen-left.
              exit={{ opacity: 0, x: "-100%" }}
              key={`cardWrapper${i}`}
            >
              <AnimatedCard
                layout
                variants={items}
                custom={{
                  idx: i,
                  current: cards.findIndex(c => c.title === formState.selected?.title),
                }}
                initial={false}
                // Framer requires a unique key per animated layout component for tracking.
                key={`card${i}`}
                // Apply static styles based on current layout state.
                {...(layout === "form" ? formSizes : cardSizes)}
              >
                <FormCardBody>
                  {/**
                   * The card itself remains the same component during both 'cards' and 'layout'
                   * states. However, internal content changes. This makes the card appear to
                   * simply expand and show relevant content, rather than switching to another
                   * page or component.
                   */}
                  <LayoutGroup>
                    {layout === "cards" ? (
                      <FormCardContent
                        index={i}
                        body={body}
                        title={title}
                        button={button}
                        icon={renderedIcon}
                        toggleLayout={toggleLayout}
                        {...cardRest}
                      />
                    ) : (
                      <DesktopForm
                        title={title}
                        body={body.raw}
                        formRef={formRef}
                        icon={renderedIcon}
                        toggleLayout={toggleLayout}
                        {...cardRest}
                      />
                    )}
                  </LayoutGroup>
                </FormCardBody>
                {
                  // The button also remains the same component throughout the lifecycle changes.
                  // Wrapping it in animation makes it appear to move around with the card as states
                  // change.
                }
                <AnimatedCenter
                  layoutId={`button${i}`}
                  width="100%"
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  {layout === "form" && !formState.showSuccess
                    ? renderedFormButton
                    : formState.showSuccess
                    ? null
                    : cardsButton}
                </AnimatedCenter>
              </AnimatedCard>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Container>
  );
};

import {
  // useEffect,
  useRef,
} from "react";

import { useRouter } from "next/router";

import {
  // Button as ChakraButton,
  Center,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useTitleCase } from "use-title-case";

import { Button, Icon } from "~/components";
import { useGoogleAnalytics } from "~/hooks";

import { useContactFormCtx } from "../context";
import { FormCard, FormCardBody } from "../form-card";
import { FormCardContent } from "../form-card-content";
import { useContactForm } from "../state";
import { useFormQuery } from "../use-form-query";
import { MobileForm } from "./mobile-form";

const Container = motion(Stack);
const AnimatedCenter = motion(Center);

/**
 * See the OptionsDesktop component for more detailed information. The OptionsMobile component
 * is meant to be a little more simple and its layout is more vertical than horizontal, but the
 * rest of the logic is largely the same. Differences are notated below.
 */
export const MFormCardGroup = () => {
  const cards = useContactFormCtx();
  const formState = useContactForm();
  const titleMe = useTitleCase();
  const { pathname } = useRouter();
  const { trackModal } = useGoogleAnalytics();

  const formSizes = { minHeight: "48rem", height: "100%" };

  const { isOpen, onToggle, onClose } = useDisclosure();

  // If valid query parameters are passed in the URL, e.g. /contact?form=sales or
  // /contact?form=support, automatically load the corresponding form.
  useFormQuery({ cards, setSelected: formState.setSelected, toggleLayout: onToggle, trackModal });

  return (
    <Container minH="3xl" zIndex={1} spacing={12} align="stretch" direction="column">
      <AnimatePresence>
        {cards.map((card, i) => {
          const {
            icon,
            color: iconColor,
            button: cardButton,
            title,
            body,
            fields,
            ...cardRest
          } = card;

          const isFormLayout = isOpen && formState.selected?.title === title;

          const isForm =
            fields.length > 0 &&
            (typeof cardButton.link === "undefined" || cardButton.link === null);

          const iconProps = isFormLayout ? { size: 12, ml: 4 } : {};
          const renderedIcon = (
            <motion.div layoutId={title}>
              <Icon icon={{ [icon.family]: icon.name }} color={iconColor} {...iconProps} />
            </motion.div>
          );

          const handleClick = (event: React.MouseEvent) => {
            if (isForm) {
              event.preventDefault();
              formState.setSelected(title);
              onToggle();
              trackModal(`${pathname}/form-${title.replace(/\s/gi, "-").toLowerCase()}`);
            }
          };

          const formRef = useRef<{ submit: () => void }>(null);

          const cardsButton = (
            <Button
              w="100%"
              colorScheme={iconColor}
              href={isForm ? undefined : cardButton.link!}
              onClick={isForm ? handleClick : undefined}
            >
              {titleMe(cardButton.text)}
            </Button>
          );

          return (
            <motion.div
              // Animate each card from the initial position of offscreen-bottom to center.
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              // Animate component unmount by moving it offscreen-top.
              exit={{ opacity: 0, y: "-100%" }}
              key={`cardWrapper${i}`}
            >
              <FormCard w="20rem" h="100%" px={isFormLayout ? 4 : undefined}>
                <FormCardBody {...(isFormLayout && formSizes)}>
                  <LayoutGroup>
                    {isFormLayout ? (
                      <MobileForm
                        title={title}
                        body={body.raw}
                        onClose={onClose}
                        formRef={formRef}
                        onToggle={onToggle}
                        icon={renderedIcon}
                        colorScheme={iconColor}
                        {...cardRest}
                      />
                    ) : (
                      <FormCardContent
                        index={i}
                        body={body}
                        title={title}
                        fields={fields}
                        button={cardButton}
                        icon={renderedIcon}
                        {...cardRest}
                      />
                    )}
                  </LayoutGroup>
                </FormCardBody>
                <AnimatedCenter layoutId={`button${i}`} width="100%">
                  {cardsButton}
                </AnimatedCenter>
              </FormCard>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Container>
  );
};

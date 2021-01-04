import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Center, Stack, Button as ChakraButton } from '@chakra-ui/react';
import { motion, AnimatePresence, AnimateSharedLayout, useCycle } from 'framer-motion';
import { Button, Icon } from '~/components';
import { useGoogleAnalytics, useTitle } from '~/hooks';
import { Card, CardBody } from '../Card';
import { ContactOption } from '../ContactOption';
import { queryIsForm } from '../guards';
import { useFormState } from '../state';
import { DesktopForm } from './DesktopForm';

import type { MouseEvent } from 'react';
import type { IconType } from '@meronex/icons';
import type { Variants } from 'framer-motion';
import type { IOptionsResponsive, IMotionItems, TSupportedFormQuery } from '../types';
import type { FormHandlers } from '../Forms/types';

// Use Next.js async importing for performance.
const Docs = dynamic<IconType>(() => import('@meronex/icons/cg').then(i => i.CgNotes));
const Support = dynamic<IconType>(() => import('@meronex/icons/bs').then(i => i.BsPeopleFill));
const Sales = dynamic<IconType>(() =>
  import('@meronex/icons/bs').then(i => i.BsFillPersonLinesFill),
);

// Make Chakra-UI components into Framer-Motion components for fewer components in the tree.
const Container = motion.custom(Stack);
const AnimatedCard = motion.custom(Card);
const AnimatedCenter = motion.custom(Center);

const iconMap = { Support, Sales, Docs };

export const OptionsDesktop: React.FC<IOptionsResponsive> = (props: IOptionsResponsive) => {
  const { cards } = props;
  const ctx = useFormState();
  const titleMe = useTitle();
  const { pathname, query } = useRouter();
  const { trackModal } = useGoogleAnalytics();

  // Static desktop sizes for cards layout
  const cardSizes = { width: '20rem', minHeight: '28rem' };
  // Static desktop sizes for form layout
  const formSizes = { width: '66rem', minHeight: '32rem', height: '100%', px: 8 };

  const [layout, toggleLayout] = useCycle('cards', 'form');

  /**
   * Each card carries a lifecycle of two states:
   *    - cards: a row of 3 cards displaying each type method of contact/communication.
   *    - form: a single larger card containing a contact form.
   * When clicking a card's button, it should appear that the other cards disappear,
   * and the selected card expands to take over the formerly occupied space.
   */
  const items: Variants = {
    cards: {
      // The cards layout is static - each card should be displayed and look about the same.
      opacity: 1,
      width: cardSizes.width,
      display: 'flex',
    },
    form: (i: IMotionItems) => {
      /**
       * Each card, via the `custom` prop, sends the array index number of itself and the array
       * index number of the currently selected card (or null, if one hasn't been selected).
       *
       * If the currently selected card index doesn't match the card's index, it disappears via
       * animated changes to opacity (fade out), width (shrink), and display (space) props.
       */
      const { idx, current } = i;
      return {
        opacity: idx === current ? 1 : current === null ? 1 : 0,
        width: idx === current ? formSizes.width : '0rem',
        transition: { duration: 0.25 },
        display: idx === current ? 'flex' : 'none',
      };
    },
  };

  /**
   * If valid query parameters are passed in the URL, e.g. /contact?form=sales or
   * /contact?form=support, automatically load the corresponding form.
   */
  useEffect(() => {
    if (queryIsForm(query)) {
      const selectedIndex = cards.map(c => c.title.toLowerCase()).indexOf(query.form);
      const selectedName = cards[selectedIndex].title as TSupportedFormQuery['form'];
      ctx.selectedName.value !== selectedName && ctx.merge({ selectedName, selectedIndex });
      toggleLayout(1);
      trackModal(`${pathname}/form-${selectedName.toLowerCase()}`);
    }
  }, [query]);

  return (
    <Container
      minH="lg"
      zIndex={1}
      spacing={layout === 'cards' ? 12 : 0}
      align="stretch"
      direction="row"
      animate={layout}
    >
      <AnimatePresence>
        {cards.map((card, i) => {
          const { icon: iconName, color: iconColor, buttonText, form, ...cardRest } = card;

          /**
           * Add the contact card's form config to the form context state so it can be consumed in
           * the nested form component.
           */
          if (iconName !== 'Docs' && typeof form !== 'undefined') {
            ctx.form.merge({ [iconName]: form });
          }

          const isForm = layout === 'form' && ctx.selectedIndex.value === i;
          const iconProps = isForm ? { size: 12, ml: 4 } : {};

          /**
           * Send the same component to both sub-components (ContactOption/FormContainer). Since
           * it's the same component and wrapped by a framer component, it will be animated when
           * moved from one location to another.
           * */
          const icon = (
            <motion.div layoutId={iconName}>
              <Icon icon={iconMap[iconName]} color={iconColor} {...iconProps} />
            </motion.div>
          );
          /**
           * If the card is for a Sales or Support form, the click handler sets the context state
           * to reflect the selected form name & index number and toggles the framer layout for
           * animation purposes. The Docs link should just be a standard router link to the /docs
           * route.
           */
          const handleClick = (e: MouseEvent) => {
            if (['Support', 'Sales'].includes(iconName)) {
              e.preventDefault();
              ctx.selectedName.value !== iconName &&
                ctx.merge({ selectedName: iconName, selectedIndex: i });
              toggleLayout();
              trackModal(`${pathname}/form-${iconName.toLowerCase()}`);
            }
          };
          /**
           * Create a ref object to pass to each form. Because the submit button lives outside the
           * form for layout reasons, it needs to explicitly call the form's submit method.
           */
          const formRef = useRef<FormHandlers>(Object());
          const handleFormSubmit = () => formRef.current.submit();
          /**
           * Button component & props need to change based on the form's current lifecycle state
           * ('cards' vs. 'form').
           */
          const cardsButton = (
            <Button
              w="100%"
              colorScheme={iconColor}
              href={iconName === 'Docs' ? '/docs' : undefined}
              onClick={iconName === 'Docs' ? undefined : handleClick}
            >
              {titleMe(buttonText)}
            </Button>
          );
          const formButton = (
            <ChakraButton
              w="100%"
              maxW="50%"
              type="submit"
              colorScheme={iconColor}
              onClick={handleFormSubmit}
            >
              {titleMe(form?.buttonSubmit ?? 'Submit')}
            </ChakraButton>
          );
          return (
            <motion.div
              // Animate each card from the initial position of offscreen-right to center.
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              // Stagger each card by index x interval.
              transition={{ delay: i * 0.1 }}
              // Animate component unmount by moving it offscreen-left.
              exit={{ opacity: 0, x: '-100%' }}
              key={`cardWrapper${i}`}
            >
              <AnimatedCard
                layout
                variants={items}
                custom={{ idx: i, current: ctx.selectedIndex.value }}
                initial={false}
                // Framer requires a unique key per animated layout component for tracking.
                key={`card${i}`}
                // Apply static styles based on current layout state.
                {...(isForm ? formSizes : cardSizes)}
              >
                <CardBody>
                  {/**
                   * The card itself remains the same component during both 'cards' and 'layout'
                   * states. However, internal content changes. This makes the card appear to
                   * simply expand and show relevant content, rather than switching to another
                   * page or component.
                   */}
                  <AnimateSharedLayout>
                    {layout === 'cards' ? (
                      <ContactOption
                        index={i}
                        icon={icon}
                        iconName={iconName}
                        toggleLayout={toggleLayout}
                        {...cardRest}
                      />
                    ) : (
                      <DesktopForm
                        icon={icon}
                        formRef={formRef}
                        accent={iconColor}
                        toggleLayout={toggleLayout}
                        {...cardRest}
                      />
                    )}
                  </AnimateSharedLayout>
                </CardBody>
                {/**
                 * The button also remains the same component throughout the lifecycle changes.
                 * Wrapping it in animation makes it appear to move around with the card as states
                 * change.
                 */}
                <AnimatedCenter
                  layoutId={`button${i}`}
                  width="100%"
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  {layout === 'form' && !ctx.showSuccess.value
                    ? formButton
                    : ctx.showSuccess.value
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

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Button as ChakraButton, Center, Stack, useDisclosure } from '@chakra-ui/react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useTitleCase } from 'use-title-case';
import { Button, Icon } from '~/components';
import { useGoogleAnalytics } from '~/hooks';
import { Card, CardBody } from '../Card';
import { ContactOption } from '../ContactOption';
import { useContactFormCtx } from '../context';
import { queryIsForm } from '../guards';
import { useContactForm } from '../state';
import { MobileForm } from './MobileForm';

import type { MouseEvent } from 'react';
import type { IconType } from '@meronex/icons';
import type { FormHandlers } from '../Forms/types';

const Docs = dynamic<IconType>(() => import('@meronex/icons/cg').then(i => i.CgNotes));
const Support = dynamic<IconType>(() => import('@meronex/icons/bs').then(i => i.BsPeopleFill));
const Sales = dynamic<IconType>(() =>
  import('@meronex/icons/bs').then(i => i.BsFillPersonLinesFill),
);

const Container = motion(Stack);
const AnimatedCenter = motion(Center);

const iconMap = { Support, Sales, Docs };

/**
 * See the OptionsDesktop component for more detailed information. The OptionsMobile component
 * is meant to be a little more simple and its layout is more vertical than horizontal, but the
 * rest of the logic is largely the same. Differences are notated below.
 */
export const OptionsMobile = (): JSX.Element => {
  const cards = useContactFormCtx();
  const formState = useContactForm();
  const titleMe = useTitleCase();
  const { pathname, query } = useRouter();
  const { trackModal } = useGoogleAnalytics();

  const formSizes = { minHeight: '48rem', height: '100%' };

  const { isOpen, onToggle, onClose } = useDisclosure();

  // If valid query parameters are passed in the URL, e.g. /contact?form=sales or
  // /contact?form=support, automatically load the corresponding form.
  useEffect(() => {
    if (queryIsForm(query)) {
      const selected = cards.find(c => c.icon.toLowerCase() === query.form.toLowerCase());
      if (typeof selected !== 'undefined') {
        formState.setSelected(selected.icon);
        onToggle();
        trackModal(`${pathname}/form-${selected.icon.toLowerCase()}`);
      }
    }
  }, [query]);

  return (
    <Container minH="3xl" zIndex={1} spacing={12} align="stretch" direction="column">
      <AnimatePresence>
        {cards.map((card, i) => {
          const { icon: iconName, color: iconColor, buttonText, form, ...cardRest } = card;

          const isForm = isOpen && formState.selected === iconName;

          const iconProps = isForm ? { size: 12, ml: 4 } : {};
          const icon = (
            <motion.div layoutId={iconName}>
              <Icon icon={iconMap[iconName]} color={iconColor} {...iconProps} />
            </motion.div>
          );

          const handleClick = (e: MouseEvent) => {
            if (['Support', 'Sales'].includes(iconName)) {
              e.preventDefault();
              formState.setSelected(iconName);
              onToggle();
              trackModal(`${pathname}/form-${iconName.toLowerCase()}`);
            }
          };

          const formRef = useRef<FormHandlers>(Object());
          const handleFormSubmit = () => formRef.current.submit();

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
            <ChakraButton w="100%" type="submit" colorScheme={iconColor} onClick={handleFormSubmit}>
              {titleMe(form?.buttonSubmit ?? 'Submit')}
            </ChakraButton>
          );

          return (
            <motion.div
              // Animate each card from the initial position of offscreen-bottom to center.
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              // Animate component unmount by moving it offscreen-top.
              exit={{ opacity: 0, y: '-100%' }}
              key={`cardWrapper${i}`}
            >
              <Card w="20rem" h="100%" px={isForm ? 4 : undefined}>
                <CardBody {...(isForm && formSizes)}>
                  <AnimateSharedLayout>
                    {isForm ? (
                      <MobileForm
                        onClose={onClose}
                        button={formButton}
                        icon={icon}
                        formRef={formRef}
                        accent={iconColor}
                        onToggle={onToggle}
                        {...cardRest}
                      />
                    ) : (
                      <ContactOption index={i} icon={icon} iconName={iconName} {...cardRest} />
                    )}
                  </AnimateSharedLayout>
                </CardBody>
                <AnimatedCenter layoutId={`button${i}`} width="100%">
                  {cardsButton}
                </AnimatedCenter>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Container>
  );
};

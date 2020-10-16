import * as React from 'react';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Button as ChakraButton, Center, Stack, useDisclosure } from '@chakra-ui/core';
import { motion, AnimatePresence, AnimateSharedLayout, useCycle } from 'framer-motion';
import { Button } from 'site/components';
import { useColorValue } from 'site/context';
import { useGoogleAnalytics, useTitle } from 'site/hooks';
import { Card, CardBody } from '../Card';
import { ContactOption } from '../ContactOption';
import { Icon } from '../Icon';
import { useFormState } from '../state';
import { MobileForm } from './MobileForm';

import type { MouseEvent } from 'react';
import type { StackProps, FlexProps } from '@chakra-ui/core';
import type { IconType } from '@meronex/icons';
import type { Animated } from 'site/types';
import type { IOptionsResponsive } from '../types';
import type { FormHandlers } from '../Forms/types';

const Docs = dynamic<IconType>(() => import('@meronex/icons/cg').then(i => i.CgNotes));
const Support = dynamic<IconType>(() => import('@meronex/icons/bs').then(i => i.BsPeopleFill));
const Sales = dynamic<IconType>(() =>
  import('@meronex/icons/bs').then(i => i.BsFillPersonLinesFill),
);

const Container = (props: Animated<StackProps>) => <Stack as={motion.div} {...props} />;
const AnimatedCenter = (props: Animated<FlexProps>) => <Center as={motion.div} {...props} />;

const iconMap = { Support, Sales, Docs };

/**
 * See the OptionsDesktop component for more detailed information. The OptionsMobile component
 * is meant to be a little more simple and its layout is more vertical than horizontal, but the
 * rest of the logic is largely the same. Differences are notated below.
 */
export const OptionsMobile = (props: IOptionsResponsive) => {
  const { cards, ...rest } = props;
  const ctx = useFormState();
  const titleMe = useTitle();
  const { pathname } = useRouter();
  const { trackModal } = useGoogleAnalytics();

  const formSizes = { minHeight: '48rem', height: '100%' };

  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Container minH="3xl" zIndex={1} spacing={12} align="stretch" direction="column" {...rest}>
      <AnimatePresence>
        {cards.map((card, i) => {
          const { icon: iconName, color: iconColor, buttonText, form, ...cardRest } = card;

          if (iconName !== 'Docs' && typeof form !== 'undefined') {
            ctx.form.merge({ [iconName]: form });
          }

          const isForm = isOpen && ctx.selectedIndex.value === i;

          const iconBg = useColorValue(`original.${iconColor}`, `${iconColor}.300`);
          const iconProps = isForm ? { size: 12, ml: 4 } : {};
          const icon = (
            <motion.div layoutId={iconName}>
              <Icon icon={iconMap[iconName]} color={iconBg} {...iconProps} />
            </motion.div>
          );

          const handleClick = (e: MouseEvent) => {
            if (['Support', 'Sales'].includes(iconName)) {
              e.preventDefault();
              ctx.selectedName.value !== iconName &&
                ctx.merge({ selectedName: iconName, selectedIndex: i });
              onToggle();
              trackModal(`${pathname}/form-${iconName.toLowerCase()}`);
            }
          };

          const btnProps = Object();
          btnProps.width = '100%';
          if (!isForm) {
            btnProps.children = titleMe(buttonText);
            if (iconName === 'Docs') {
              btnProps.href = '/docs';
            } else {
              btnProps.onClick = handleClick;
            }
          } else {
            btnProps.type = 'submit';
            btnProps.children = 'Submit';
          }
          const formRef = useRef<FormHandlers>(Object());
          const handleFormSubmit = () => formRef.current.submit();

          const cardsButton = (
            <Button
              w="100%"
              colorScheme={iconColor}
              href={iconName === 'Docs' ? '/docs' : undefined}
              onClick={iconName === 'Docs' ? undefined : handleClick}>
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
              key={`cardWrapper${i}`}>
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

import { memo } from "react";

import { useRouter } from "next/router";

import { Center, Heading, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { TitleCase } from "use-title-case";

import { AnimatedDiv, Divider } from "~/components";
import { useConfig } from "~/context";

import { Action } from "./action";
import { useRandomActions } from "./util";

import type { Actions } from "~/queries";
import type { CallToActionProps, MemoCallToActionProps } from "./types";

export const _CallToActionContainer = (props: MemoCallToActionProps) => {
  const { actions: rawActions, currentPath, ...rest } = props;

  const { callToAction } = useConfig();

  // Remove actions from the array if they are contained within the list of exclusions, and only
  // filter out actions if we're NOT on the home page.
  const filteredActions = rawActions.reduce<Actions>((filtered, action) => {
    if (currentPath !== "/") {
      const pathName = currentPath.replace("/", "");
      const pattern = new RegExp(`^${pathName}.*`, "g");
      if (!pattern.test(action.page?.slug ?? "")) {
        filtered.push(action);
      }
    } else {
      filtered.push(action);
    }
    return filtered;
  }, []);

  const actions = useRandomActions(filteredActions, callToAction.shown);

  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-100px" });

  return (
    <>
      <VStack
        py={24}
        minH="30vh"
        spacing={12}
        className="__actions"
        layerStyle="container"
        {...rest}
      >
        <Center>
          <Heading as="h5" fontSize={{ base: "lg", lg: "2xl" }}>
            <TitleCase>{callToAction.title}</TitleCase>
          </Heading>
        </Center>
        <Wrap
          ref={ref}
          spacing={8}
          justify="center"
          overflow="visible"
          direction={{ base: "column", md: "row" }}
        >
          {inView &&
            actions.map((action, i) => (
              <WrapItem key={action.title}>
                <AnimatedDiv
                  zIndex={1}
                  animate={{ x: 0 }}
                  key={action.title}
                  initial={{ x: "100%" }}
                  whileTap={{ y: "-3%" }}
                  whileHover={{ y: "-3%" }}
                  transition={{ delay: i * 0.075 }}
                >
                  <Action {...action} />
                </AnimatedDiv>
              </WrapItem>
            ))}
        </Wrap>
      </VStack>
    </>
  );
};

/**
 * Memoize the CTA container so that it doesn't re-render on every color-mode change. Because the
 * visibility of the <SectionDivider /> is dependent on dark-mode, this is expected, but a little
 * annoying.
 */
const CallToActionContainer = memo(
  _CallToActionContainer,
  (prev, next) => prev.currentPath === next.currentPath,
);

export const CallToAction = (props: CallToActionProps) => {
  const { asPath: currentPath } = useRouter();
  return (
    <>
      <CallToActionContainer currentPath={currentPath} {...props} />
      <Divider straight opacity={0} _dark={{ opacity: 1 }} />
    </>
  );
};

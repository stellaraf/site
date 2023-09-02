import dynamic from "next/dynamic";

import { useBreakpointValue } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import { Footer, DHeader, MHeader, RickRoll, Controls, CallToAction } from "~/components";
import { useMobile } from "~/hooks";

import { Wrapper, Root, Main } from "./common";

import type { BoxProps } from "@chakra-ui/react";
import type { FooterGroups, Actions } from "~/queries";

const Stars = dynamic<BoxProps>(() => import("~/components").then(i => i.Stars));

interface SiteLayoutProps {
  footerGroups: FooterGroups;
  actions: Actions;
  children: React.ReactNode;
}

export const SiteLayout = (props: SiteLayoutProps) => {
  const { children, footerGroups, actions } = props;

  const isMobile = useMobile();

  const bp = useBreakpointValue({
    base: "Base",
    md: "Medium",
    lg: "Large",
    xl: "X-Large",
    "2xl": "XX-Large",
  });

  if (process.env.NODE_ENV === "development" && typeof bp !== "undefined") {
    console.log(
      `%cBreakpoint%c${bp}`,
      "background: pink; color: black; padding: 0.5rem; font-size: 0.75rem;",
      "background: black; color: pink; padding: 0.5rem; font-size: 0.75rem; font-weight: bold;",
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Wrapper>
        {isMobile ? <MHeader /> : <DHeader />}
        <Main>
          <Root>{children}</Root>
        </Main>
        <CallToAction actions={actions} />
        <Footer groups={footerGroups} />
        {!isMobile && <Controls.Desktop />}
        <Stars />
        <RickRoll />
      </Wrapper>
    </AnimatePresence>
  );
};

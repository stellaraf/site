import dynamic from "next/dynamic";

import { useBreakpointValue, type BoxProps } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import { Header, Footer, Controls, CallToAction, Preview, type MenuProps } from "~/components";
import { useDraft } from "~/context";
import { useMobile } from "~/hooks";

import { Wrapper, Base, Main } from "./common";

import type { FooterGroups, Actions } from "~/queries";

const Stars = dynamic<BoxProps>(() => import("~/components").then(i => i.Stars));
const RickRoll = dynamic(() => import("~/components/special/rick-roll").then(i => i.RickRoll));

interface SiteLayoutProps {
  footerGroups: FooterGroups;
  actions: Actions;
  children: React.ReactNode;
  menus: MenuProps[];
}

export const SiteLayout = (props: SiteLayoutProps) => {
  const { children, footerGroups, menus, actions } = props;
  const [draft] = useDraft();
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
    <>
      {draft && <Preview />}
      <AnimatePresence mode="wait">
        <Wrapper>
          <Header menus={menus} />
          <Main>
            <Base id="__base">{children}</Base>
          </Main>
          <CallToAction actions={actions} />
          <Footer groups={footerGroups} />
          {!isMobile && <Controls.Desktop />}
          <Stars />
          <RickRoll />
        </Wrapper>
      </AnimatePresence>
    </>
  );
};

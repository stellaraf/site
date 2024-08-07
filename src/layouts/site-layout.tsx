import dynamic from "next/dynamic";

import { type BoxProps, useBreakpointValue } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import {
  CallToAction,
  Controls,
  Footer,
  type FooterGroup,
  Header,
  type MenuProps,
  Preview,
} from "~/components";
import { useDraft } from "~/context";

import { Base, Main, Wrapper } from "./common";

import type { Actions } from "~/queries";

const Stars = dynamic<BoxProps>(() => import("~/components").then(i => i.Stars));
const RickRoll = dynamic(() => import("~/components/special/rick-roll").then(i => i.RickRoll));

interface SiteLayoutProps {
  footers: FooterGroup[][];
  actions: Actions;
  children: React.ReactNode;
  menus: MenuProps[];
}

export const SiteLayout = (props: SiteLayoutProps) => {
  const { children, footers, menus, actions } = props;
  const [draft] = useDraft();

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
          <Footer groups={footers} />
          <Controls.Desktop display={{ base: "none", lg: "flex" }} />
          <Stars />
          <RickRoll />
        </Wrapper>
      </AnimatePresence>
    </>
  );
};

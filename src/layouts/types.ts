import type { FooterGroups, Actions } from "~/queries";

export interface SiteLayoutProps {
  footerGroups: FooterGroups;
  actions: Actions;
  children: React.ReactNode;
  preview: boolean;
}

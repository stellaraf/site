import type { IPartnerPage } from "~/types";

export type PartnerLayoutProps = IPartnerPage["pageData"];

export interface FormResponse {
  success: boolean;
  message: string;
}

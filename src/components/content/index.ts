import { ContentBody as Body } from "./content-body";
import { ContentFeatureGrid as Features } from "./content-feature-grid";
import { ContentForm as Form } from "./content-form";
import { ContentImage as Image } from "./content-image";
import { ContentSection } from "./content-section";
import { ContentSubtitle as Subtitle } from "./content-subtitle";
import { ContentTitle as Title } from "./content-title";
import { ContentUpdatedAt as UpdatedAt } from "./content-updated-at";

export * from "./content-section";

export const Content = {
  Body,
  Form,
  Image,
  Features,
  Subtitle,
  Title,
  UpdatedAt,
  Section: ContentSection,
};

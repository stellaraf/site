import { ContentSection } from "./content-section";
import { ContentBody as Body } from "./content-body";
import { ContentForm as Form } from "./content-form";
import { ContentImage as Image } from "./content-image";
import { ContentSubSections as SubSections } from "./content-subsections";
import { ContentSubtitle as Subtitle } from "./content-subtitle";
import { ContentTitle as Title } from "./content-title";
import { ContentUpdatedAt as UpdatedAt } from "./content-updated-at";

export * from "./content-section";

export const Content = {
  Body,
  Form,
  Image,
  SubSections,
  Subtitle,
  Title,
  UpdatedAt,
  Section: ContentSection,
};

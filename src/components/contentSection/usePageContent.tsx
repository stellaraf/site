import { useMemo } from "react";
import { useTitleCase } from "use-title-case";
import { Content } from "~/components";
import { useDate, useRender, useSlug } from "~/hooks";
import { notNullUndefined } from "~/types";

import type { PageContent, UsePageContent } from "~/types";

export const usePageContent = (rawContent: PageContent, deps: unknown[] = []): UsePageContent => {
  const {
    form,
    image,
    updatedAt,
    title = "",
    paragraphs,
    body = null,
    subtitle = "",
    buttonLink = "",
    buttonText = "",
    showUpdatedDate = false,
    button: showButton = false,
  } = rawContent ?? {};

  const titleMe = useTitleCase();
  const slug = useSlug(title, [title]);
  const updated = useDate(updatedAt);

  const renderedBody = useRender(body);

  return useMemo(() => {
    if (deps.length === 0) {
      deps = [rawContent];
    }

    const obj = {} as UsePageContent;

    try {
      let subsections = null;

      obj.title = <Content.Title id={slug}>{title}</Content.Title>;
      obj.subtitle = <Content.Subtitle>{subtitle}</Content.Subtitle>;
      obj.buttonText = titleMe(buttonText);
      obj.buttonLink = buttonLink;
      obj.updatedAt = <Content.UpdatedAt>{updated}</Content.UpdatedAt>;

      if (body) {
        obj.body = <Content.Body>{renderedBody}</Content.Body>;
      } else {
        obj.body = null;
      }

      if (typeof paragraphs !== "undefined" && paragraphs?.length !== 0) {
        subsections = <Content.SubSections sections={paragraphs} />;
      }
      if (typeof image !== "undefined") {
        obj.image = <Content.Image src={image.fields.file.url} />;
      } else {
        obj.image = null;
      }

      if (notNullUndefined(form)) {
        obj.form = <Content.Form form={form} />;
      } else {
        obj.form = null;
      }

      obj.showButton = showButton;
      obj.showUpdatedDate = showUpdatedDate;
      obj.subsections = subsections;
    } catch (err) {
      console.error(err);
    }
    return obj;
  }, deps);
};
